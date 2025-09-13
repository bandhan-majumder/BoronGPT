import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import prismaClient from "@repo/db/client";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const orders = await prismaClient.subscription.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return new Response(JSON.stringify(orders), { status: 200 });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
