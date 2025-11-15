"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"
import Link from "next/link"

const CheckoutResult = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [status, setStatus] = useState<"loading" | "success" | "canceled" | "error">("loading")
    const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null)

    useEffect(() => {
        const paymentIntent = searchParams.get("payment_intent")
        const paymentIntentClientSecret = searchParams.get("payment_intent_client_secret")
        const redirectStatus = searchParams.get("redirect_status")

        if (paymentIntent) {
            setPaymentIntentId(paymentIntent)
        }

        if (redirectStatus === "succeeded") {
            setStatus("success")
            try {
                localStorage.removeItem("cart")
                localStorage.removeItem("total")
            } catch (err) {
                console.error("Failed to clear cart:", err)
            }
        } else if (redirectStatus === "failed") {
            setStatus("error")
        } else if (searchParams.get("canceled") === "true" || redirectStatus === "canceled") {
            setStatus("canceled")
        } else if (paymentIntentClientSecret) {
            setStatus("loading")
            setStatus("success")
        } else {
            setStatus("error")
        }
    }, [searchParams])

    if (status === "loading") {
        return (
            <div className="container max-w-2xl mx-auto py-16 px-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex flex-col items-center justify-center min-h-[400px]">
                            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                            <p className="text-muted-foreground">Processing payment...</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (status === "success") {
        return (
            <div className="container max-w-2xl mx-auto py-16 px-4">
                <Card className="text-center">
                    <CardHeader>
                        <div className="flex justify-center mb-4">
                            <CheckCircle2 className="h-16 w-16 text-green-500" />
                        </div>
                        <CardTitle className="text-3xl">Payment Successful!</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <p className="text-muted-foreground">
                            Thank you for your order. Your payment has been processed successfully.
                        </p>
                        {paymentIntentId && (
                            <p className="text-sm text-muted-foreground">
                                Order ID: <span className="font-mono">{paymentIntentId}</span>
                            </p>
                        )}
                        <p className="text-sm text-muted-foreground">
                            You will receive a confirmation email shortly with your order details.
                        </p>
                        <div className="flex gap-4 justify-center pt-4">
                            <Button asChild>
                                <Link href="/menu">Continue Shopping</Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href="/">Go Home</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (status === "canceled") {
        return (
            <div className="container max-w-2xl mx-auto py-16 px-4">
                <Card className="text-center">
                    <CardHeader>
                        <div className="flex justify-center mb-4">
                            <XCircle className="h-16 w-16 text-destructive" />
                        </div>
                        <CardTitle className="text-3xl">Payment Cancelled</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <p className="text-muted-foreground">
                            Your payment was cancelled. No charges were made to your account.
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Your items are still in your cart. You can complete your purchase anytime.
                        </p>
                        <div className="flex gap-4 justify-center pt-4">
                            <Button asChild>
                                <Link href="/checkout">Try Again</Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href="/cart">View Cart</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    // Error
    return (
        <div className="container max-w-2xl mx-auto py-16 px-4">
            <Card className="text-center">
                <CardHeader>
                    <div className="flex justify-center mb-4">
                        <XCircle className="h-16 w-16 text-destructive" />
                    </div>
                    <CardTitle className="text-3xl">Payment Failed</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <p className="text-muted-foreground">
                        We encountered an issue processing your payment. Please try again.
                    </p>
                    <p className="text-sm text-muted-foreground">
                        If the problem persists, please contact support.
                    </p>
                    <div className="flex gap-4 justify-center pt-4">
                        <Button asChild>
                            <Link href="/checkout">Try Again</Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="/cart">View Cart</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default CheckoutResult
