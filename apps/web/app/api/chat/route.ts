import { getAnthropicInstance } from '../../../lib/anthropic';
import { ANTHROPIC_MODEL_NAME } from '../../../lib/config';
import { getSystemPrompt } from '../../../prompts';
import type { TextBlock } from "@anthropic-ai/sdk/resources";
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const anthropic = getAnthropicInstance();
    
    const response = await anthropic.messages.create({
      messages: messages,
      model: ANTHROPIC_MODEL_NAME || "claude-3-5-sonnet-20241022",
      max_tokens: 50,
      system: JSON.stringify(getSystemPrompt())
    });

    return NextResponse.json({
      response: (response.content[0] as TextBlock)?.text
    });
    
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ message: 'Internal server error' });
  }
}
