import SectionHeader from "../sectionHeader/SectionHeader";
import DebtsTableTab from "../table/DebtsTableTab";
import TicketModal from "../modal/TicketModal";
import { useEffect } from "react";
const VistaGeneralTab = ({ proyecto_id }) => {
    console.log("VistaGeneralTab se está montando");
    console.log("ID del proyecto recibido en VistaGeneralTab:", proyecto_id);
    useEffect(()=>{console.log("VistaGeneralTab se está montando");},[])
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
            <DebtsTableTab />
        </>
    );
};

export default VistaGeneralTab;
