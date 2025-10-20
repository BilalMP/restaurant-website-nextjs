"use client";

import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";
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
} from "./ui/form";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { loginSchema } from "@/schema";
import { authClient } from "@/lib/auth-client";

const LoginForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirect") || "/";
    const [isPending, setIsPending] = useState<boolean>(false);

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof loginSchema>) => {
        await authClient.signIn.email(
            {
                email: values.email,
                password: values.password,
            },
            {
                onRequest: () => {
                    setIsPending(true);
                },
                onSuccess: () => {
                    form.reset();
                    toast.success("Logged in successfully");
                    router.push("/");
                },
                onError:(ctx:any)=> {
                    toast.error(ctx);
                    setIsPending(false);
                }
            }
        );
    };

    return (
        <div className="flex items-center justify-center md:mt-20">
            <Card className="w-[400px] ">
                <CardHeader>
                    <CardTitle className="text-lg font-bold md:text-xl lg:text-2xl text-center">
                        Welcome Back
                    </CardTitle>
                    <CardDescription className="text-center">
                        Sign in to your Savoria account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="example@example.com"
                                                {...field}
                                                type="email"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="*****"
                                                {...field}
                                                type="password"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                disabled={isPending}
                                className="w-full"
                                size="lg"
                                type="submit"
                            >
                                Sign In
                            </Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex justify-center items-center">
                    <p className="text-center text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <Link
                            href={`/signup`}
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Sign Up
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default LoginForm;
