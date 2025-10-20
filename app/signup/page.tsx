import Register from "@/components/RegisterForm";
import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/get-session";

const RegisterPage = async () => {
    const session = await getServerSession();
    if (session) return redirect("/");
    
    return (
        <>
            <Register />
        </>
    );
};

export default RegisterPage;
