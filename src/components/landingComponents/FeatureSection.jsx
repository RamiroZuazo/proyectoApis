import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SafetyDividerIcon from '@mui/icons-material/SafetyDivider';
import DataSaverOffIcon from '@mui/icons-material/DataSaverOff';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
export default () => {

    const features = [
        {
            icon: <PersonAddIcon />,
            title: "Regístrate",
            desc: "Crea tu cuenta en pocos pasos y accede a una plataforma segura."
        },
        {
            icon:
            <DriveFileRenameOutlineIcon />,
            title: "Entorno colaborativo",
            desc: "Define un nombre y añade a tus compañeros."
        },
        {
            icon:
            <CloudUploadIcon />,
            title: "Carga tus gastos",
            desc: "Toma una foto del ticket o ingresa los datos manualmente."
        },
        {
            icon:
            <SafetyDividerIcon />,
            title: "Reparte tus gastos",
            desc: "Elige si los gastos se dividen equitativamente o por porcentajes personalizados."
        },
        {
            icon:
            <DoneOutlineIcon />,
            title: "¡Listo!",
            desc: "Ticketify dividirá los gastos automaticamente."
        },
        {
            icon:
            <DataSaverOffIcon />,
            title: "Visualiza los gastos",
            desc: "Observa facilmente lo que cada persona debe pagar o recibir, con un desglose detallado."
        },
        
        
    ]

    return (
        <section className="py-14">
            <div className="max-w-screen-xl mx-auto px-4 text-center text-gray-600 md:px-8">
                <div className="max-w-2xl mx-auto">
                    <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                        ¿Cómo funciona Ticketify?
                    </h3>
                    <p className="mt-3">
                    Descubre cómo Ticketify simplifica la gestión de gastos compartidos con unos pocos clics. A continuación, te mostramos cómo funciona.
                    </p>
                </div>
                <div className="mt-12">
                    <ul className="grid gap-y-8 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
                        {
                            features.map((item, idx) => (
                                <li key={idx} className="space-y-3">
                                    <div className="w-12 h-12 mx-auto bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center">
                                        {item.icon}
                                    </div>
                                    <h4 className="text-lg text-gray-800 font-semibold">
                                        {item.title}
                                    </h4>
                                    <p>
                                        {item.desc}
                                    </p>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </section>
    )
}