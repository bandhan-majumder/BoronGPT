"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMemo } from "react";

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
      return response.data.response;
    },
    enabled: !!prompt,
    // Prevent unnecessary refetches
    staleTime: 5 * 60 * 1000, // 5 minutes - data stays fresh
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry(failureCount, error) {
      if (failureCount < 3) {
        return true;
      }
      return false;
    },
  });

  // Memoize messages to prevent unnecessary re-computation and query key changes
  const messages = useMemo((): Message[] => {
    if (!initialData?.prompts) {
      return [];
    }

    const promptMessages = initialData.prompts.map((promptText: string) => ({
      role: "user" as const,
      content: promptText
    }));
    
    return [
      ...promptMessages,
      { role: "user", content: prompt }
    ];
  }, [initialData?.prompts, prompt]);

  // Create a stable query key for the messages
  const messagesQueryKey = useMemo(() => {
    if (messages.length === 0) return ["chat", "empty"];
    
    // Create a stable key based on message contents
    const messageHash = messages
      .map(m => `${m.role}:${m.content}`)
      .join("|");
    
    return ["chat", messageHash];
  }, [messages]);

  // Second query - only runs when we have initialData and messages
  const { 
    data: finalData, 
    error: finalError, 
    isLoading: finalIsLoading 
  } = useQuery({
    queryKey: messagesQueryKey,
    queryFn: async () => {
      const response = await axios.post("/api/chat", { messages });
      if (response.status === 500) {
        throw new Error("Internal Server Error");
      }
      return response.data.response;
    },
    enabled: !!initialData && messages.length > 0 && !initialError,
    // Prevent unnecessary refetches
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 1, // Only retry once for the final query
  });

  return {
    data: finalData,
    isLoading: initialIsLoading || (!!initialData && finalIsLoading),
    error: initialError || finalError,
    // Add some debug info
    debug: {
      initialData: !!initialData,
      messagesLength: messages.length,
      initialIsLoading,
      finalIsLoading,
    }
  };
}