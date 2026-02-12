import React from 'react';
import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import SocialProof from '../components/landing/SocialProof';
import ProblemStatement from '../components/landing/ProblemStatement';
import Features from '../components/landing/Features';
import Workflow from '../components/landing/Workflow';
import VisualizationShowcase from '../components/landing/VisualizationShowcase';
import Testimonials from '../components/landing/Testimonials';
import Pricing from '../components/landing/Pricing';
import CTA from '../components/landing/CTA';
import Footer from '../components/landing/Footer';

const LandingPage = () => {
    return (
        <div className="bg-bg-primary min-h-screen text-text-primary font-sans selection:bg-primary-purple/20 selection:text-primary-purple overflow-x-hidden">
            <Navbar />
            <main>
                <Hero />
                <SocialProof />
                <ProblemStatement />
                <Features />
                <Workflow />
                <VisualizationShowcase />
                <Testimonials />
                <Pricing />
                <CTA />
            </main>
            <Footer />
        </div>
    );
};

export default LandingPage;
