import SectionHeader from "../sectionHeader/SectionHeader";
import DebtsTableTab from "../table/DebtsTableTab";
import TicketModal from "../modal/TicketModal";

const VistaGeneralTab = ({ proyecto_id }) => {
    return (
        <>
            <SectionHeader
                title="Panel general"
                description="Carga todos tus tickets de compra y asigna los gastos."
                showButton={true}
                buttonText="Agregar nuevo ticket"
                ModalComponent={(props) => (
                    <TicketModal {...props} proyecto_id={proyecto_id} />
                )}
            />
            <DebtsTableTab proyecto_id={proyecto_id} /> {/* Aquí pasas el proyecto_id */}
        </>
    );
};

export default VistaGeneralTab;
