import { Calendar, List } from "lucide-react";
import Link from "next/link";
import React from "react";

const Hero = () => {
    return (
        <section
            className="relative h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: "url('/images/hero-restaurant.jpg')" }}
        >
            <div className="absolute inset-0 bg-secondary/30"></div>
            {/* Text Content */}
            <div className="relative z-10 flex flex-col items-start justify-center text-white px-4 mx-auto">
                <p className="text-5xl md:text-7xl font-bold mb-4">
                    Experience
                </p>
                <p className="text-5xl md:text-7xl font-bold mb-4">
                    Culinary Excellence
                </p>
                <p className="text-lg md:text-2xl mb-6 max-w-2xl">
                    Indulge in authentic flavors crafted with passion, served in
                    an atmosphere of warmth and elegance.
                </p>
                <div className="flex flex-col w-full sm:space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                    <Link
                        href="/reservation"
                        className="flex items-center justify-center bg-primary text-secondary px-6 py-3 rounded-full font-semibold hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                        <Calendar className="w-5 h-5 mr-2" />
                        <span>Reserve a Table</span>
                    </Link>
                    <Link
                        href="/menu"
                        className="flex items-center justify-center bg-primary/20 backdrop-blur-sm text-secondary border-2 border-secondary px-6 py-3 rounded-full font-semibold hover:bg-primary hover:text-secondary transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                        <List className="w-5 h-5 mr-2" />
                        <span>View Menu</span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;
