import { useEffect } from "react";
import "../App.css";
import Tab from "../components/proyectComponents/tab/Tab";
import { useParams } from "react-router-dom"; 

function ProyectMenu() {
    const { proyecto_id } = useParams(); 

    useEffect(() => {
        document.title = "Proyecto - Ticketify";   }, [proyecto_id]);

    return (
        <>
            <Tab proyecto_id={proyecto_id} />
        </>
    );
}

export default ProyectMenu;
