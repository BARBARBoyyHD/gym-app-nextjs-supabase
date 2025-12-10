"use client";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/react-query";
import { useMemo } from "react";
import { toast } from "sonner";
import { FetchResponse, PaginationParams } from "@/types/queryTypes";
import { getQueryString } from "@/lib/getQueryString";

interface JSON {
  message: string;
  success: boolean;
}

export const useGetData = <T>({
  endpoint,
  queryKeyBase,
  params,
}: {
  endpoint: string;
  queryKeyBase: string;
  params?: PaginationParams;
}): UseQueryResult<FetchResponse<T>, Error> => {
  const queryKey = useMemo(() => [queryKeyBase, params || {}], [queryKeyBase, params]);

  return useQuery({
    queryKey,

    queryFn: async () => {
      const queryString = getQueryString(params || {});
      const url = `${endpoint}?${queryString}`;

      const response = await fetch(url, { method: "GET" });
      let json: JSON;

      try {
        json = await response.json();
      } catch {
        throw new Error("Invalid JSON response");
      }

      if (!response.ok || json?.success === false) {
        throw new Error(json?.message || "Failed to fetch data");
      }

      return json as FetchResponse<T>;
    },

    refetchInterval: (query) => {
      const data = query.state.data?.data;

      // 🚫 Stop when searching & no results
      if (params?.search && Array.isArray(data) && data.length === 0) {
        return false;
      }

      // 🚫 Stop when API error (404, 500, etc)
      if (query.state.error) {
        return false;
      }

      // ✔ Normal case
      return 2000;
    },

    refetchIntervalInBackground: true,
    retry: false, // optional: prevent retry spam on 404
  });
};


/**
 * Generic fetch hook to get a single record
 */
export function useGetSingleData<T>(
  id: string,
  endpoint: string,
  queryKey: string,
  option?: { enabled: boolean }
): UseQueryResult<T, Error> {
  return useQuery({
    queryKey: [queryKey, id],
    queryFn: async () => {
      const response = await fetch(`${endpoint}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to fetch data: ${response.status}`);
      }

      const data = await response.json();
      return data.data;
    },
    ...option,
  });
}

/**
 * Generic insert (POST) hook
 */
export function usePostData<T>(
  endpoint: string,
  queryKey: string
): UseMutationResult<T[], Error, T> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: T) => {
      // Detect if it's FormData (for file upload)
      const isFormData = data instanceof FormData;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: isFormData
          ? undefined
          : { "Content-Type": "application/json" },
        body: isFormData ? data : JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to post data");
      }

      const result = await response.json();
      return result.data;
    },

    onSuccess: () => {
      toast("✅ Added successfully!", {
        duration: 2000,
        className:
          "bg-green-500 text-white font-semibold transition-all duration-300 ease-in-out border border-green-500",
      });
      queryClient.invalidateQueries({ queryKey: [queryKey], exact: false });
    },
    onError: (error) => {
      toast.error("❌ Failed to add data", { description: error.message });
    },
  });
}

/**
 * Generic update (PUT) hook
 */
export function useUpdateData<T>(
  endpoint: string,
  queryKeyBase: string,
  params?: PaginationParams
): UseMutationResult<T[], Error, { id: string; updates: Partial<T> }> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }) => {
      const isFormData = updates instanceof FormData;

      const response = await fetch(`${endpoint}/${id}`, {
        method: "PUT",
        headers: isFormData
          ? undefined
          : { "Content-Type": "application/json" },
        body: isFormData ? updates : JSON.stringify(updates),
      });

      if (!response.ok) throw new Error(await response.text());

      const json = await response.json();
      return json.data as T[];
    },

    onSuccess: () => {
      toast("✏️ Updated successfully!", {
        duration: 2000,
        className: "bg-green-500 text-white",
      });
      queryClient.invalidateQueries({
        queryKey: params ? [queryKeyBase, params] : [queryKeyBase],
      });
    },
    onError: (error) => {
      toast.error("❌ Failed to update data", { description: error.message });
    },
  });
}

/**
 * Generic delete hook
 */
export function useDeleteData(
  endpoint: string,
  queryKey: string
): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`${endpoint}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to delete data");
      }
      const result = await response.json();
      return result.data;
    },
    onSuccess: (id) => {
      toast("🗑️ Deleted successfully!", {
        duration: 2000,
        className:
          "bg-green-500 text-white transition-all duration-300 ease-in-out",
      });
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      // Remove queries with both the single ID and the combined query key pattern
      queryClient.removeQueries({ queryKey: [id] });
      queryClient.removeQueries({ queryKey: [queryKey, id] });
    },
    onError: (error) => {
      toast.error("❌ Failed to delete data", { description: error.message });
    },
  });
}