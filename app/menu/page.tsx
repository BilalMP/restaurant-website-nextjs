"use client";

import MenuCard from "@/components/MenuCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const Menu = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [customiseDialogOpen, setCustomiseDialogOpen] =
        useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<
        (typeof menuItems)[0] | null
    >(null);

    const filteredItems = menuItems.filter((item) => {
        const categoryMatch =
            selectedCategory === "All" || item.category === selectedCategory;
        const searchMatch = item.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        return categoryMatch && searchMatch;
    });

    const handleCustomiseClick = (item: (typeof menuItems)[0]) => {
        setSelectedItem(item);
        setCustomiseDialogOpen(true);
    };

    const handleAddCart = (customisation: string, quantity: number) => {
        if (selectedItem) {
            const cartItem = {
                ...selectedItem,
                customisation,
                quantity,
            };
        }
        toast.success("Item added to cart");
    };
    return (
        <div className="padding mb-20">
            <div className="flex justify-center flex-col items-center mt-25">
                <h1 className="text-6xl font-bold">Our Menu</h1>
                <p className="text-primary/50 mt-5 text-lg">
                    Explore our curated selection of expertly crafted dishes
                </p>
            </div>
            {/* search bar */}
            <div className="flex items-center p-2 mt-10 max-w-md mx-auto border-primary/50 rounded-3xl border px-2">
                <Search className="w-5 h-5 text-primary/50 ml-5" />
                <Input
                    type="text"
                    placeholder="Search for a dish..."
                    className="bg-transparent outline-none border-none shadow-none"
                />
            </div>
            {/* category filter */}
            <div className="flex flex-wrap justify-center mt-10">
                {categories.map((category) => {
                    return (
                        <Button
                            key={category}
                            className="mr-2 mb-2 transition-all duration-300"
                            variant={
                                selectedCategory === category
                                    ? "default"
                                    : "outline"
                            }
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </Button>
                    );
                })}
            </div>
            {/* menu */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
                {filteredItems.map((item) => (
                    <MenuCard
                        key={item.id}
                        {...item}
                        onAddCart={handleAddCart}
                    />
                ))}
            </div>
        </div>
    );
};

export default Menu;

const categories = [
    "All",
    "Appetizers",
    "Main Course",
    "Seafood",
    "Pasta",
    "Desserts",
];

const menuItems = [
    {
        id: 1,
        title: "Truffle Carbonara",
        category: "Pasta",
        description:
            "Creamy pasta with black truffle, pancetta, and aged parmesan",
        price: 28,
        imageUrl: "/images/dish-pasta.jpg",
        vegetarian: false,
        available: true,
    },
    {
        id: 2,
        title: "Wagyu Ribeye",
        category: "Main Course",
        description:
            "12oz premium wagyu with roasted vegetables and red wine reduction",
        price: 65,
        imageUrl: "/images/dish-steak.jpg",
        vegetarian: false,
        available: true,
    },
    {
        id: 3,
        title: "Molten Chocolate Cake",
        category: "Desserts",
        description:
            "Warm chocolate lava cake with vanilla bean ice cream and berry compote",
        price: 14,
        imageUrl: "/images/dish-dessert.jpg",
        vegetarian: true,
        available: false,
    },
    {
        id: 4,
        title: "Pan-Seared Salmon",
        category: "Seafood",
        description:
            "Atlantic salmon with lemon butter sauce, asparagus, and microgreens",
        price: 32,
        imageUrl: "/images/dish-seafood.jpg",
        vegetarian: false,
        available: true,
    },
    {
        id: 5,
        title: "Caesar Salad",
        category: "Appetizers",
        description:
            "Crisp romaine, house-made croutons, parmesan, classic caesar dressing",
        price: 12,
        imageUrl: "/images/dish-pasta.jpg",
        vegetarian: true,
        available: true,
    },
    {
        id: 6,
        title: "Beef Wellington",
        category: "Main Course",
        description:
            "Tender beef fillet wrapped in puff pastry with mushroom duxelles",
        price: 58,
        imageUrl: "/images/dish-steak.jpg",
        vegetarian: false,
        available: true,
    },
];
