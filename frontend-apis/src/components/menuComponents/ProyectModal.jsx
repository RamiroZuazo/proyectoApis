import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { createProject } from "../../api/api.projects"; // Asegúrate de importar la función para crear el proyecto

const ProyectModal = ({ onCreate }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(""); // NUEVO ESTADO PARA GESTIONAR EL ERROR
    const [open, setOpen] = useState(false); // CAMBIAMOS EL ESTADO INICIAL A FALSE PARA QUE NO SE ABRA AUTOMÁTICAMENTE

    // Función para manejar la creación del proyecto
    const handleSubmit = async () => {
        if (name && description) {
            const newProject = {
                nombre: name,
                descripcion: description,
            };

            try {
                // Usamos la API para crear el proyecto y pasamos los datos
                const response = await createProject(newProject); 
                
                if (response.ok) {
                    // Si la creación es exitosa, limpiamos el formulario y cerramos el modal
                    setName("");
                    setDescription("");
                    setError(""); // LIMPIAMOS EL ERROR AL CREAR CORRECTAMENTE EL PROYECTO
                    setOpen(false); // CERRAMOS EL MODAL CUANDO LOS DATOS ESTÁN COMPLETOS
                    onCreate(response.project); // Pasamos el nuevo proyecto al componente principal
                } else {
                    setError("Error al crear el proyecto"); // Mostramos mensaje de error si la respuesta no es exitosa
                }
            } catch (err) {
                console.error(err);
                setError("Error al crear el proyecto"); // Mensaje de error general
            }
        } else {
            setError("Por favor, ingresa todos los datos para crear un proyecto."); // MOSTRAMOS EL MENSAJE DE ERROR
        }
    };

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger className="inline-flex items-center justify-center gap-1 py-2 px-3 mt-2 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg sm:mt-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                </svg>
                Nuevo proyecto
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black opacity-40 z-40" />
                <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg mx-auto px-4 z-50">
                    <div className="bg-white rounded-md shadow-lg px-4 py-6">
                        <div className="flex items-center justify-between">
                            <Dialog.Title className="text-lg font-medium text-gray-800">Crear un proyecto</Dialog.Title>
                            <Dialog.Close className="p-2 text-gray-400 rounded-md hover:bg-gray-100">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </Dialog.Close>
                        </div>
                        <Dialog.Description className="mt-3 text-sm leading-relaxed text-left text-gray-500">
                            Nombre del proyecto:
                        </Dialog.Description>
                        <fieldset className="Fieldset relative">
                            <input
                                className="w-full pl-2 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                placeholder="Nombre del proyecto"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </fieldset>

                        <Dialog.Description className="mt-3 text-sm leading-relaxed text-left text-gray-500">
                            Descripción del proyecto:
                        </Dialog.Description>
                        <fieldset className="Fieldset relative">
                            <input
                                className="w-full pl-2 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                placeholder="Descripción del proyecto"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </fieldset>

                        {/* MENSAJE DE ERROR */}
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                        {/* BOTÓN PARA CREAR EL PROYECTO */}
                        <button
                            className="text-sm mt-3 py-2.5 px-8 flex-1 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
                            onClick={handleSubmit}
                        >
                            Crear proyecto
                        </button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default ProyectModal;
