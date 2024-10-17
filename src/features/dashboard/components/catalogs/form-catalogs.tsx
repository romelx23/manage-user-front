import { FC, useEffect, useState } from "react";
import { usersApi } from "../../../../config/usersApi";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { ICatalog, IFileIncident } from "../../types/catalogs.types";
import { TopLoader } from "../../../shared/components/top-loader";

interface FormIncidentsType {
    _id: string;
    nameItem: string;
    price: string;
}

interface FormIncidentsProps {
    id?: string;
    onClose?: () => void;
}

export const FormIncidents: FC<FormIncidentsProps> = ({ id, onClose }) => {

    const initialData: FormIncidentsType
        = {
        _id: '',
        nameItem: '',
        price: '',
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset
    } = useForm<FormIncidentsType>({ defaultValues: initialData });

    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [, setViewFiles] = useState<IFileIncident[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // getIncident by id
    useEffect(() => {
        const getCatalog = async () => {
            try {
                if (id) {
                    const { data } = await usersApi.get<ICatalog>(`/api/catalog/${ id }`);
                    console.log({ data });
                    setValue('nameItem', data.nameItem);
                    setValue('price', data.price.toString());
                    // setValue('files', data.incident.files);
                    // setFormData(data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        getCatalog();
    }, [id])

    const onSubmitHandler = async (data: FormIncidentsType) => {
        console.log({ data });

        if (isSubmitting) return;

        const formData = new FormData();
        formData.append('nameItem', data.nameItem);
        formData.append('price', data.price);

        // array of files with name, path and type
        // console.log(data?.nameItem);
        // const files = selectedFiles.map((file) => file);

        // formData.append('files', selectedFiles[1]);
        for (const file of selectedFiles) {
            formData.append('files', file); // Append each file
        }

        setIsSubmitting(true);

        try {
            // const response = id
            //     ? await usersApi.put(`/api/incident/${ initialData?._id }`, data) // Update
            //     : await usersApi.post('/api/incident', data); // Create
            // const response = await usersApi.post('/api/incident', data)
            console.log(formData);
            const response = id ?
                await usersApi.put(`/api/catalog/${ id }`, formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': 'Bearer ' + localStorage.getItem('x-token')
                        }
                    }
                ) :
                await usersApi.post('/api/catalog', formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': 'Bearer ' + localStorage.getItem('x-token')
                        }
                    }
                )

            console.log({ response });

            reset();
            setSelectedFiles([]);
            setViewFiles([]);
            onClose && onClose();
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Incident has been submitted successfully',
            });

            setIsSubmitting(false);
        } catch (error) {
            console.error('Error submitting form:', error);
            // Handle form submission errors (e.g., display error messages)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while submitting the form',
            });
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (!id) {
            reset();
            setSelectedFiles([]);
            setViewFiles([]);
        }
    }, [id, reset]);


    return (
        <>
            <form onSubmit={handleSubmit(onSubmitHandler)} className="p-4 md:p-5 max-h-[80vh] overflow-y-auto">
                <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre del producto</label>
                        <input
                            type="text"
                            id="title"
                            {...register('nameItem', { required: 'Title is required' })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Type incident title"
                            autoComplete="off"
                        />
                        {errors.nameItem && <span className="text-red-500 text-sm">{errors.nameItem.message}</span>}
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Precio</label>
                        <input
                            id="price"
                            step="0.01" // Esto permite decimales
                            type="number"
                            {...register('price', { required: 'Description is required' })}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="precio del producto"
                            autoComplete="off"
                        ></input>
                        {errors.price && <span className="text-red-500 text-sm">{errors.price.message}</span>}
                    </div>

                </div>
                <div className="flex flex-col gap-2">

                    {
                        selectedFiles.length > 0 &&
                        selectedFiles.map((file, index) => (
                            <div key={index} className="col-span-2 sm:col-span-1 relative">
                                <label htmlFor="files" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">File {index + 1}</label>
                                <p
                                    className="w-full text-sm text-gray-900 dark:text-white truncate"
                                >{file.name}</p>
                                <button
                                    type="button"
                                    className="text-white inline-flex items-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 absolute top-0 right-0 mt-2 mr-2"
                                    onClick={() => setSelectedFiles(selectedFiles.filter((_, i) => i !== index))}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-4 h-4"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                                </button>

                            </div>
                        ))
                    }
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
                    </svg>
                    {id ? 'Update incident' : 'Add new incident'}
                </button>
            </form>
            <TopLoader showLoader={isSubmitting} />
        </>
    )
}
