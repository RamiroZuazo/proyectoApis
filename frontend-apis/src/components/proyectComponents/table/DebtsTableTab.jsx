import { useState, useEffect } from "react";
import { getMembersByProjectId } from "../../../api/api.projects";
import { getLoggedUser } from "../../../api/api.users";  // Para obtener el usuario logueado

export default ({ proyecto_id }) => {
    const [tableItems, setTableItems] = useState([
        {
            label: "A pagar",
            title: "Miembros a pagar",
            items: [],
        },
        {
            label: "A cobrar",
            title: "Miembros a cobrar",
            items: [],
        },
    ]);
    const [selectedItem, setSelectedItem] = useState(0);
    const [loggedUserId, setLoggedUserId] = useState(null); // Estado para almacenar el ID del usuario logueado

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                // Obtener el usuario logueado
                const user = await getLoggedUser();
                setLoggedUserId(user.user.id);  // Guardamos el ID del usuario logueado
                
                // Obtener los miembros del proyecto
                const data = await getMembersByProjectId(proyecto_id);

                if (data?.proyecto?.Users) {
                    const allMembers = data.proyecto.Users.map((miembro) => ({
                        nombre: miembro.nombre,
                        Monto: "$0",  // Se puede ajustar si es necesario
                        Estado: "Sin deuda",  // Se puede ajustar si es necesario
                    }));

                    // Filtramos el miembro logueado para que no aparezca
                    const filteredMembers = allMembers.filter(member => member.id !== loggedUserId);

                    // Actualizamos las solapas con los miembros filtrados
                    setTableItems([
                        { label: "A pagar", title: "Miembros a pagar", items: filteredMembers },
                        { label: "A cobrar", title: "Miembros a cobrar", items: filteredMembers },
                    ]);
                } else {
                    console.error("No se encontraron miembros en la respuesta.");
                }
            } catch (err) {
                console.error("Error al cargar los miembros:", err);
            }
        };

        fetchMembers();
    }, [proyecto_id, loggedUserId]); // Dependencia de `loggedUserId`

    return (
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
            <div className="text-sm mt-6 overflow-x-auto">
                <ul role="tablist" className="w-full border-b flex items-center gap-x-3 overflow-x-auto">
                    {tableItems.map((item, idx) => (
                        <li
                            key={idx}
                            className={`py-2 border-b-2 ${selectedItem === idx ? "border-indigo-600 text-indigo-600" : "border-white text-gray-500"}`}
                        >
                            <button
                                role="tab"
                                aria-selected={selectedItem === idx}
                                onClick={() => setSelectedItem(idx)}
                                className="py-2.5 px-4 rounded-lg duration-150 hover:text-indigo-600 hover:bg-gray-50 active:bg-gray-100 font-medium"
                            >
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
                <table className="w-full table-auto text-left">
                    <thead className="text-gray-600 font-medium border-b">
                        <tr>
                            <th className="w-9/12 py-4 pr-6">{tableItems[selectedItem].title}</th>
                            <th className="py-4 pr-6">Monto</th>
                            <th className="py-4 pr-6 px-4">Estado</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                        {tableItems[selectedItem].items.map((item, idx) => (
                            <tr key={idx}>
                                <td className="pr-6 py-4 whitespace-nowrap">{item.nombre}</td>
                                <td className="pr-6 py-4 whitespace-nowrap text-indigo-600">{item.Monto}</td>
                                <td className="pr-6 py-4 whitespace-nowrap">
                                    <span className={`py-2 px-3 rounded-full font-semibold text-xs text-green-600 bg-green-50`}>{item.Estado}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
