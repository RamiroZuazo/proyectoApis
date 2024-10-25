import SectionHeader from "../sectionHeader/SectionHeader";
import DebtsTableTab from "../table/DebtsTableTab";
import SplitExpenseModal from "../modal/DividerModal"; // Importa el modal de división de gastos
import TicketModal from "../modal/TicketModal";
import { useState } from 'react';
// VistaGeneralTab.js
const VistaGeneralTab = () => {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <SectionHeader
                title="Panel general"
                description="Carga todos tus tickets de compra y asigna los gastos."
                showButton={true}
                buttonText="Agregar nuevo ticket"
                ModalComponent={TicketModal}  // El modal que quieres usar
            />
            {/* Botón para abrir el modal */}
            <div className="mt-4 flex px-10 mt-10 justify-left">
                <button
                    className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500"
                    onClick={() => setShowModal(true)} // Muestra el modal al hacer clic
                >
                    Dividir gastos
                </button>
            </div>

            <DebtsTableTab />

            {/* Modal de división de gastos */}
            <SplitExpenseModal
                showModal={showModal}
                setShowModal={setShowModal}
                members={[
                    { name: "John lorin" },
                    { name: "Chris bondi" },
                    { name: "yasmine" },
                    { name: "Joseph" }
                ]} // Pasa los miembros del proyecto
            />
            
        </>
    );
};

export default VistaGeneralTab;
