/*
 * This endpoint is to manage cache
 */

import { cacheService } from "../../../lib/cache";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get("action");

    switch (action) {
      case "stats":
        const stats = await cacheService.getCacheStats();
        return NextResponse.json({
          success: true,
          data: stats,
        });

      default:
        return NextResponse.json(
          {
            success: false,
            message: "Invalid action. Use ?action=stats",
          },
          { status: 400 },
        );
    }
  } catch (error) {
    console.error("Cache management error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const pattern = searchParams.get("pattern");

    const deletedCount = await cacheService.clearCache(pattern || undefined);

    return NextResponse.json({
      success: true,
      message: `Cleared ${deletedCount} cache entries`,
      deletedCount,
    });
  } catch (error) {
    console.error("Cache clear error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}
