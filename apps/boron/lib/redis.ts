import Redis from "ioredis";
import { REDIS_URL } from "./config";

let redisInstance: Redis | null = null;

export function getRedisInstance(): Redis {
  if (!redisInstance) {
    redisInstance = new Redis(REDIS_URL || "redis://localhost:6379", {
      enableReadyCheck: false,
      maxRetriesPerRequest: null,
      lazyConnect: true,
      keepAlive: 30000,
      connectTimeout: 10000,
      commandTimeout: 5000,
    });

    // Handle connection events
    redisInstance.on("connect", () => {
      console.log("Redis connected successfully");
    });

    redisInstance.on("error", (error) => {
      console.error("Redis error:", error);
    });

    redisInstance.on("close", () => {
      console.log("Redis connection closed");
    });
  }

  return redisInstance;
}

export function closeRedisConnection(): void {
  if (redisInstance) {
    redisInstance.disconnect();
    redisInstance = null;
  }
}
