import LoginForm from "@/components/LoginForm";
import { getServerSession } from "@/lib/get-session";
import React from "react";
import { redirect } from "next/navigation";

const LoginPage = async () => {
    const session = await getServerSession();
    if (session) return redirect("/");

    return (
        <>
            <LoginForm />
        </>
    );
};

export default LoginPage;
