import { useEffect, useState } from "react";
import { ModalWrapper } from "../../shared/components/modal-wrapper";
import { FormAreas } from "../components/ambients/form-ambients";
import { DashboardLayout } from "../layouts/DashboardLayout"
import { usersApi } from "../../../config/usersApi";
import { IAmbient, IResponseAmbient } from "../types/ambients.types";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
// import { format } from "date-fns";
import { formatInTimeZone } from 'date-fns-tz'

export const DashboardAreas = () => {
    // const areas = [1, 2, 3, 4, 5, 6, 7];
    const [isOpen, setIsOpen] = useState(false);
    const [ambientStates, setAmbientStates] = useState<IAmbient[]>([]);

    const {
        register,
        handleSubmit,
    } = useForm<{
        search: string
    }>({ defaultValues: { search: '' } });

    const [id, setId] = useState<string>('');
    const [loader, setLoader] = useState(false);

    const getAmbient = async (name?: string) => {
        try {
            setLoader(true);
            const { data: areasData } = await usersApi.get<IResponseAmbient>(`/api/ambient?limit=50&search=${ name }`, {
                headers: {
                    'Authorization': `Bearer ${ localStorage.getItem('x-token') }`
                }
            }); // Fetch categories
            console.log({ areasData });
            setAmbientStates(areasData.docs);
            setLoader(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoader(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            Swal.fire({
                title: '¿Estás seguro?',
                text: "No podrás revertir esto!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminarlo!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const response = await usersApi.delete(`/api/ambient/${ id }`,
                        {
                            headers: {
                                'Authorization': `Bearer ${ localStorage.getItem('x-token') }`
                            }
                        }
                    )
                    console.log({ response });
                    getAmbient();
                    Swal.fire(
                        'Eliminado!',
                        'Tu área ha sido eliminada.',
                        'success'
                    );
                }
            });
        } catch (error) {
            console.error('Error deleting area:', error);
            Swal.fire(
                'Error!',
                'Ocurrió un error al eliminar el Ambiente.',
                'error'
            );
        }
    };

    useEffect(() => {
        getAmbient();
    }, []);

    return (
        <DashboardLayout>
            <div className="flex flex-col p-4">
                <div className="flex items-center flex-wrap justify-between max-w-4xl mb-4 relative z-20 gap-2">
                    <h3 className="text-lg font-semibold ">
                        Gestión de Ambiente
                    </h3>
                    <form
                        onSubmit={handleSubmit((data) => {
                            getAmbient(data.search);
                        })}
                        className="flex items-center"
                    >
                        <input type="text" placeholder="Buscar área" className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 focus:border-2 md:w-56 w-full"
                            {
                            ...register('search')
                            }
                        />
                        <button type="submit" className="px-3 py-2 bg-blue-500 text-white rounded-md"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
                        </button>
                    </form>

                    {/* loader */}
                    {
                        loader && (
                            <div className="absolute top-12  flex items-center justify-center translate-x-1/2 left-1/2">
                                <svg className="animate-spin h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                </svg>
                            </div>
                        )
                    }

                    <div className="flex gap-2">
                        <button
                            onClick={() => {
                                getAmbient();
                            }}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-restore"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3.06 13a9 9 0 1 0 .49 -4.087" /><path d="M3 4.001v5h5" /><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>
                        </button>
                        <button
                            onClick={() => setIsOpen(true)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md">
                            Nueva ambiente
                        </button>
                    </div>
                </div>


                <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-4xl">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Día de registro
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Cantidad de Litros por día
                                </th>
                                <th scope="col" className="px-6 py-3 text-right">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                ambientStates.map((ambient, index) => (
                                    <tr
                                        key={index}
                                        className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {
                                                // format(new Date(ambient.dayRegister), 'dd/MM/yyyy')
                                                formatInTimeZone(new Date(ambient.dayRegister), 'UTC', 'dd/MM/yyyy')
                                            }
                                        </th>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 font-semibold rounded-full ${ ambient.quantity > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800' }`}>
                                                {ambient.quantity} Litros
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <button
                                                onClick={() => {
                                                    setIsOpen(true);
                                                    setId(ambient.id);
                                                }}
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(ambient.id)}
                                                className="font-medium text-red-600 dark:text-red-500 hover:underline">

                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-circle-minus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M9 12l6 0" /></svg>

                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

                {
                    <ModalWrapper
                        title={id ? 'Editar Ambiente' : 'Nuevo Ambiente'}
                        isOpen={isOpen}
                        onClose={() => {
                            setIsOpen(false);
                            setId('');
                        }}
                    >
                        <FormAreas
                            id={id}
                            onClose={() => {
                                setIsOpen(false);
                                setId('');
                                getAmbient();
                            }}
                        />
                    </ModalWrapper>
                }

            </div>
        </DashboardLayout>
    )
}
