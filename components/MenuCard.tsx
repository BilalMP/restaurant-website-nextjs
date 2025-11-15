import React from "react";
import { Card} from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { ShoppingCartIcon } from "lucide-react";

interface MenuCardProp {
    id: number;
    imageUrl: string;
    title: string;
    price: number;
    description: string;
    category?: string;
    onAddCart: (itemId: number, quantity: number) => void;
    vegetarian?: boolean;
    available?: boolean;
}
const MenuCard = ({
    id,
    imageUrl,
    title,
    price,
    description,
    category,
    onAddCart,
    vegetarian,
    available,
}: MenuCardProp) => {
    return (
        <Card className="pt-0 hover:scale-105 transition-all duration-300"> 
            <Image
                src={imageUrl}
                alt={title}
                width={300}
                height={300}
                className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="px-5">
                <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">{title}</span>
                    <span className="font-bold text-lg">${price}</span>
                </div>
                <p className="mx-auto text-primary/50 text-shadow-md font-light mt-5">
                    {description}
                </p>
                <div className="flex justify-between items-center">
                {category && (
                    <p className="text-sm text-primary/50 mt-5">{category}</p>
                )}
                {vegetarian && (
                    <p className="text-sm text-primary/50 mt-5">Vegetarian</p>
                )}
                </div>
                {category && available && (
                    <Button
                        className="text-sm text-secondary mt-5 space-x-5 w-full"
                        onClick={() => onAddCart(id, 1)}
                    >
                        <ShoppingCartIcon />
                        Add to cart
                    </Button>
                )}
                {category && !available && (
                    <Button
                        className="text-sm text-secondary mt-5 space-x-5 w-full"
                        disabled
                    >
                        <ShoppingCartIcon />
                        Out of stock
                    </Button>
                )}
            </div>
        </Card>
    );
};

export default MenuCard;
