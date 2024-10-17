import { useEffect, useState } from "react";
import { ModalWrapper } from "../../shared/components/modal-wrapper";
import { FormIncidents } from "../components/catalogs/form-catalogs";
import { DashboardLayout } from "../layouts/DashboardLayout"
import Swal from "sweetalert2";
import { usersApi } from "../../../config/usersApi";
import { IResponseCatalog, ICatalog } from "../types/catalogs.types";
import { useAuthStore } from "../../auth/store/authStore";
import { useForm } from "react-hook-form";
import { formatInTimeZone } from "date-fns-tz";
// import { FilePrint } from "../components/incidents/file-print";
// import { driver } from "driver.js";

export const DashboardIncidents = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [catalogs, setIncidents] = useState<ICatalog[]>([]);
    // const [incident, setIncident] = useState<ICatalog | null>(null);

    const [id, setId] = useState<string>('');
    const [loader, setLoader] = useState(false);
    const { user } = useAuthStore();

    const {
        register,
        handleSubmit,
    } = useForm<{
        search: string,
        date: string
    }>({
        defaultValues: {
            search: '',
            date: ''
        }
    });

    const getCatalogs = async (name?: string, date?: string) => {
        try {
            setLoader(true);
            const { data: incidentsData } = await usersApi.get<IResponseCatalog>(`/api/catalog?limit=50&search=${ name }&date=${ date }`, {
                headers: {
                    'Authorization': `Bearer ${ localStorage.getItem('x-token') }`
                    // 'x-token': localStorage.getItem('x-token')
                }
            }); // Fetch categories
            console.log({ areasData: incidentsData });
            setIncidents(incidentsData.docs);
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
                    const response = await usersApi.delete(`/api/catalog/${ id }`, {
                        headers: {
                            'Authorization': `Bearer ${ localStorage.getItem('x-token') }`
                        }
                    });
                    console.log({ response });
                    getCatalogs();
                    Swal.fire(
                        'Eliminado!',
                        'Tu área ha sido eliminada.',
                        'success'
                    );
                }
            });
        } catch (error) {
            console.error('Error deleting area:', error);
        }
    };

    useEffect(() => {
        getCatalogs();
    }, []);

    return (
        <DashboardLayout>
            <div className="flex flex-col p-4">
                <div className="flex flex-wrap items-center justify-between max-w-6xl mb-2 relative z-20 gap-2">
                    <h3 className="text-lg font-semibold ">
                        Gestión de Catálogo
                    </h3>
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
                            id="add-button"
                            onClick={() => {
                                getCatalogs();
                            }}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-restore"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3.06 13a9 9 0 1 0 .49 -4.087" /><path d="M3 4.001v5h5" /><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>
                        </button>
                        <button
                            onClick={() => setIsOpen(true)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md">
                            Nuevo Producto
                        </button>
                    </div>
                </div>

                <div className="flex flex-wrap items-center mb-2">
                    <form
                        onSubmit={handleSubmit((data) => {
                            console.log(data);
                            getCatalogs(data.search, data.date);
                        })}
                        className="flex items-start"
                        id="incident-table"
                    >
                        <div className="flex flex-col px-2">
                            <input type="text" placeholder="Buscar catálogo" className="px-4 py-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 focus:border-2 border-transparent border-2 w-full"
                                {
                                ...register('search')
                                }
                            />
                            <span
                                className="px-2 text-gray-500 dark:text-gray-400 text-sm"
                            >
                                * Buscar por título o nombre del prducto
                            </span>
                        </div>
                        <div className="flex flex-col px-2">
                            <input type="date" placeholder="Buscar incidencia por fecha" className="px-4 py-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 focus:border-2 border-transparent border-2 w-full"
                                {
                                ...register('date')
                                }
                            />
                        </div>
                        <button type="submit" className="px-3 py-2 bg-blue-500 text-white rounded-md"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
                        </button>
                    </form>

                </div>


                <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-6xl">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Nombre del Producto
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Precio
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Fecha de creación
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Fecha de actualización
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                catalogs &&
                                catalogs.length === 0 && (
                                    <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td colSpan={11} className="text-center py-4">
                                            No hay productos
                                        </td>
                                    </tr>
                                )
                            }
                            {
                                catalogs &&
                                catalogs.map((catalog, index) => (
                                    <tr
                                        key={index}
                                        className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {catalog.nameItem}
                                        </th>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {catalog?.price}
                                        </th>
                                        <td className="px-6 py-4">
                                            {
                                                formatInTimeZone(new Date(catalog.createdAt), 'UTC', 'yyyy-MM-dd')
                                            }
                                        </td>
                                        <td className="px-6 py-4">
                                            {
                                                formatInTimeZone(new Date(catalog.updatedAt), 'UTC', 'yyyy-MM-dd')
                                            }
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <button
                                                onClick={() => {
                                                    setIsOpen(true);
                                                    setId(catalog.id);
                                                }}
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                                            </button>
                                            {
                                                user?.role !== "AMBIENT_ROLE" &&
                                                <button
                                                    onClick={() => handleDelete(catalog.id)}
                                                    className="font-medium text-red-600 dark:text-red-500 hover:underline">

                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-circle-minus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M9 12l6 0" /></svg>

                                                </button>
                                            }
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

                {
                    <ModalWrapper
                        title={id ? 'Editar Producto' : 'Nuevo Producto'}
                        isOpen={isOpen}
                        maxWidth="xl"
                        onClose={() => {
                            Swal.fire({
                                title: '¿Estás seguro?',
                                text: "No podrás revertir esto!",
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Sí, salir!'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    setIsOpen(false);
                                    setId('');
                                }
                            });
                        }}
                    >
                        <FormIncidents
                            id={id}
                            onClose={() => {
                                setIsOpen(false);
                                setId('');
                                getCatalogs();
                            }}
                        />
                    </ModalWrapper>
                }
            </div>
        </DashboardLayout>
    )
}
