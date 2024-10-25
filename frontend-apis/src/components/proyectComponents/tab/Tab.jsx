import * as Tabs from "@radix-ui/react-tabs";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';

// Import de componentes externos
import MiembrosTab from '../tabItems/MiembrosTab';
import VistaGeneralTab from '../tabItems/VistaGeneralTab';
import HistorialReportesTab from '../tabItems/HistorialReportesTab';

export default () => {
    const tabItems = [
        {
            icon: <AccountCircleIcon />,
            name: "Miembros",
            component: <MiembrosTab />,  // Asignar el componente
        },
        {
            icon: <ViewCompactIcon />,
            name: "Vista general",
            component: <VistaGeneralTab />,  // Asignar el componente
        },
        {
            icon: <AssessmentIcon />,
            name: "Historial y reportes",
            component: <HistorialReportesTab />,  // Asignar el componente
        },
    ];

    return (
        <Tabs.Root
            className="max-w-screen-xl mx-auto px-4 md:px-8"
            defaultValue="Vista general"
        >
            <Tabs.List
                className="w-full border-b flex items-center gap-x-3 overflow-x-auto text-sm"
                aria-label="Manage your account"
            >
                {tabItems.map((item, idx) => (
                    <Tabs.Trigger
                        key={idx}
                        className="group outline-none py-1.5 border-b-2 border-white text-gray-500 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600"
                        value={item.name}
                    >
                        <div className="flex items-center gap-x-2 py-1.5 px-3 rounded-lg duration-150 group-hover:text-indigo-600 group-hover:bg-gray-50 group-active:bg-gray-100 font-medium">
                            {item.icon}
                            {item.name}
                        </div>
                    </Tabs.Trigger>
                ))}
            </Tabs.List>

            {tabItems.map((item, idx) => (
                <Tabs.Content key={idx} className="py-6" value={item.name}>
                    {item.component} {/* Mostrar el componente */}
                </Tabs.Content>
            ))}
        </Tabs.Root>
    );
};
