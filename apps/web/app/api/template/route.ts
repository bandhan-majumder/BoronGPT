import { getAnthropicInstance } from '../../../lib/anthropic';
import { BASE_PROMPT } from '../../../prompts';
import { basePromptAsJson as nodeBasePrompt } from '../../../prompts/base/node';
import { basePromptAsJson as reactBasePrompt } from '../../../prompts/base/react';
import type { TextBlock } from "@anthropic-ai/sdk/resources";
import { NextResponse } from 'next/server';
import { ANTHROPIC_MODEL_NAME } from '../../../lib/config';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const anthropic = getAnthropicInstance();

    const response = await anthropic.messages.create({
      messages: [{
        role: 'user',
        content: prompt
      }],
      model: ANTHROPIC_MODEL_NAME || "claude-3-5-haiku-latest",
      max_tokens: 50,
      system: "Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra"
    });

    const answer = (response.content[0] as TextBlock).text;

    if (answer === "react") {
      return NextResponse.json({
        prompts: [BASE_PROMPT, `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
        uiPrompts: [reactBasePrompt]
      });
    }

    if (answer === "node") {
      return NextResponse.json({
        prompts: [`Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
        uiPrompts: [nodeBasePrompt]
      });
    }

    return NextResponse.json({ message: "You cant access this" });

  } catch (error) {
    console.error('Template API error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}