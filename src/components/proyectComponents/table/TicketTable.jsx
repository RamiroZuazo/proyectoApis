import { useState } from "react";
import TicketModal from "../modal/TicketModal";
import PhotoModal from "../modal/PhotoModal"; 

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
const image = "/images/muestra-ticket-realista_23-2147938550.avif";
export default () => {
    const [tableItems, setTableItems] = useState([
        {
            name: "Ramiro Zuazo",
            desc: "Compra en verduleria",
            date: "08/09/24",
            amount: "$5680",
            photo: image,
        },
        {
            name: "Ramiro Zuazo",
            desc: "Compra en verduleria",
            date: "08/09/24",
            amount: "$5670",
            photo: image,
        },{
            name: "Ramiro Zuazo",
            desc: "Compra en verduleria",
            date: "08/09/24",
            amount: "$5660",
            photo: image,
        },
        {
            name: "Ramiro Zuazo",
            desc: "Compra en verduleria",
            date: "08/09/24",
            amount: "$5650",
            photo: image,
        },
        {
            name: "Ramiro Zuazo",
            desc: "Compra en verduleria",
            date: "08/09/24",
            amount: "$5640",
            photo: image,
        },
    ]);

    const [photoModalOpen, setPhotoModalOpen] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(null);

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
                                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.desc}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.amount}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {item.photo && (
                                        <PhotoModal
                                            photoUrl={item.photo}
                                            open={photoModalOpen}
                                            onClose={handleClosePhotoModal}
                                        />
                                    )}
                                </td>
                                <td className="text-right whitespace-nowrap">
                                    <TicketModal
                                        triggerText={<EditOutlinedIcon />}
                                        triggerIcon={null}
                                        modalTitle="Editar ticket"
                                        buttonText="Editar"
                                        buttonStyle="text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-200"
                                        ticket={item}
                                    />
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