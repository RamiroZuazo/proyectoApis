import { useEffect } from 'react';
import '../App.css';
import ProyectModal from '../components/menuComponents/ProyectsMenu.jsx';

function Menu() {
    useEffect(() => {
        document.title = "Menu - Ticketify";
    }, []);

    return (
        <>
            <ProyectModal />
        </>
    );
}

export default Menu;
