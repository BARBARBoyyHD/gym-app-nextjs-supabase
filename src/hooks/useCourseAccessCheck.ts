"use client";

import { useAccess } from "@/contexts/AccessContext";

interface MembershipPlan {
  id: number;
  name: string;
}

interface ActiveMembership {
  id: string;
  member_id: string;
  status: string;
  plan_id: MembershipPlan;
}

interface CheckAccessResponse {
  success: boolean;
  status: number;
  message: string;
  data?: {
    id: string;
    email: string;
    activeMembership?: ActiveMembership;
    allMemberships?: ActiveMembership[];
  };
}

export const useCourseAccessCheck = () => {
  const { state, dispatch } = useAccess();

  const checkAccess = async (email: string) => {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_ERROR", payload: null });
    dispatch({ type: "SET_EMAIL", payload: email });

    try {
      const response = await fetch("/api/courses/check/email/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data: CheckAccessResponse = await response.json();

      if (response.ok && data.success) {
        // Check if the active membership plan is not bronze
        if (data.data?.activeMembership) {
          const planName = data.data.activeMembership.plan_id.name.toLowerCase();
          if (planName.includes("bronze")) {
            dispatch({ type: "SET_ACCESS_STATUS", payload: "denied" });
          } else {
            dispatch({ type: "SET_ACCESS_STATUS", payload: "granted" });
            dispatch({ type: "SET_MEMBERSHIP_DATA", payload: data.data });
          }
        } else {
          // If no active membership is found, access is denied
          dispatch({ type: "SET_ACCESS_STATUS", payload: "denied" });
        }
      } else {
        // Handle different error conditions based on the API response
        if (data.status === 403) {
          // Bronze plan access denied
          dispatch({ type: "SET_ACCESS_STATUS", payload: "denied" });
        } else if (data.status === 404) {
          // Email or membership not found
          dispatch({ type: "SET_ACCESS_STATUS", payload: "denied" });
        } else {
          // Other error
          dispatch({ type: "SET_ERROR", payload: data.message || "An unknown error occurred" });
          dispatch({ type: "SET_ACCESS_STATUS", payload: "unverified" });
        }
      }
    } catch (err) {
      dispatch({ 
        type: "SET_ERROR", 
        payload: err instanceof Error ? err.message : "An unknown error occurred" 
      });
      dispatch({ type: "SET_ACCESS_STATUS", payload: "unverified" });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const resetAccess = () => {
    dispatch({ type: "RESET_STATE" });
  };

  return {
    ...state,
    checkAccess,
    resetAccess
  };
};