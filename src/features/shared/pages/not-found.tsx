import { HomeLayout } from '../layouts/HomeLayout'

export const NotFound = () => {
    return (
        <HomeLayout>
            <div className="flex flex-col items-center justify-center min-h-[70vh]">
                <h1 className="text-5xl font-bold text-center text-blue-500"
                >404</h1>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Página no encontrada</h2>
            </div>
        </HomeLayout>
    )
}
