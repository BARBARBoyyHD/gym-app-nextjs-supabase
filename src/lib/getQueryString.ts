export const getQueryString = <T extends Record<string, string | number | boolean | undefined | null>>(
  params: T
): string => {
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, String(value));
    }
  }

  return query.toString();
};