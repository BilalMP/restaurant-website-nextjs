import React from "react";
import { Card, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";

interface MenuCardProp {
    imageUrl: string;
    title: string;
    price: number;
    description: string;
    category?: string;
}
const MenuCard = ({
    imageUrl,
    title,
    price,
    description,
    category,
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
                {category && (
                    <p className="text-sm text-primary/50">{category}</p>
                )}
                {category && (
                    <Button className="text-sm text-primary/50">
                        Add to cart
                    </Button>
                )}
            </div>
        </Card>
    );
};

export default MenuCard;
