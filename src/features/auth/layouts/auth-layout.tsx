import { FC, ReactNode, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

interface AuthLayoutProps {
    children: ReactNode;
}

export const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
    const { user } = useAuthStore();
    console.log({ user });
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
        console.log({ user });
    }, [user, navigate]);
    return (
        <>
            {children}
        </>
    )
}
