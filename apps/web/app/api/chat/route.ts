import { getAnthropicInstance } from '../../lib/anthropic';
import { ANTHROPIC_MODEL_NAME } from '../../lib/config';
import { getSystemPrompt } from '../../prompts/prompt';
import type { TextBlock } from "@anthropic-ai/sdk/resources";
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const anthropic = getAnthropicInstance();
    
    const response = await anthropic.messages.create({
      messages: messages,
      model: ANTHROPIC_MODEL_NAME!,
      max_tokens: 50,
      system: getSystemPrompt()
    });

    console.log(response);

    return NextResponse.json({
      response: (response.content[0] as TextBlock)?.text
    });
    
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ message: 'Internal server error' });
  }
}
