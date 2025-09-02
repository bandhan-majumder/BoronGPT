import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useCreateApp({ prompt }: { prompt: string }) {
  return useQuery({
    queryKey: ["createApp", prompt],
    queryFn: async () => {
      const response = await axios.post("/api/template", { prompt });
      if (response.status === 500) {
        return response.data;
      }
    },
  });
}
