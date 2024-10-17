import { FC, useEffect } from "react";
import { usersApi } from "../../../../config/usersApi";
import { useForm } from "react-hook-form";
import { IAmbient } from "../../types/ambients.types";
import { formatInTimeZone } from "date-fns-tz";

interface FormIncidentsType {
    // _id: string;
    dayRegister: string;
    quantity: number;
}

interface FormIncidentsProps {
    // onSubmit: (data: FormIncidentsType) => void;
    id?: string;
    onClose?: () => void;
}

export const FormAreas: FC<FormIncidentsProps> = ({ id, onClose }) => {

    const initialData = {
        // _id: '',
        dayRegister: '',
        quantity: 0
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset
    } = useForm<FormIncidentsType>({ defaultValues: initialData });

    const onSubmitHandler = async (data: FormIncidentsType) => {
        try {
            console.log(data);
            const response = id
                ? await usersApi.put(`/api/ambient/${ id }`, data,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': 'Bearer ' + localStorage.getItem('x-token')
                        }
                    }
                ) // Update
                : await usersApi.post('/api/ambient', data,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': 'Bearer ' + localStorage.getItem('x-token')
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
                    const { data } = await usersApi.get<IAmbient>(`/api/ambient/${ id }`,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                'Authorization': 'Bearer' + localStorage.getItem('x-token')
                            }
                        }
                    );
                    console.log({ data });
                    setValue('dayRegister', formatInTimeZone(new Date(data.dayRegister), 'UTC', 'yyyy-MM-dd'));
                    setValue('quantity', data.quantity);

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
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Día de registro</label>
                    <input
                        type="date"
                        id="name"
                        {...register('dayRegister', { required: 'Día de registro es requerido' })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Día de registro"
                        autoComplete="off"
                    />
                    {errors.dayRegister && <span className="text-red-500 text-sm">{errors.dayRegister.message}</span>}
                </div>
                <div className="col-span-2">
                    <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cantidad</label>
                    <input
                        id="quantity"
                        type="number"
                        step="0.01" // Esto permite decimales
                        {...register('quantity', { required: 'cantidad es requerida' })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="1"
                        autoComplete="off"
                    />
                    {errors.dayRegister && <span className="text-red-500 text-sm">{errors.dayRegister.message}</span>}
                </div>
            </div>
            <button
                type="submit"
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
                </svg>
                {id ? 'Actualizar  Ambiente' : 'Agregar nuevo Ambiente'}
            </button>
        </form>

    )
}
