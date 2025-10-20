"use client";

import { Menu, ShoppingCart, UserRound, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const MenuList = [
    {
        id: 1,
        name: "Home",
        href: "/",
    },
    {
        id: 2,
        name: "Menu",
        href: "/menu",
    },
    {
        id: 3,
        name: "Reservation",
        href: "/reservation",
    },
];

const Header = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { data, isPending } = authClient.useSession();
    const session = data;
    const handleMenuClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="padding bg-secondary text-primary">
            <div className="flex items-center justify-between">
                {/* website logo  */}
                <Link
                    href="/"
                    className="text-xl lg:text-2xl font-bold flex items-center gap-2"
                >
                    <Image
                        src="/icons/savoria_icon.svg"
                        alt="logo"
                        width={50}
                        height={50}
                    />
                    <span className="hidden sm:inline">Savoria Restaurant</span>
                    <span className="sm:hidden">Savoria</span>
                </Link>

                {/* desktop menu */}
                <nav className="hidden lg:flex lg:items-center lg:gap-8">
                    <div className="flex items-center">
                        {MenuList.map((item) => (
                            <Link
                                key={item.id}
                                href={item.href}
                                className="text-lg font-medium px-3 py-2 text-primary hover:text-primary/50 transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    <div className="flex items-center gap-5">
                        <button className="hover:text-primary/50 transition-colors">
                            <ShoppingCart className="w-5 h-5" />
                        </button>
                        {!session ? <NotSignUser /> : <SignedUser />}
                    </div>
                    <Button className="capitalize">book a table</Button>
                </nav>

                {/* mobile menu button */}
                <div className="flex items-center gap-4 lg:hidden">
                    <button
                        onClick={handleMenuClick}
                        className="p-2"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* mobile menu */}
            {isOpen && (
                <nav className="lg:hidden mt-4 pb-4">
                    <div className="flex flex-col space-y-2">
                        {MenuList.map((item) => (
                            <Link
                                href={item.href}
                                key={item.id}
                                onClick={() => setIsOpen(false)}
                                className="text-lg font-medium px-3 py-2 text-primary hover:text-primary/50 transition-colors rounded-md hover:bg-primary/5"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    <div className="flex items-center gap-6 px-3 py-4">
                        <button className="hover:text-primary/50 transition-colors">
                            <ShoppingCart className="w-5 h-5" />
                        </button>
                        <button className="hover:text-primary/50 transition-colors">
                            <UserRound className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="px-3">
                        <Button className="capitalize w-full">
                            book a table
                        </Button>
                    </div>
                </nav>
            )}
        </header>
    );
};

export default Header;

const NotSignUser = () => {
    return (
        <Link
            href="/login"
            className="hover:text-primary/50 transition-colors"
        >
            <UserRound className="w-5 h-5" />
        </Link>
    );
};

const SignedUser = () => {
    const router = useRouter();
    const handleSignOut = async () => {
        try {
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        router.push("/login");
                        router.refresh();
                    },
                },
            });
        } catch (error) {
            toast("Failed to sign out");
        }
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <UserRound className="w-5 h-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-56"
                align="start"
            >
                <DropdownMenuItem onClick={handleSignOut}>
                    Sign Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
