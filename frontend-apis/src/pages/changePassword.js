import { useEffect } from 'react';
import '../App.css';
import ChangePassword from '../components/auth/ChangePassword';


function Forgotpassword() {
    useEffect(() => {
        document.title = "Recuperar contraseña - Ticketify";
    }, []);
    return (
    <>
        <ChangePassword />

    </>
    );
}

export default Forgotpassword;
