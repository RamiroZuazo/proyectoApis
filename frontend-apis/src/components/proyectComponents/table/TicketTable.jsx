import { useState, useEffect } from "react";
import TicketModal from "../modal/TicketModal";
import PhotoModal from "../modal/PhotoModal";
import { getTicketsByProject } from "../../../api/api.tickets"; 
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useParams } from 'react-router-dom';
const image = "/images/muestra-ticket-realista_23-2147938550.avif"; 
 


export default ({ proyectoId }) => {
    const [tableItems, setTableItems] = useState([]);
    const [photoModalOpen, setPhotoModalOpen] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const { proyecto_id } = useParams(); 
    // Función para cerrar el modal de la foto
    const handleClosePhotoModal = () => {
        setPhotoModalOpen(false);
        setSelectedPhoto(null);
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
                                    {item.imagen && (
                                        <PhotoModal
                                            photoUrl={item.imagen} // Asume que cada ticket tiene un campo 'imagen'
                                            open={photoModalOpen}
                                            onClose={handleClosePhotoModal}
                                        />
                                    )}
                                </td>
                                <td className="text-right whitespace-nowrap">
                                {/*
                                <TicketModal
                                    triggerText={<EditOutlinedIcon />}
                                    triggerIcon={null}
                                    modalTitle="Editar ticket"
                                    buttonText="Editar"
                                    buttonStyle="text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-200"
                                    ticket={item} 
                                    proyecto_id={proyecto_id}  // Asegúrate de pasar el proyecto_id aquí
                                />
                                */}                               
                                </td>
                                <td className="text-right whitespace-nowrap">
                                    <button
                                        className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-200 rounded-lg"
                                        onClick={() => handleDeleteItem(idx)} // Elimina el ticket
                                    >
                                        <DeleteOutlineOutlinedIcon />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
