import React from "react";
import { Card } from "./ui/card";
import { Star } from "lucide-react";

const Testimonials = () => {
    return (
        <div className="padding mt-25 mb-20">
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-3xl font-bold md:text-6xl">
                    What Our Guests Say
                </h1>
                <p className="text-primary/50 mt-5">
                    Don't just take our word for it - hear from our delighted
                    diners
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
                {TestimonialList.map((testimonial,index) => (
                    <TestimonialItem key={index} {...testimonial} />    
                ))}
            </div>
        </div>
    );
};

export default Testimonials;

const TestimonialList = [
    {
        id: 1,
        rating: 5,
        comment:
            "Absolutely phenomenal! Every dish was a masterpiece. The attention to detail and passion for quality ingredients is evident in every bite.",
        name: "Sarah Johnson",
        profile: "Food Critic",
    },
    {
        id: 2,
        rating: 5,
        comment:
            "My go-to restaurant for special occasions. The ambiance is perfect, service is impeccable, and the food never disappoints.",
        name: "Michael Chen",
        profile: "Regular Guest",
    },
    {
        id: 3,
        rating: 5,
        comment:
            "One of the best dining experiences I've had worldwide. The truffle carbonara is simply divine. A must-visit destination!",
        name: "Emma Williams",
        profile: "Travel Blogger",
    },
];

const TestimonialItem = ({
    id,
    rating,
    comment,
    name,
    profile,
}: {
    id: number;
    rating: number;
    comment: string;
    name: string;
    profile: string;
}) => {
    return (
        <Card key={id} className="px-8">
            <div className="rating">
                <div className="flex gap-1">
                    {Array.from({ length: rating }, (_, index) => (
                        <Star key={index} fill="currentColor" className="w-5 h-5 text-yellow-400" />
                    ))}
                </div>
                <p className="text-sm text-primary/50 mt-2 italic">"{comment}"</p>
                <p className="text-sm font-bold mt-5">{name}</p>
                <p className="text-sm text-primary/50 mt-2">{profile}</p>
            </div>
        </Card>
    );
};
