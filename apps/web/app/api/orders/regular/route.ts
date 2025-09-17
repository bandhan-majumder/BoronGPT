import prismaClient from "@repo/db/client";
import { NextResponse } from "next/server";
import { razorpay } from "../../../../lib/razorpay";

export async function POST(request: Request) {
  try {
    const { productId, variant } = await request.json();

    const price = 100; // fetch price from database

    const order = await razorpay.orders.create({
      amount: price * 100, // amount in the smallest currency unit
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
      notes: {
        productId: productId.toString(),
        variant: variant.toString(),
      },
    });

    const newOrder = await prismaClient.subscription.create({
      data: {
        userId: "12", // TODO: change this
        razorpayOrderId: order.id,
        subscriptionType: "MonthlyIndividual", // change based on param
        amount: price,
        status: "PENDING",
      },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      db_order_id: newOrder.id,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return new Response("Something went wrong", { status: 401 });
  }
}
