import { HomeLayout } from '../../shared/layouts/HomeLayout'

export const Home = () => {
    return (
        <HomeLayout>
            <div className='min-h-[80vh] '>
                <div className='flex flex-col items-center justify-center w-full min-h-[70vh]'>
                    <h1 className='text-5xl font-bold text-center'>
                        Bienvenido a <span className='text-blue-500'>
                            {" "}User Management
                        </span>
                    </h1>
                    <span>
                        <p className='text-2xl text-center text-gray-400'>
                            Gestiona tus
                            <span className='text-blue-500'>
                                {" "}usuarios
                            </span>
                            {" "}de forma sencilla, rápida y segura
                        </p>
                    </span>
                </div>
            </div>
        </HomeLayout>
    )
}
