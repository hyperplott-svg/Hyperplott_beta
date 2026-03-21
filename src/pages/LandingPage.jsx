import React from 'react';
import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import ProblemStatement from '../components/landing/ProblemStatement';
import HowItWorks from '../components/landing/HowItWorks';
import Features from '../components/landing/Features';
import BetaProgram from '../components/landing/BetaProgram';
import CTA from '../components/landing/CTA';
import Footer from '../components/landing/Footer';
import SEO from '../components/common/SEO';

const LandingPage = () => {
    const [showBanner, setShowBanner] = React.useState(true);

    return (
        <div className="bg-bg-primary min-h-screen text-text-primary font-sans selection:bg-emerald-500/20 selection:text-emerald-500 overflow-x-hidden">
            <SEO
                title="Design Better Experiments in Minutes, Not Weeks"
                description="Hyperplott is an AI-powered Design of Experiments (DoE) platform that helps researchers, scientists, and students optimize their experimental designs with statistical precision."
                keywords="Design of Experiments, DoE, AI Science, Scientific Optimization, Research Tools, Statistical Design"
            />
            <Navbar bannerActive={showBanner} />
            <main>
                <Hero showBanner={showBanner} setShowBanner={setShowBanner} />
                <ProblemStatement />
                <HowItWorks />
                <Features />
                <BetaProgram />
                <CTA />
            </main>
            <Footer />
        </div>
    );
};

export default LandingPage;
