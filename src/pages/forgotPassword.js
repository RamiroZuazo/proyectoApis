import { useEffect } from 'react';
import '../App.css';
import ForgotPassword from '../components/auth/ForgotPassword';


function Forgotpassword() {
    useEffect(() => {
        document.title = "Recuperar contraseña - Ticketify";
    }, []);
    return (
    <>
        <ForgotPassword />

    </>
    );
}

export default Forgotpassword;
