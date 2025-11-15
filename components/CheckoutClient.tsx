"use client"

import { useState, useEffect } from "react"
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js"
import StripeProvider from "@/components/CheckoutProvider"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import Image from "next/image"
import { Loader2, AlertCircle, ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface CartItem {
    id: number
    title: string
    price: number
    quantity: number
    description: string
    imageUrl: string
    category?: string
    vegetarian?: boolean
}

const CheckoutForm = ({ cartItems, total }: { cartItems: CartItem[], total: number }) => {
    const stripe = useStripe()
    const elements = useElements()
    const [error, setError] = useState<string | null>(null)
    const [processing, setProcessing] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!stripe || !elements) return

        setProcessing(true)
        setError(null)

        try {
            const result = await stripe.confirmPayment({
                elements,
                confirmParams: { 
                    return_url: `${window.location.origin}/checkout/result` 
                },
            })

            if (result.error) {
                setError(result.error.message || "Payment failed. Please try again.")
                setProcessing(false)
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unexpected error occurred")
            setProcessing(false)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Payment Details</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <PaymentElement />
                    
                    {error && (
                        <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-md text-sm">
                            <AlertCircle className="h-4 w-4" />
                            <span>{error}</span>
                        </div>
                    )}

                    <Button
                        type="submit"
                        disabled={!stripe || processing}
                        className="w-full"
                        size="lg"
                    >
                        {processing ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            `Pay $${total.toFixed(2)}`
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}

const CheckoutClient = () => {
    const [clientSecret, setClientSecret] = useState<string>("")
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        try {
            const savedCart = localStorage.getItem("cart")
            if (!savedCart) {
                setError("Your cart is empty")
                setLoading(false)
                return
            }

            const items = JSON.parse(savedCart)
            const cleaned = Array.isArray(items)
                ? items.filter((it: any) => it && typeof it.id !== "undefined")
                : []

            if (cleaned.length === 0) {
                setError("Your cart is empty")
                setLoading(false)
                return
            }

            setCartItems(cleaned)
            const calculatedTotal = cleaned.reduce(
                (sum: number, item: CartItem) => sum + item.price * item.quantity,
                0
            )
            setTotal(calculatedTotal)

            // Create payment intent
            fetch("/api/payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: calculatedTotal }),
            })
                .then(async (r) => {
                    if (!r.ok) {
                        const errorData = await r.json().catch(() => ({}))
                        throw new Error(errorData.error || "Failed to create payment session")
                    }
                    return r.json()
                })
                .then((d) => {
                    if (d.error) {
                        throw new Error(d.error)
                    }
                    setClientSecret(d.clientSecret)
                    setLoading(false)
                })
                .catch((err) => {
                    console.error("Payment intent error:", err)
                    setError(err instanceof Error ? err.message : "Failed to initialize payment")
                    setLoading(false)
                })
        } catch (err) {
            console.error("Cart loading error:", err)
            setError("Failed to load cart items")
            setLoading(false)
        }
    }, [])

    if (loading) {
        return (
            <div className="container max-w-4xl mx-auto py-16 px-4">
                <div className="flex flex-col items-center justify-center min-h-[400px]">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                    <p className="text-muted-foreground">Loading checkout...</p>
                </div>
            </div>
        )
    }

    if (error && !clientSecret) {
        return (
            <div className="container max-w-4xl mx-auto py-16 px-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
                            <AlertCircle className="h-12 w-12 text-destructive" />
                            <h2 className="text-2xl font-bold">Checkout Error</h2>
                            <p className="text-muted-foreground">{error}</p>
                            <div className="flex gap-4 mt-6">
                                <Button asChild>
                                    <Link href="/cart">View Cart</Link>
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href="/menu">Continue Shopping</Link>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (cartItems.length === 0) {
        return (
            <div className="container max-w-4xl mx-auto py-16 px-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
                            <ShoppingCart className="h-12 w-12 text-muted-foreground" />
                            <h2 className="text-2xl font-bold">Your cart is empty</h2>
                            <p className="text-muted-foreground">
                                Add items to your cart to proceed with checkout
                            </p>
                            <Button asChild className="mt-4">
                                <Link href="/menu">Browse Menu</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="container max-w-4xl mx-auto py-8 px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">Checkout</h1>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Order Summary */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex gap-4 items-start pb-4 border-b last:border-0"
                                    >
                                        <div className="relative w-20 h-20 flex-shrink-0">
                                            <Image
                                                src={item.imageUrl}
                                                alt={item.title}
                                                fill
                                                className="rounded-md object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-lg">{item.title}</h3>
                                            <p className="text-sm text-muted-foreground line-clamp-2">
                                                {item.description}
                                            </p>
                                            <div className="flex items-center gap-4 mt-2">
                                                <span className="text-sm">Qty: {item.quantity}</span>
                                                <span className="font-semibold">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between items-center pt-4 mt-4 border-t">
                                <span className="text-xl font-bold">Total:</span>
                                <span className="text-xl font-bold">${total.toFixed(2)}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Payment Form */}
                <div>
                    {clientSecret ? (
                        <StripeProvider clientSecret={clientSecret}>
                            <CheckoutForm cartItems={cartItems} total={total} />
                        </StripeProvider>
                    ) : (
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex flex-col items-center justify-center min-h-[200px]">
                                    <Loader2 className="h-6 w-6 animate-spin text-primary mb-2" />
                                    <p className="text-muted-foreground">Initializing payment...</p>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CheckoutClient

