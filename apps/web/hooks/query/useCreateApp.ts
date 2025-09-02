"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function useCreateApp({ prompt }: { prompt: string }) {
  // First query to get the template
  const { 
    data: initialData, 
    error: initialError, 
    isLoading: initialIsLoading 
  } = useQuery({
    queryKey: ["createApp", prompt],
    queryFn: async () => {
      const response = await axios.post("/api/template", { prompt });
      if (response.status === 500) {
        throw new Error("Internal Server Error");
      }
      return response.data;
    },
    enabled: !!prompt, // Only run if prompt exists
    retry(failureCount, error) {
      if (failureCount < 3) {
        return true; // Retry up to 3 times
      }
      return false;
    },
  });

  // Prepare messages for the second query
  const messages: Message[] = [];
  if (initialData) {
    const promptMessages = initialData.prompts.map((promptText: string) => ({
      role: "user" as const,
      content: promptText
    }));
    messages.push(...promptMessages);
    messages.push({ role: "user", content: prompt });
  }

  // Second query - only runs when we have initialData
  const { 
    data: finalData, 
    error: finalError, 
    isLoading: finalIsLoading 
  } = useQuery({
    queryKey: ["chat", messages],
    queryFn: async () => {
      const response = await axios.post("/api/chat", { messages });
      if (response.status === 500) {
        throw new Error("Internal Server Error");
      }
      return response.data;
    },
    enabled: !!initialData && messages.length > 0, // Only run when we have initial data
  });

  return {
    data: finalData,
    isLoading: initialIsLoading || finalIsLoading,
    error: initialError || finalError,
  };
}