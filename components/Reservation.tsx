"use client";

import { Card } from "@/components/ui/card";
import { CalendarIcon, Clock4, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { reserveTableFormSchema } from "@/schema";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import { authClient } from "@/lib/auth-client";

const Reservation = () => {
    const [pending, setPending] = useState<boolean>(false);

    const { data, isPending } = authClient.useSession();
    const session = data;
    const isLoggedIn = !isPending && !!session?.user;

    const form = useForm<z.infer<typeof reserveTableFormSchema>>({
        resolver: zodResolver(reserveTableFormSchema),
        defaultValues: {
            fullName: "",
            email: "",
            phoneNumber: "",
            numberOfGuests: 1, // Changed from 0 to 1
            date: undefined,
            time: "",
            specialRequests: "",
        },
    });

    useEffect(() => {
        if (session?.user) {
            form.setValue("email", session.user.email || "");
            form.setValue("fullName", session.user.name || "");
        }
    },[session,form])

    const onSubmit = async (
        values: z.infer<typeof reserveTableFormSchema>
    ) => {
        alert("HGello World")
    };

    return (
        <div className="padding">
            <div className=" mt-10 flex flex-col items-center md:mt-15 lg:mt-20">
                <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold">
                    Reserve Your Table
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl font-medium mt-5 text-primary/50">
                    Book your culinary experience with us
                </p>
            </div>
            <div className="flex flex-col lg:flex-row justify-center items-center gap-5 mt-10">
                <Card className="px-5 gap-0 lg:px-10 w-full lg:w-[300px] h-[150px]">
                    <div className="flex items-start space-x-2">
                        <CalendarIcon className="w-5 h-5" />
                        <span className="text-lg font-semibold">Hours</span>
                    </div>
                    <p className="text-primary/50">
                        Mon-Thu: 5:00 PM - 10:00 PM
                    </p>
                    <p className="text-primary/50">
                        Fri-Sat: 5:00 PM - 11:00 PM
                    </p>
                    <p className="text-primary/50">Sunday: 4:00 PM - 9:00 PM</p>
                </Card>
                <Card className="px-5 gap-0 lg:px-10  w-full lg:w-[300px]  h-[150px]">
                    <div className="flex items-start space-x-2">
                        <Clock4 className="w-5 h-5" />
                        <span className="text-lg font-semibold">Duration</span>
                    </div>
                    <p className="text-primary/50 flex flex-col">
                        <span>Average dining time:</span>
                        <span className="text-primary/80">90-120 minutes</span>
                    </p>
                </Card>
                <Card className="px-5 gap-0 lg:px-10 w-full lg:w-[300px] h-[150px]">
                    <div className="flex items-start space-x-2">
                        <Users className="w-5 h-5" />
                        <span className="text-lg font-semibold">Hours</span>
                    </div>
                    <p className="text-primary/50">
                        Tables for 1-8 guests Larger parties: Call us
                    </p>
                </Card>
            </div>
            <div className="flex justify-center items-center">
                <Card className="my-25 w-full md:w-2/3 ">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="px-3 py-3 md:px-7 md:py-5 lg:px-12 lg:py-8 space-y-8"
                        >
                            <div className="flex flex-col md:flex-row space-y-3 lg:space-y-0 lg:space-x-5">
                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem className="w-full md:w-1/2 ">
                                            <FormLabel>Full Name *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="John Doe"
                                                    {...field}
                                                    type="text"
                                                    disabled={isLoggedIn}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="w-full md:w-1/2 ">
                                            <FormLabel>Email *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="john@example.com"
                                                    {...field}
                                                    type="email"
                                                    disabled={isLoggedIn}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex flex-col md:flex-row space-y-3 lg:space-y-0 lg:space-x-5">
                                <FormField
                                    control={form.control}
                                    name="phoneNumber"
                                    render={({ field }) => (
                                        <FormItem className="w-full md:w-1/2 ">
                                            <FormLabel>Phone Number </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="512345678"
                                                    {...field}
                                                    type="text"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="numberOfGuests"
                                    render={({ field }) => (
                                        <FormItem className="w-full md:w-1/2 ">
                                            <FormLabel>
                                                Number of Guests *
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="1"
                                                    type="number"
                                                    value={
                                                        field.value === 0
                                                            ? ""
                                                            : field.value
                                                    }
                                                    onChange={(e) => {
                                                        const value =
                                                            e.target.value;
                                                        field.onChange(
                                                            value === ""
                                                                ? 0
                                                                : Number(value)
                                                        );
                                                    }}
                                                    onBlur={field.onBlur}
                                                    ref={field.ref}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex flex-col md:flex-row space-y-3 lg:space-y-0 lg:space-x-5">
                                <FormField
                                    control={form.control}
                                    name="date"
                                    render={({ field }) => (
                                        <FormItem className="w-full md:w-1/2 ">
                                            <FormLabel>Date</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            className={cn(
                                                                "w-full pl-3 text-left font-normal",
                                                                !field.value &&
                                                                    "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(
                                                                    field.value,
                                                                    "PPP"
                                                                )
                                                            ) : (
                                                                <span>
                                                                    Pick a date
                                                                </span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent
                                                    className="w-full p-0"
                                                    align="start"
                                                >
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={
                                                            field.onChange
                                                        }
                                                        captionLayout="dropdown"
                                                        className="w-full"
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="time"
                                    render={({ field }) => (
                                        <FormItem className="w-full md:w-1/2 ">
                                            <FormLabel>Time *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="-- --"
                                                    {...field}
                                                    type="time"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="specialRequests"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>
                                            Special Requests *
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Dietary restrictions, allergies, or special requests"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                disabled={pending}
                                className="w-full"
                                size="lg"
                                type="submit"
                            >
                                Reserve Table
                            </Button>
                        </form>
                    </Form>
                </Card>
            </div>
        </div>
    );
};

export default Reservation;
