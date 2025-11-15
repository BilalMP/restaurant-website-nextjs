"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import Image from "next/image";
import { MinusIcon, PlusIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore, type CartStoreState } from "@/store/cart-store";
import { useRouter } from "next/navigation";

interface CartItem{
    id:number;
    description:string;
    category:string;
    imageUrl:string;
    price:number;
    quantity:number;
    title:string;
    vegetarian:boolean;
}

const Cart = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const cartCount = useCartStore((s: CartStoreState) => s.cartCount);

    const syncFromLocalStorage = useCartStore(
        (state) => state.syncFromLocalStorage
    );

    const increaseQuantity = (id: number) => {
        const updatedCart:CartItem[] = cartItems.map((item: CartItem) => {
            return item.id === id
                ? { ...item, quantity: item.quantity + 1 }
                : item;
        });
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        syncFromLocalStorage();
    };

    useEffect(() => {
        const total:number = cartItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
        setTotalPrice(total);
    }, [cartItems]);

    const decreaseQuantity = (id: number) => {
        const updatedCart:CartItem[] = cartItems
            .map((item: any) => {
                return item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item;
            })
            .filter((item: any) => item && item.quantity > 0);
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        syncFromLocalStorage();
    };

    const removeMenuFromCart = (id: number) => {
        const updatedCart:CartItem[] = cartItems.filter(
            (item: any) => item && item.id !== id
        );
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        syncFromLocalStorage();
    };

    useEffect(() => {
        try {
            const savedCart = localStorage.getItem("cart");
            if (savedCart) {
                const items = JSON.parse(savedCart);
                const cleaned = Array.isArray(items)
                    ? items.filter(
                        (it: any) => it && typeof it.id !== "undefined"
                    )
                    : [];
                setCartItems(cleaned);
            } else {
                setCartItems([]);
            }
        } catch (error) {
            console.error("Error loading cart from localStorage:", error);
        }
    }, [cartCount]);

    useEffect(() => {
        const onStorage = (e: StorageEvent) => {
            if (e.key === "cart") {
                try {
                    const savedCart = localStorage.getItem("cart");
                    const items = savedCart ? JSON.parse(savedCart) : [];
                    setCartItems(items);
                } catch { }
            }
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    if (cartItems.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center">
                <div className="my-10 md:my-25 flex flex-col items-center justify-center">
                    <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold">
                        Cart is empty
                    </h1>
                    <p className="text-sm text-primary/50 font-normal mt-10">
                        Looks like you have not addes anything to your cart yet
                    </p>
                    <Link
                        href="/menu"
                        className="capitalize mt-10 bg-primary text-secondary px-5 py-2 rounded-lg"
                    >
                        Browse our menu
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="my-10 md:my-25 flex flex-col items-center justify-center">
                <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold">
                    Your Cart
                </h1>
            </div>
            {cartItems.filter(Boolean).map((item: any) => (
                <CardMenu
                    key={item.id}
                    {...item}
                    increaseQuantity={increaseQuantity}
                    decreaseQuantity={decreaseQuantity}
                    removeMenuFromCart={removeMenuFromCart}
                />
            ))}
            <CartTotal total={totalPrice} />
        </div>
    );
};

export default Cart;

interface CardMenuProps {
    id: number;
    imageUrl: string;
    title: string;
    price: number;
    description: string;
    quantity: number;
    category: string;
    vegetarian: boolean;
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
    removeMenuFromCart: (id: number) => void;
}

const CardMenu = ({
    id,
    imageUrl,
    title,
    price,
    description,
    quantity,
    category,
    vegetarian,
    increaseQuantity,
    decreaseQuantity,
    removeMenuFromCart,
}: CardMenuProps) => {
    const lineTotal = price * quantity;

    return (
        <Card className="w-full rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-0 mb-5 lg:w-3/5 pr-10">
            <div className="grid grid-cols-3 items-start gap-5">
                <div className="w-[200px] h-full">
                    <Image
                        src={imageUrl}
                        alt={title}
                        width={100}
                        height={100}
                        className="rounded-md object-cover aspect-square h-full w-full rounded-r-none"
                    />
                </div>
                <div className="flex flex-col gap-2 my-3">
                    <h3 className="text-base md:text-lg font-semibold leading-snug">
                        {title}
                    </h3>
                    <span className="text-sm md:text-base font-bold">
                        ${price}
                    </span>
                    <p className="text-xs md:text-sm text-primary/50 line-clamp-2">
                        {description}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                        {category && (
                            <span className="px-2 py-0.5 text-[10px] md:text-xs rounded-full bg-primary/10 text-primary">
                                {category}
                            </span>
                        )}
                        {vegetarian && (
                            <span className="px-2 py-0.5 text-[10px] md:text-xs rounded-full bg-emerald-100 text-emerald-700">
                                Vegetarian
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                aria-label="Decrease quantity"
                                onClick={() => {
                                    decreaseQuantity(id);
                                }}
                            >
                                <MinusIcon className="w-4 h-4" />
                            </Button>
                            <span className="min-w-6 text-center text-sm font-medium">
                                {quantity}
                            </span>
                            <Button
                                variant="default"
                                size="icon"
                                aria-label="Increase quantity"
                                onClick={() => increaseQuantity(id)}
                            >
                                <PlusIcon className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end justify-between h-full py-5">
                    <div className="text-right">
                        <p className="text-xs text-primary/50">Subtotal</p>
                        <p className="text-base md:text-lg font-bold">
                            ${lineTotal}
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        className="mt-3"
                        onClick={() => removeMenuFromCart(id)}
                    >
                        <Trash2 /> Remove
                    </Button>
                </div>
            </div>
        </Card>
    );
};

interface CartTotalProps {
    total: number;
}

const CartTotal = ({ total }: CartTotalProps) => {
    const router = useRouter();

    const handleCheckOut = (total: number) => {
        localStorage.setItem("total", total.toString());
        router.push("/checkout");
    };

    return (
        <Card className="w-full lg:w-3/5 mt-5 mb-15">
            <div className="flex justify-between items-center mx-10">
                <span className="text-2xl md:text-3xl lg:text-4xl font-bold">
                    Total: ${total.toFixed(2)}
                </span>
                <Button onClick={() => handleCheckOut(total)}>Check out</Button>
            </div>
        </Card>
    );
};
