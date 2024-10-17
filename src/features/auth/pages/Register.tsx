import { HomeLayout } from '../../shared/layouts/HomeLayout'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form';
// import { usersApi } from '../../../config/usersApi';
// import { ResponseRegister } from '../types/register.type';
import { useAuthStore } from '../store/authStore';
// import { AuthLayout } from '../layouts/auth-layout';

interface FormValues {
    name: string;
    email: string;
    password: string;
    repeatPassword: string;
    terms: boolean;
}

export const Register = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        // setValue,
        reset,
        setError
    } = useForm<FormValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            repeatPassword: '',
            terms: false
        }
    })

    const { register: registerUser } = useAuthStore();

    // const onSubmitHandler = async (data: FormValues) => {

    //     if (data.password !== data.repeatPassword) {
    //         setError('repeatPassword', {
    //             type: 'manual',
    //             message: 'Las contraseñas no coinciden'
    //         });
    //         return;
    //     }

    //     // if not accepted terms

    //     if (!data.terms) {
    //         setError('terms', {
    //             type: 'manual',
    //             message: 'Debe aceptar los términos y condiciones'
    //         });
    //         return;
    //     }

    //     console.log(data);

    //     try {

    //         const { email, name, password } = data;

    //         const resp = await usersApi.post<ResponseRegister>("/api/users?depth=0&fallback-locale=null", {
    //             email,
    //             name,
    //             role: 'CATALOG_ROLE',
    //             password
    //         });

    //         console.log({ resp });

    //         localStorage.setItem("x-token", resp.data.token);

    //         reset();
    //         console.log({ errors });

    //     } catch (error) {
    //         console.log({ error });
    //     }
    // }

    const onSubmitHandler = async (data: FormValues) => {

        if (data.password !== data.repeatPassword) {
            setError('repeatPassword', {
                type: 'manual',
                message: 'Las contraseñas no coinciden'
            });
            return;
        }

        // if not accepted terms

        if (!data.terms) {
            setError('terms', {
                type: 'manual',
                message: 'Debe aceptar los términos y condiciones'
            });
            return;
        }

        console.log(data);

        try {

            const response = registerUser(
                data.name,
                data.email,
                data.password,
                'CATALOG_ROLE'
            )
            console.log({ response });
            reset();
            console.log({ errors });

        } catch (error) {
            console.log({ error });
        }
    }

    return (
        // <AuthLayout>
        <HomeLayout>
            <div className="flex flex-col justify-center min-h-[80vh]">
                <form
                    onSubmit={handleSubmit(onSubmitHandler)}
                    className="w-full max-w-sm mx-auto border p-7 rounded-xl bg-gray-900">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Registre su cuenta</h2>

                    <div className="mb-5 mt-3">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                        <input type="text" id="name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="nombre" required
                            {
                            ...register('name')
                            }
                        />
                        {
                            errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>
                        }
                    </div>
                    <div className="mb-5 mt-3">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required
                            {
                            ...register('email')
                            }
                        />
                        {
                            errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>
                        }
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                        <input type="password" id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required
                            {
                            ...register('password')
                            }
                        />
                        {
                            errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>
                        }
                    </div>
                    <div className="mb-5">
                        <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repetir contraseña</label>
                        <input type="password" id="repeat-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required
                            {
                            ...register('repeatPassword')
                            }
                        />
                        {
                            errors.repeatPassword && <span className="text-red-500 text-sm">{errors.repeatPassword.message}</span>
                        }
                    </div>
                    <div className="flex items-start mb-5">
                        <div className="flex items-center h-5">
                            <input id="terms" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required
                                {
                                ...register('terms')
                                }
                            />
                        </div>
                        <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
                        {
                            errors.terms && <span className="text-red-500 text-sm">{errors.terms.message}</span>
                        }
                    </div>

                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new account</button>

                    <div className="mt-4">
                        <span className="text-sm text-gray-900 dark:text-white">Already have an account?{" "}
                            <Link to="/auth/login" className="text-blue-700 hover:underline dark:text-blue-500">Login here</Link></span>
                    </div>

                </form>
            </div>
        </HomeLayout>
        // </AuthLayout>
    )
}
