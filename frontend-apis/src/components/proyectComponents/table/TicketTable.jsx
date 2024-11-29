import { useState, useEffect } from "react";
import TicketModal from "../modal/TicketModal";
import PhotoModal from "../modal/PhotoModal";
import { getTicketsByProject } from "../../../api/api.tickets"; 
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined'; // Icono para previsualización
import { useParams } from 'react-router-dom';

export default ({ proyectoId }) => {
    const [tableItems, setTableItems] = useState([]);
    const [photoModalOpen, setPhotoModalOpen] = useState(false); // Controla la visibilidad del modal
    const [selectedPhoto, setSelectedPhoto] = useState(null); // Guarda la URL de la imagen seleccionada
    const { proyecto_id } = useParams(); 

    // Función para cerrar el modal de la foto
    const handleClosePhotoModal = () => {
        setPhotoModalOpen(false); // Cierra el modal
        setSelectedPhoto(null);  // Resetea la imagen seleccionada
    };

    // Función para abrir el modal con la imagen seleccionada
    const handleOpenPhotoModal = (imageUrl) => {
        setSelectedPhoto(imageUrl); // Establece la imagen seleccionada
        setPhotoModalOpen(true); // Abre el modal
    };

    // Función para eliminar un ticket
    const handleDeleteItem = (idx) => {
        const updatedItems = tableItems.filter((_, index) => index !== idx);
        setTableItems(updatedItems);
    };

    // Función para cargar los tickets al montar el componente
    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const tickets = await getTicketsByProject(proyectoId); // Llamada a la API con el ID del proyecto
                setTableItems(tickets); // Actualiza el estado con los tickets
            } catch (error) {
                console.error("Error al cargar los tickets:", error);
            }
        };

        fetchTickets(); // Llama a la función cuando el componente se monte
    }, [proyectoId]); // Se ejecuta cuando el proyectoId cambie (si es dinámico)

    return (
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
            <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
                <table className="w-full table-auto text-sm text-left">
                    <thead className="text-gray-600 font-medium border-b">
                        <tr>
                            <th className="py-3 px-6">Responsable</th>
                            <th className="py-3 px-6">Descripción</th>
                            <th className="py-3 px-6">Fecha</th>
                            <th className="py-3 px-6">Monto</th>
                            <th className="py-3 px-6">Imagen</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                        {tableItems.map((item, idx) => (
                            <tr key={idx} className="odd:bg-gray-50 even:bg-white">
                                <td className="px-6 py-4 whitespace-nowrap">{item.usuario_responsable.nombre}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.descripcion}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.fecha}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{`$${item.monto}`}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {item.imagen_ticket && (
                                        <InsertPhotoOutlinedIcon
                                            onClick={() => handleOpenPhotoModal(item.imagen_ticket)} // Al hacer clic, abre el modal con la imagen
                                            className="cursor-pointer text-gray-600 hover:text-gray-500"
                                        />
                                    )}
                                </td>
                                <td className="text-right whitespace-nowrap">
                                    {/* Aquí tu componente TicketModal sigue intacto */}
                                    {/* <TicketModal
                                        triggerText={<EditOutlinedIcon />}
                                        triggerIcon={null}
                                        modalTitle="Editar ticket"
                                        buttonText="Editar"
                                        buttonStyle="text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-200"
                                    /> */}
                                </td>
                                {/*<td className="text-right whitespace-nowrap">
                                    <button
                                        className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-200 rounded-lg"
                                        onClick={() => handleDeleteItem(idx)} // Elimina el ticket
                                    >
                                        <DeleteOutlineOutlinedIcon />
                                    </button>
                                </td>*/}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal de la foto (visible cuando photoModalOpen es true) */}
            {photoModalOpen && selectedPhoto && (
                <PhotoModal
                    photoUrl={selectedPhoto} // Le pasamos la URL de la imagen seleccionada
                    open={photoModalOpen}
                    onClose={handleClosePhotoModal}
                />
            )}
        </div>
    );
};
