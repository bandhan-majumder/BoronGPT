"use client";

import React, { useState, useEffect, Suspense } from "react";
import EditorScreen from "../../components/screen/EditorScreen";
import { usePromptStore } from "../../providers/prompt-store-provider";
import { useCreateApp } from "../../hooks/query/useCreateApp";
import { useRouter } from "next/navigation";
import Loading from "../loading";
import { parseBoronActions } from "../../hooks/useConvertSteps";
import { StepAfterConvert } from "../../types";
import { useSession } from "next-auth/react";

export default function PlayGround() {
  const { data: sessionData, status } = useSession();
  const router = useRouter();
  const { prompt } = usePromptStore((state) => state);

  const [initialSteps, setInitialSteps] = useState<StepAfterConvert[] | null>(
    null,
  );
  const [processingError, setProcessingError] = useState<string | null>(null);

  if (status === "unauthenticated" || !sessionData) {
    router.push("/auth");
  }

  useEffect(() => {
    if (!prompt) {
      router.push("/");
    }
  }, [prompt, router]);

  // Don't call the hook if there's no prompt
  const { data, error, isLoading } = useCreateApp({
    prompt: prompt || "",
  });

  // Process the response when data is available
  useEffect(() => {
    if (!data) return;

    async function processData() {
      try {
        setProcessingError(null); // Clear previous errors
        const processedSteps = parseBoronActions(data);

        if (processedSteps?.metadata && processedSteps.steps.length > 0) {
          setInitialSteps(processedSteps.steps);
        } else {
          setProcessingError("No valid steps found in response");
        }
      } catch (err) {
        console.error("Error processing response:", err);
        setProcessingError(
          err instanceof Error ? err.message : "Unknown error",
        );
      }
    }

    processData();
  }, [data]);

  // Handle different loading states
  if (!prompt) {
    return <Loading />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Generating your application...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-red-400">
          <h2 className="text-xl font-semibold mb-2">Error occurred</h2>
          <p>{error.message}</p>
          <button
            onClick={() => router.push("/")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (processingError) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-red-400">
          <h2 className="text-xl font-semibold mb-2">Processing Error</h2>
          <p>{processingError}</p>
          <button
            onClick={() => router.push("/")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Show loading while processing data
  if (data && !initialSteps && !processingError) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Processing application data...</p>
        </div>
      </div>
    );
  }

  // Only render EditorScreen when we have initialSteps
  if (!initialSteps) {
    return <Loading />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <EditorScreen initialSteps={initialSteps} prompt={prompt} />
    </Suspense>
  );
}
