import { useEffect } from 'react';
import '../App.css';
import SignUpComp from '../components/auth/SignUp';


function SignUp() {
    useEffect(() => {
        document.title = "Registrarse - Ticketify";
    }, []);
    return (
    <>
        <SignUpComp />

    </>
    );
}

export default SignUp;
