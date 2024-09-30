import { useEffect } from 'react';
import '../App.css';
import FeatureSection from '../components/landingComponents/FeatureSection.jsx';
import Footer from  '../components/landingComponents/Footer';
import HeroLanding from  '../components/landingComponents/HeroLanding.jsx';
import TeamSection from  '../components/landingComponents/TeamSection.jsx';

function LandingPage() {
    useEffect(() => {
        document.title = "Ticketify";
    }, []);

    return (
    <>
        <HeroLanding />
        <div id="features">
            <FeatureSection />
        </div>
        <div id="team">
            <TeamSection />
        </div>
        <Footer />
    </>
    );
}

export default LandingPage;
