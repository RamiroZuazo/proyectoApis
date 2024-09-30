import { useEffect } from 'react';
import '../App.css';
import Proyect from '../components/proyectComponents/tabItems/MiembrosTab';
import Tab from '../components/proyectComponents/tab/Tab';

function ProyectMenu() {
    useEffect(() => {
        document.title = "Proyecto - Ticketify";
    }, []);

    return (
        <>      
            <Tab/>
        </>
    );
}

export default ProyectMenu;
