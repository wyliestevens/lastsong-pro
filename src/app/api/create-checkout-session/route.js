import Stripe from "stripe";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Payment processing is not configured" },
        { status: 500 }
      );
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const { amount, mode } = await request.json();
    // mode = "payment" for one-time, "subscription" for monthly

    const amountInCents = Math.round(parseFloat(amount) * 100);

    if (!amountInCents || amountInCents < 50) {
      return NextResponse.json(
        { error: "Minimum donation is $0.50" },
        { status: 400 }
      );
    }

    const origin = request.headers.get("origin") || "https://lastsong.pro";

    if (mode === "subscription") {
      // Create a recurring price on the fly
      const price = await stripe.prices.create({
        unit_amount: amountInCents,
        currency: "usd",
        recurring: { interval: "month" },
        product_data: {
          name: "Monthly Ministry Support",
        },
      });

      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        line_items: [{ price: price.id, quantity: 1 }],
        success_url: `${origin}/support/thank-you?type=monthly`,
        cancel_url: `${origin}/support`,
      });

      return NextResponse.json({ url: session.url });
    } else {
      // One-time donation
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "One-Time Ministry Donation",
              },
              unit_amount: amountInCents,
            },
            quantity: 1,
          },
        ],
        success_url: `${origin}/support/thank-you?type=onetime`,
        cancel_url: `${origin}/support`,
      });

      return NextResponse.json({ url: session.url });
    }
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
