import { NextResponse } from "next/server";
import crypto from "crypto";
import prismaClient from "@repo/db/client";
import { transporter } from "../../../../lib/email";
import { RAZORPAY_WEBHOOK_SECRET } from "../../../../lib/config";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get("x-razorpay-signature")!;
    const expectedSignature = crypto
      .createHmac("sha256", RAZORPAY_WEBHOOK_SECRET!)
      .update(body)
      .digest("hex");

    if (signature === expectedSignature) {
      const payload = JSON.parse(body);

      if (payload.event === "payment.captured") {
        const paymentId = payload.payload.payment.entity.id;

        const order = await prismaClient.subscription.update({
          where: {
            razorpayOrderId: payload.payload.payment.entity.order_id,
            status: "PENDING",
          },
          data: {
            status: "COMPLETED",
            razorpayPaymentId: paymentId,
          },
        });

        if (order) {
          await transporter.sendMail({
            from: "example@gmail.com",
            to: order.userId, // fetch user email from db
            subject: "Order completed",
            text: `Your order with id ${order.id} has been completed successfully.`,
            html: "<b>Thanks for choosing us!</b>", // HTML body
          });
        }
      }

      return NextResponse.json("Webhook received", { status: 200 });
    } else {
      console.warn("Invalid signature. Possible tampering detected.");
      return NextResponse.json("Invalid signature", { status: 400 });
    }
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
