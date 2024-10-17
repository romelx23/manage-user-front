import { FC } from "react";
import { useAuthStore } from "../../auth/store/authStore";
import { IRoles } from "../types/roles";
import { DashboardLayout } from "../../dashboard/layouts/DashboardLayout";

interface RolesLayoutProps {
    children: React.ReactNode;
    roles: IRoles[];
}

export const RolesLayout: FC<RolesLayoutProps> = ({ children, roles }) => {
    const { user } = useAuthStore();
    return (
        <>
            {
                roles.includes(user?.role as IRoles) ? (
                    <>{children}</>
                ) : (
                    <DashboardLayout>
                        <div className="w-full min-h-screen flex justify-center items-center">Unauthorized</div>
                    </DashboardLayout>
                )
            }
        </>
    );
}