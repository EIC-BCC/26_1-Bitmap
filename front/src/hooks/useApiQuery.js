import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";

/** Hook único, usado por todas as telas para buscar dados do backend. */
export function useApiQuery(queryKey, url) {
  return useQuery({
    queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
    queryFn: () => api.get(url).then((res) => res.data),
  });
}
