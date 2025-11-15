import { NextResponse, NextRequest } from "next/server";
import { stripe } from "@/lib/stripe";
import { getServerSession } from "@/lib/get-session";

export const POST = async (req: NextRequest) => {
    try {
        // Check authentication
        const session = await getServerSession();
        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { amount }: { amount: number } = await req.json();

        // Validate amount
        if (!amount || amount <= 0 || !isFinite(amount)) {
            return NextResponse.json(
                { error: "Invalid amount" },
                { status: 400 }
            );
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100),
            currency: "usd",
            automatic_payment_methods: {
                enabled: true,
            },
            metadata: {
                userId: session.user?.id || "",
                userEmail: session.user?.email || "",
            },
        });

        if (!paymentIntent.client_secret) {
            throw new Error("Failed to create payment intent");
        }

        return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    } catch (err: any) {
        console.error("Payment intent error:", err);
        return NextResponse.json(
            { error: err.message || "Failed to create payment session" },
            { status: 500 }
        );
    }
}