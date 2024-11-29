import { useState, useEffect } from "react";
import { getMembersByProjectId } from "../../../api/api.projects";
import { getLoggedUser } from "../../../api/api.users";
import { getGastosPendientes, marcarGastosComoPagado } from "../../../api/api.gastos";

export default ({ proyecto_id }) => {
    const [tableItems, setTableItems] = useState([
        { label: "A pagar", title: "Miembros a pagar", items: [] },
        { label: "A cobrar", title: "Miembros a cobrar", items: [] },
    ]);
    const [selectedItem, setSelectedItem] = useState(0);
    const [loggedUserId, setLoggedUserId] = useState(null);
    const [loading, setLoading] = useState(true);

    // Función para obtener los miembros y sus gastos
    const fetchUserAndMembers = async () => {
        try {
            const user = await getLoggedUser();
            if (!user?.user?.id) {
                console.error("No se pudo obtener el usuario logueado.");
                setLoading(false);
                return;
            }
            
            const loggedUserId = user.user.id;
            setLoggedUserId(loggedUserId);

            const data = await getMembersByProjectId(proyecto_id);
            if (!data?.proyecto?.Users) {
                console.error("No se encontraron miembros en la respuesta.");
                setLoading(false);
                return;
            }

            // Filtrar miembros excluyendo al usuario logueado
            const otherMembers = data.proyecto.Users.filter(miembro => miembro.id !== loggedUserId)
                .map(miembro => ({
                    id: miembro.id,
                    nombre: miembro.nombre,
                    Monto: "$0",
                    Estado: "Sin deuda",
                }));

            // Proceso de obtención de gastos a pagar
            const membersToPay = await Promise.all(
                otherMembers.map(async (member) => {
                    try {
                        const response = await getGastosPendientes(member.id, loggedUserId, proyecto_id);
                        if (response.ok && response.gastos.length > 0) {
                            const totalDeuda = response.gastos.reduce((acc, gasto) => acc + parseFloat(gasto.monto), 0);
                            return {
                                ...member,
                                Monto: `$${totalDeuda.toFixed(2)}`,
                                Estado: "Deuda pendiente"
                            };
                        }
                        return member;
                    } catch (err) {
                        console.error(`Error al obtener los gastos a pagar de ${member.nombre}:`, err);
                        return member;
                    }
                })
            );

            // Proceso de obtención de gastos a cobrar
            const membersToCollect = await Promise.all(
                otherMembers.map(async (member) => {
                    try {
                        const response = await getGastosPendientes(loggedUserId, member.id, proyecto_id);
                        if (response.ok && response.gastos.length > 0) {
                            const totalDeuda = response.gastos.reduce((acc, gasto) => acc + parseFloat(gasto.monto), 0);
                            return {
                                ...member,
                                Monto: `$${totalDeuda.toFixed(2)}`,
                                Estado: "Deuda pendiente"
                            };
                        }
                        return member;
                    } catch (err) {
                        console.error(`Error al obtener los gastos a cobrar de ${member.nombre}:`, err);
                        return member;
                    }
                })
            );

            // Filtrar solo miembros con deudas
            const filteredMembersToPay = membersToPay.filter(member => 
                parseFloat(member.Monto.replace('$', '').replace(',', '')) > 0
            );

            const filteredMembersToCollect = membersToCollect.filter(member => 
                parseFloat(member.Monto.replace('$', '').replace(',', '')) > 0
            );

            setTableItems([
                { label: "A pagar", title: "Miembros a pagar", items: filteredMembersToPay },
                { label: "A cobrar", title: "Miembros a cobrar", items: filteredMembersToCollect },
            ]);

        } catch (err) {
            console.error("Error al cargar los miembros:", err);
        } finally {
            setLoading(false);
        }
    };

    // Llamada a fetchUserAndMembers cuando se carga el componente
    useEffect(() => {
        fetchUserAndMembers();
    }, [proyecto_id]);

    // Función para manejar el clic en el botón "Pagar"
    const handlePagarClick = async (usuarioId) => {
        try {
            const response = await marcarGastosComoPagado(proyecto_id, loggedUserId, usuarioId);
            if (response.ok) {
                // Actualiza la tabla después de marcar el gasto como pagado
                fetchUserAndMembers(); // Re-obtenemos los miembros y sus datos actualizados
            } else {
                console.error("No se pudo pagar la deuda.");
            }
        } catch (error) {
            console.error("Error al intentar pagar la deuda:", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
            <div className="text-sm mt-6 overflow-x-auto">
                {/* Tab Navigation */}
                <ul role="tablist" className="w-full border-b flex items-center gap-x-3 overflow-x-auto">
                    {tableItems.map((item, idx) => (
                        <li
                            key={idx}
                            className={`py-2 border-b-2 ${selectedItem === idx ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-500 hover:border-indigo-600"}`}
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
    
                {/* Data Table */}
                <table className="w-full table-auto text-left mt-4">
                    <thead className="text-gray-600 font-medium border-b ">
                        <tr>
                            <th className="w-9/12 py-4 pr-6 text-left">{tableItems[selectedItem].title}</th>
                            <th className="py-4 pr-6 text-left">Monto</th>
                            <th className="py-4 pr-6 text-left px-4">Estado</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                        {tableItems[selectedItem].items.map((item, idx) => (
                            <tr key={idx} className="hover:bg-gray-50">
                                <td className="pr-6 py-4 whitespace-nowrap">{item.nombre}</td>
                                <td className="pr-6 py-4 whitespace-nowrap text-indigo-600 font-semibold">{item.Monto}</td>
                                <td className="pr-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`py-2 px-3 rounded-full font-semibold text-xs ${item.Estado === "Deuda pendiente" ? "text-red-600 bg-red-50" : "text-green-600 bg-green-50"}`}
                                    >
                                        {item.Estado}
                                    </span>
                                </td>
                                {/* Condición para mostrar el botón Pagar solo en la tabla "A pagar" */}
                                {tableItems[selectedItem].title === "Miembros a pagar" && item.Estado === "Deuda pendiente" && (
                                    <td className="pr-6 py-4 whitespace-nowrap">
                                        <button
                                            className="text-white bg-indigo-600 hover:bg-indigo-500 font-semibold py-2 px-4 rounded"
                                            onClick={() => handlePagarClick(item.id)} // Llamar a la función para pagar
                                        >
                                            Pagar
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
    
};