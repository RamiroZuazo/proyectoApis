import * as Dialog from "@radix-ui/react-dialog";
import FileUpload from "../card/FileUpload";
import AmountInput from "../inputs/AmountInput";
import DescriptionInput from "../inputs/DescriptionInput";
import DateInput from "../inputs/DateInput";
import { useState, useEffect } from "react";
import { getMembersByProjectId } from "../../../api/api.projects";
import { createTicket } from "../../../api/api.tickets";
import { getLoggedUser } from "../../../api/api.users";
import { createGasto } from "../../../api/api.gastos";
import dayjs from 'dayjs'; // Importa dayjs para formatear la fecha

const TicketModal = ({ triggerText, triggerIcon, modalTitle, buttonText, buttonStyle, proyecto_id }) => {
    const [members, setMembers] = useState([]);
    const [divisionType, setDivisionType] = useState("equal");
    const [percentages, setPercentages] = useState({});
    const [loading, setLoading] = useState(false);
    const [ticketData, setTicketData] = useState({
        fecha: "",
        monto: "",
        descripcion: "",
        proyecto_id: proyecto_id,
        usuario_responsable_id: null,
    });

    useEffect(() => {
        const initializeUser = async () => {
            try {
                const user = await getLoggedUser(); // Obtener el usuario logueado
                if (user && user.user && user.user.id) { // Verifica que el ID esté disponible
                    setTicketData((prev) => ({
                        ...prev,
                        usuario_responsable_id: user.user.id, // Asignar el ID del usuario logueado
                    }));
                } else {
                    console.warn("No se pudo obtener el ID del usuario.");
                }
            } catch (error) {
                console.error("Error al obtener el usuario logueado:", error);
            }
        };
    
        const fetchMembers = async () => {
            if (!proyecto_id) {
                console.error("No se recibió un ID de proyecto válido.");
                return;
            }
            try {
                const data = await getMembersByProjectId(proyecto_id);
                if (data && data.ok && data.proyecto && data.proyecto.Users) {

                    // Actualiza el estado de los miembros con la lista filtrada
                    setMembers(data.proyecto.Users);
                    divideEqually(data.proyecto.Users);
                } else {
                    console.warn("No se encontraron miembros para el proyecto.");
                }
            } catch (error) {
                console.error("Error al obtener los miembros:", error);
            }
        };
    
        initializeUser();
        fetchMembers();
    }, [proyecto_id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTicketData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita el comportamiento predeterminado de recargar la página
        
        setLoading(true);
        
        // Convertir la fecha al formato correcto (YYYY-MM-DD) usando dayjs
        const formattedFecha = dayjs(ticketData.fecha, 'DD/MM/YYYY').format('YYYY-MM-DD');
        
        // Crear un nuevo objeto de datos con la fecha formateada
        const ticketDataToSend = {
            ...ticketData,
            fecha: formattedFecha, // Asignar la fecha formateada
        };
        
        try {
            const newTicket = await createTicket(ticketDataToSend); // Crear el ticket
            // Obtener el usuario logueado
            const loggedUser = await getLoggedUser();
            const loggedUserId = loggedUser.user.id; // Asumiendo que el ID del usuario logueado está aquí
            
            // Filtrar los miembros excluyendo al logueado
            const membersToUse = members.filter(member => member.id !== loggedUserId);
    
            // Ahora, para cada miembro excepto el logueado, crear un gasto
            const gastoPromises = membersToUse.map((member) => {
                // Obtener el porcentaje de deuda para cada miembro
                const porcentaje = percentages[member.nombre] || 0; 
                
                // Asegurarnos de que el monto sea un número
                const montoNumerico = parseFloat(ticketData.monto);
                if (isNaN(montoNumerico)) {
                    throw new Error("El monto es inválido.");
                }
        
                // Calcula la deuda basada en el porcentaje
                const deuda = (montoNumerico * porcentaje) / 100;
        
                const gastoData = {
                    usuarioId: member.id, 
                    ticketId: newTicket.id,
                    monto: deuda,
                };
        
        
                // Llama a la API para crear el gasto
                return createGasto(gastoData);
            });
        
            // Esperar que se creen todos los gastos
            await Promise.all(gastoPromises);
        
        } catch (error) {
            console.error("Error al crear el ticket o las deudas:", error);
        } finally {
            setLoading(false);
        }
    };
    
    const divideEqually = (membersList = members) => {
        const totalMembers = membersList.length;
        if (totalMembers === 0) return;
    
        // Calcula la cuota base para cada miembro
        const baseShare = 100 / totalMembers;
    
        // Crea un objeto con los porcentajes iniciales
        const updatedPercentages = membersList.reduce((acc, member) => {
            acc[member.nombre] = parseFloat(baseShare.toFixed(10)); // Asigna el porcentaje base
            return acc;
        }, {});
    
        // Calcula la suma de los porcentajes asignados
        const totalAssigned = Object.values(updatedPercentages).reduce((acc, value) => acc + value, 0);
    
        // Ajusta el porcentaje del último miembro para que la suma total sea 100
        const difference = 100 - totalAssigned;
        const lastMember = membersList[totalMembers - 1].nombre;
        updatedPercentages[lastMember] += difference;
    
        // Actualiza el estado con los nuevos porcentajes
        setPercentages(updatedPercentages);
        setDivisionType("equal");
    };
    

    const handlePercentageChange = (name, value) => {
        const updatedPercentages = { ...percentages, [name]: parseFloat(value) || 0 };
        setPercentages(updatedPercentages);
    };

    const totalPercentage = Object.values(percentages).reduce(
        (acc, value) => acc + parseFloat(value || 0),
        0
    );

    return (
        <Dialog.Root>
            <Dialog.Trigger className={`inline-flex items-center justify-center gap-1 py-2 px-3 mt-2 font-medium text-sm text-center rounded-lg sm:mt-0 ${buttonStyle}`}>
                {triggerIcon}
                {triggerText}
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black opacity-40 z-50" />
                <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg mx-auto px-4 z-50 bg-white rounded-md shadow-lg overflow-y-auto max-h-[80vh]">
                    <form onSubmit={handleSubmit}>
                        <div className="bg-white rounded-md shadow-lg">
                            <div className="flex items-center justify-between p-4 border-b">
                                <Dialog.Title className="text-lg font-medium text-gray-800">{modalTitle}</Dialog.Title>
                                <Dialog.Close className="p-2 text-gray-400 rounded-md hover:bg-gray-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414 1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </Dialog.Close>
                            </div>
                            <div className="space-y-4 p-4">
                                <DateInput
                                    name="fecha"
                                    value={ticketData.fecha}
                                    onChange={handleChange}
                                    required
                                />
                                <AmountInput
                                    name="monto"
                                    value={ticketData.monto}
                                    onChange={handleChange}
                                    required
                                />
                                <DescriptionInput
                                    name="descripcion"
                                    value={ticketData.descripcion}
                                    onChange={handleChange}
                                    required
                                />
                                <FileUpload />
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-700 mb-2">División del gasto</h3>
                                {loading ? (
                                    <p className="text-gray-500">Cargando miembros...</p>
                                ) : (
                                    <>
                                        <div className="flex gap-3 mb-6">
                                            <button
                                                type="button" // Evitar que sea un submit
                                                onClick={() => divideEqually(members)}
                                                className={`px-4 py-2 font-semibold rounded-lg transition-colors ${divisionType === "equal" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                                            >
                                                Dividir equitativamente
                                            </button>
                                            <button
                                                type="button" // Evitar que sea un submit
                                                onClick={() => setDivisionType("custom")}
                                                className={`px-4 py-2 font-semibold rounded-lg transition-colors ${divisionType === "custom" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                                            >
                                                Personalizar porcentaje
                                            </button>
                                        </div>
                                        <div className="space-y-4 mb-6">
                                            {members.length === 0 ? (
                                                <p className="text-gray-500">No se encontraron miembros...</p>
                                            ) : (
                                                members.map((member) => (
                                                    <div key={member.id} className="flex items-center justify-between">

                                                        <span className="text-gray-800">{member.nombre}</span>
                                                        <div className="relative flex items-center">
                                                            <input
                                                                type="number"
                                                                value={parseFloat(percentages[member.nombre] || 0).toFixed(2)}
                                                                onChange={(e) => handlePercentageChange(member.nombre, e.target.value)}
                                                                disabled={divisionType === "equal"}
                                                                className="w-20 px-3 py-2 border rounded-lg text-right text-gray-700 focus:outline-none focus:ring focus:ring-indigo-300"
                                                            />
                                                            <span className="ml-2 text-gray-500">%</span>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-gray-700">Total dividido:</span>
                                            <span
                                                className={`font-semibold ${
                                                    totalPercentage === 100 ? "text-green-600" : "text-red-600"
                                                }`}
                                            >
                                                {totalPercentage.toFixed(2)}%
                                            </span>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="flex items-center gap-3 p-4 border-t">
                                <button
                                    type="submit"
                                    className={`px-6 py-2 rounded-md text-white font-semibold ${
                                        loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-500"
                                    }`}
                                    disabled={loading}
                                >
                                    {loading ? "Creando..." : buttonText}
                                </button>
                                <Dialog.Close asChild>
                                    <button
                                        className="px-6 py-2 text-gray-800 border rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
                                        aria-label="Close"
                                    >
                                        Cancelar
                                    </button>
                                </Dialog.Close>
                            </div>
                        </div>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default TicketModal;
