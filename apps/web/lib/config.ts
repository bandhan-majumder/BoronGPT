export const ANTHROPIC_MODEL_NAME = process.env.ANTHROPIC_MODEL_NAME;
export const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

export const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";
export const REDIS_HOST = process.env.REDIS_HOST || "localhost";
export const REDIS_PORT = parseInt(process.env.REDIS_PORT || "6379");
export const REDIS_PASSWORD = process.env.REDIS_PASSWORD;
export const REDIS_DB = parseInt(process.env.REDIS_DB || "0");
