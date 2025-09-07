import React from "react";
import { Skeleton } from "@repo/ui/index";

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-6 w-64" />
      <Skeleton className="h-6 w-64" />
    </div>
  );
}

export default Loading;
