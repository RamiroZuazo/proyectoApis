import TicketTable from "../table/TicketTable";
import SectionHeader from "../sectionHeader/SectionHeader";
// HistorialReportesTab.js
const HistorialReportesTab = () => {
    return (
        <>  
            <SectionHeader 
                title="Historial"
                description="Consulta el registro detallado de todos los tickets cargados y los gastos asignados para llevar un control eficiente de tus finanzas."
                showButton={false}
            />
            <TicketTable/>
        </>
    );
};

export default HistorialReportesTab;