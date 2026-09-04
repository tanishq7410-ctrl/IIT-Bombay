/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TelemetryStats } from './components/TelemetryStats';
import { TechExplorer } from './components/TechExplorer';
import { Competitions } from './components/Competitions';
import { Speakers } from './components/Speakers';
import { ExperienceShowcase } from './components/ExperienceShowcase';
import { IITBombaySection } from './components/IITBombaySection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { RegistrationModal } from './components/RegistrationModal';

export default function App() {
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [selectedDomainForRegister, setSelectedDomainForRegister] = useState<string | undefined>(undefined);
  const [prefilledEmail, setPrefilledEmail] = useState<string | undefined>(undefined);
  const [activeSection, setActiveSection] = useState('hero');

  // Track active section for navbar highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero-section', 'events', 'competitions', 'exhibitions', 'speakers', 'about'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId === 'hero-section' ? '' : sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenRegister = (domain?: string, email?: string) => {
    setSelectedDomainForRegister(domain);
    setPrefilledEmail(email);
    setRegisterModalOpen(true);
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#06080D] text-slate-100 flex flex-col font-sans selection:bg-cyan-400 selection:text-black">
      {/* Sticky Tactical Navbar */}
      <Navbar
        onOpenRegister={() => handleOpenRegister()}
        activeSection={activeSection}
      />

      {/* Main Experience Flow */}
      <main className="flex-1">
        {/* Cinematic Hero */}
        <Hero
          onOpenRegister={() => handleOpenRegister()}
          onExploreClick={() => handleScrollToSection('events')}
        />

        {/* Telemetry Statistics & Harmonic Waveforms */}
        <TelemetryStats />

        {/* 8 Technology Domains Explorer */}
        <TechExplorer
          onSelectDomainForRegister={(domain) => handleOpenRegister(domain)}
        />

        {/* Competitions: Robowars, AI, Drones, Quantum */}
        <Competitions
          onRegisterCompetition={(compName) => handleOpenRegister(compName)}
        />

        {/* Immersive Experiences: Drone Show, Exhibitions, Tesla Coils */}
        <div id="workshops">
          <ExperienceShowcase
            onRegisterWorkshop={(itemTitle) => handleOpenRegister(itemTitle)}
          />
        </div>

        {/* Keynote Transmissions / Editorial Speakers */}
        <Speakers />

        {/* Institutional Anchor: Built at IIT Bombay */}
        <IITBombaySection />

        {/* Final CTA with Concentric Holographic Core */}
        <FinalCTA
          onOpenRegisterWithEmail={(email) => handleOpenRegister(undefined, email)}
          onExploreEvents={() => handleScrollToSection('competitions')}
        />
      </main>

      {/* Telemetry Footer */}
      <Footer />

      {/* Interactive Registration & Cyber-Pass Modal */}
      <RegistrationModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        prefilledDomain={selectedDomainForRegister}
        prefilledEmail={prefilledEmail}
      />
    </div>
  );
}

