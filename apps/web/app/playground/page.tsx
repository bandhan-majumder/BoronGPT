"use client";

import React from 'react'
import EditorScreen from '../../components/screen/EditorScreen'
import { usePromptStore } from '../../providers/prompt-store-provider'
import { useCreateApp } from '../../hooks/query/useCreateApp';
import { useRouter } from 'next/navigation';
import { parseMessageToSteps } from '../../hooks/useConvertSteps';

function PlayGround() {
  const router = useRouter();
  const { prompt } = usePromptStore(
    (state) => state,
  )

  // if user is manually coming here, redirect them to home screen
  if (!prompt) {
    return router.push("/");
  }

  const { data, error, isLoading } = useCreateApp({ prompt });
  const steps = parseMessageToSteps(data);

  console.log("Steps are: ", steps);

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <EditorScreen />
    </div>
  )
}

export default PlayGround