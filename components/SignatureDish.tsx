import { title } from "process";
import React from "react";
import MenuCard from "./MenuCard";

const SignatureDish = () => {
    return (
        <div className="mt-25 padding mb-10">
            <div className="flex flex-col items-center">
                <h1 className="text-4xl font-bold text-primary">
                    Signature Dish
                </h1>
                <p className="text-lg text-center max-w-2xl mt-5">
                    Discover our chef's carefully curated selection of
                    exceptional flavors
                </p>
            </div>
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-10">
                {MenuList.map((item) => (
                    <MenuCard
                        key={item.id}
                        imageUrl={item.imageUrl}
                        title={item.title}
                        price={item.price}
                        description={item.description}
                    />
                ))}
            </div>
        </div>
    );
};

export default SignatureDish;

const MenuList = [
    {
        id: 1,
        imageUrl: "/images/dish-pasta.jpg",
        title: "Truffle Carbonara",
        price: 28,
        description: "Creamy pasta with black truffle, pancetta, and parmesan",
    },
    {
        id: 2,
        imageUrl: "/images/dish-steak.jpg",
        title: "Wagyu Ribeye",
        price: 65,
        description:
            "12oz premium wagyu with roasted vegetables and red wine reduction",
    },
    {
        id: 3,
        imageUrl: "/images/dish-dessert.jpg",
        title: "Molten Chocolate Cake",
        price: 14,
        description: "Warm chocolate lava cake with vanilla bean ice cream",
    },
    {
        id: 4,
        imageUrl: "/images/dish-seafood.jpg",
        title: "Pan-Seared Salmon",
        price: 32,
        description: "Atlantic salmon with lemon butter sauce and asparagus",
    },
];
