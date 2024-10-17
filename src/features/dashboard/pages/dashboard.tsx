import { DashboardLayout } from "../layouts/DashboardLayout"

export const Dashboard = () => {

    return (
        <DashboardLayout>
            {/* dashboard */}
            <div className="flex flex-col p-10 overflow-x-auto h-full">
                <div className="flex flex-col justify-center items-center gap-3 min-h-[60vh]">

                    <h1 className="text-2xl font-bold">Bienvenido a User Mangement</h1>
                    <img src="https://res.cloudinary.com/react-romel/image/upload/v1729097526/user-interface_msfgbk.png" className="h-20" alt="Flowbite Logo" />
                </div>
            </div>
        </DashboardLayout>
    )
}
