import { getAnthropicInstance } from "../../../lib/anthropic";
import { BASE_PROMPT } from "../../../prompts";
import { basePromptAsJson as nodeBasePrompt } from "../../../prompts/base/node";
import { basePromptAsJson as reactBasePrompt } from "../../../prompts/base/react";
import { cacheService } from "../../../lib/cache";
import type { TextBlock } from "@anthropic-ai/sdk/resources";
import { NextResponse } from "next/server";
import { ANTHROPIC_MODEL_NAME } from "../../../lib/config";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const model = ANTHROPIC_MODEL_NAME || "claude-3-5-haiku-latest";
    const maxTokens = 50;
    const systemPrompt =
      "Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra";

    const messages = [
      {
        role: "user" as const,
        content: prompt,
      },
    ];

    // // Try to get cached response first
    // const cachedResponse = await cacheService.getCachedResponse(
    //   messages,
    //   model,
    //   systemPrompt,
    //   maxTokens,
    //   {
    //     keyPrefix: 'template',
    //     ttl: 7200 // 2 hours cache (template decisions are more stable)
    //   }
    // );

    // if (cachedResponse) {
    //   return buildTemplateResponse(cachedResponse, true);
    // }

    // If no cache hit, make API call
    const anthropic = getAnthropicInstance();

    const response = await anthropic.messages.create({
      messages: messages,
      model: model,
      max_tokens: maxTokens,
      system: systemPrompt,
    });

    const answer = (response.content[0] as TextBlock).text;

    // // Cache the response
    // if (answer) {
    //   await cacheService.setCachedResponse(
    //     messages,
    //     model,
    //     systemPrompt,
    //     maxTokens,
    //     answer,
    //     {
    //       keyPrefix: 'template',
    //       ttl: 7200 // 2 hours cache
    //     }
    //   );
    // }

    return buildTemplateResponse(answer, false);
  } catch (error) {
    console.error("Template API error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

function buildTemplateResponse(answer: string, cached: boolean) {
  if (answer === "react") {
    return NextResponse.json({
      response: {
        prompts: [
          BASE_PROMPT,
          `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`,
        ],
        uiPrompts: [reactBasePrompt],
      },
      cached,
    });
  }

  if (answer === "node") {
    return NextResponse.json({
      response: {
        prompts: [
          `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`,
        ],
        uiPrompts: [nodeBasePrompt],
      },
      cached,
    });
  }

  return NextResponse.json(
    { message: "You cant access this" },
    { status: 404 },
  );
}
