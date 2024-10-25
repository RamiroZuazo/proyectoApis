import { useEffect } from 'react';
import '../App.css';
import ProfileComponent from '../components/profileComponent/Profile.jsx';

function Profile () {
    useEffect(() => {
        document.title = "Perfil - Ticketify";
    }, []);

    return (
        <>
            <ProfileComponent />
        </>
    );
}

export default Profile ;
