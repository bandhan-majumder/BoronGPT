"use client";

import React, { useState, useEffect } from 'react'
import EditorScreen from '../../components/screen/EditorScreen'
import { usePromptStore } from '../../providers/prompt-store-provider'
import { useCreateApp } from '../../hooks/query/useCreateApp';
import { useRouter } from 'next/navigation';
import { FailedParsedResponseInterface, processResponse, SuccessFulParsedResponseInterface } from '../../hooks/useConvertSteps';

function PlayGround() {
  const router = useRouter();
  const { prompt } = usePromptStore(
    (state) => state,
  )

  const [steps, setSteps] = useState<SuccessFulParsedResponseInterface | null>(null);
  const [processingError, setProcessingError] = useState<string | null>(null);

  // if user is manually coming here, redirect them to home screen
  if (!prompt) {
    router.push("/");
    return null;
  }

  const { data, error, isLoading } = useCreateApp({ prompt });

  // Process the response when data is available
  useEffect(() => {
    async function processData() {
      if (data) {
        try {
          const processedSteps: SuccessFulParsedResponseInterface | FailedParsedResponseInterface = await processResponse(data);
          if ('metadata' in processedSteps && processedSteps.steps.length > 0) {
            setSteps(processedSteps);
          }
        } catch (err) {
          console.error('Error processing response:', err);
          setProcessingError(err instanceof Error ? err.message : 'Unknown error');
        }
      }
    }

    processData();
  }, [data]);

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (processingError) return <div>Processing Error: {processingError}</div>

  return (
    <div>
      <EditorScreen steps={steps}/>
    </div>
  )
}

export default PlayGround