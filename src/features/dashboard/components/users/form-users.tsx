import { FC, useEffect } from "react";
import { usersApi } from "../../../../config/usersApi";
import { useForm } from "react-hook-form";
import { IUser } from "../../types/users.types";
import { IRoles } from "../../../shared/types/roles";

interface FormUsersType {
    // _id: string;
    name: string;
    role?: IRoles;
    email?: string;
    password?: string;
}

interface FormUserProps {
    // onSubmit: (data: FormIncidentsType) => void;
    id?: string;
    onClose?: () => void;
}

export const FormUsers: FC<FormUserProps> = ({ id, onClose }) => {

    const initialData: FormUsersType
        = {
        name: '',
        role: 'CATALOG_ROLE',
        email: '',
        password: ''
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset
    } = useForm<FormUsersType>({ defaultValues: initialData });

    const onSubmitHandler = async (data: FormUsersType) => {
        // if is created user delete status, and role from data
        if (!id) {
            data = {
                name: data.name,
                email: data.email,
                password: data.password
            }
        }

        try {
            console.log(data);
            const response = id
                ? await usersApi.put(`/api/users/${ id }`, data,
                    {
                        headers: {
                            'Authorization': `Bearer ${ localStorage.getItem('x-token') }`
                        }
                    }
                ) // Update
                : await usersApi.post('/api/user', data,
                    {
                        headers: {
                            'Authorization': `Bearer ${ localStorage.getItem('x-token') }`
                        }
                    }
                ); // Create
            console.log({ response });
            reset();
            onClose && onClose();
        } catch (error) {
            console.error('Error submitting form:', error);
            // Handle form submission errors (e.g., display error messages)
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    const { data } = await usersApi.get<IUser>(`/api/users/${ id }`);
                    console.log({ data });
                    setValue('name', data.name); //
                    setValue('email', data.email);
                    setValue('role', data.role as IRoles);
                    // setFormData(data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id])

    useEffect(() => {
        if (!id) {
            reset();
        }
    }, [id, reset]);


    return (
        <form onSubmit={handleSubmit(onSubmitHandler)} className="p-4 md:p-5">
            <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                    <input
                        type="text"
                        id="name"
                        {...register('name', { required: 'Title is required' })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Type incident title"
                        autoComplete="offd"
                    />
                    {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                </div>

                {/* {
                    id && */}
                <>
                    {/* <div className="col-span-2">
                            <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Estado</label>
                            <select
                                id="status"
                                {...register('status', { required: 'Estado is required' })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            >
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </select>
                            {errors.status && <span className="text-red-500 text-sm">{errors.status.message}</span>}
                        </div> */}
                    <div className="col-span-2">
                        <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rol</label>
                        <select
                            id="role"
                            {...register('role', { required: 'Role is required' })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        >
                            <option value="ADMIN_ROLE">ROL ADMIN</option>
                            <option value="CATALOG_ROLE">ROL CATALOGO</option>
                            <option value="AMBIENT_ROLE">ROL AMBIENTE</option>
                        </select>

                        {errors.role && <span className="text-red-500 text-sm">{errors.role.message}</span>}
                    </div>
                </>
                {/* } */}
                {
                    !id &&
                    <>
                        <div className="col-span-2">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input
                                type="email"
                                id="email"
                                {...register('email', { required: 'Email is required' })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Type incident title"
                                autoComplete="off"
                            />
                            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                        </div>
                        <div className="col-span-2">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input
                                type="password"
                                id="password"
                                {...register('password', { required: 'Password is required' })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Type incident title"
                                autoComplete="off"
                            />

                            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                        </div>
                    </>
                }
            </div>
            <button
                type="submit"
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
                </svg>
                {id ? 'Update user' : 'Add new user'}
            </button>
        </form>

    )
}
