import { useEffect } from 'react';
import '../App.css';
import SignInComp from '../components/auth/SignIn';


function SignIn() {
    useEffect(() => {
        document.title = "Iniciar sesion - Ticketify";
    }, []);
    return (
    <>
        <SignInComp />

    </>
    );
}

export default SignIn;
