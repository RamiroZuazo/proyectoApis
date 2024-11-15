import SectionHeader from "../sectionHeader/SectionHeader";
import DebtsTableTab from "../table/DebtsTableTab";
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
            <DebtsTableTab />
        </>
    );
};

export default VistaGeneralTab;
