"use client"

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface StripeProviderProps {
    children: React.ReactNode
    clientSecret?: string
}
const StripeProvider = ({ children, clientSecret }: StripeProviderProps) => {
    return (
        <Elements
            stripe={stripePromise}
            options={clientSecret ? { clientSecret } : undefined}
        >
            {children}
        </Elements>
    )
}

export default StripeProvider;