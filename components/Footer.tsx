import React from "react";
import { Separator } from "@/components/ui/separator";
const Footer = () => {
    return (
        <div className="bg-primary text-secondary padding">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                <div className="">
                    <h1 className="text-xl font-bold">Savoria</h1>
                    <p className="text-md mt-3">
                        Experience culinary excellence in every bite
                    </p>
                </div>
                <div className="">
                    <h1 className="text-xl font-bold">Contact</h1>
                    <p className="text-md mt-3">123 Gourmet Street</p>
                    <p className="text-md">New York, NY 10001</p>
                    <p className="text-md">+1 (555) 123-4567</p>
                </div>
                <div className="">
                    <h1 className="text-xl font-bold">Hours</h1>
                    <p className="text-md mt-3">Mon-Thu: 5:00 PM - 10:00 PM</p>
                    <p className="text-md">Fri-Sat: 5:00 PM - 11:00 PM</p>
                    <p className="text-md">Sunday: 4:00 PM - 9:00 PM</p>
                </div>
            </div>
            <Separator className="my-4" />
            <div className="flex items-center justify-center mb-5">
                <p className="font-light text-sm">© 2025 Savoria. All rights reserved.</p>
            </div>
        </div>
    );
};

export default Footer;
