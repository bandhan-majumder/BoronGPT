/*
* Create a singleton instance
*/

import Anthropic from "@anthropic-ai/sdk";
import { ANTHROPIC_API_KEY } from "./config";

let anthropicInstance: Anthropic | null = null;

export function getAnthropicInstance(): Anthropic {
  if (!anthropicInstance) {
    anthropicInstance = new Anthropic({
      apiKey: ANTHROPIC_API_KEY,
    });
  }
  return anthropicInstance;
}