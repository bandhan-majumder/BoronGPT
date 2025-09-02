"use client";

import React from 'react'
import EditorScreen from '../../components/screen/EditorScreen'
import { usePromptStore } from '../../providers/prompt-store-provider'

function PlayGround() {
  const { prompt } = usePromptStore(
    (state) => state,
  )
  console.log("prompt is: ", prompt);
  return (
    <div>
        <EditorScreen />
    </div>
  )
}

export default PlayGround