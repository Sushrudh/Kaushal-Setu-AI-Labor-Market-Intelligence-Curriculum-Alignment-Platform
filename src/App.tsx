/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DemoPersonaBanner } from './components/common/DemoPersonaBanner';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { AuthModal } from './pages/public/AuthModal';

import { HomePage } from './pages/public/HomePage';
import { DistrictAnalyticsPage } from './pages/public/DistrictAnalyticsPage';
import { NsqfExplorerPage } from './pages/public/NsqfExplorerPage';
import { AboutPage } from './pages/public/AboutPage';
import { ArchitecturePage } from './pages/public/ArchitecturePage';
import { HowItWorksPage } from './pages/public/HowItWorksPage';
import { ContactPage } from './pages/public/ContactPage';
import { LegalPages } from './pages/public/LegalPages';

import { DsdcDashboard } from './pages/portals/DsdcDashboard';
import { EmployerDashboard } from './pages/portals/EmployerDashboard';
import { InstitutionDashboard } from './pages/portals/InstitutionDashboard';
import { StudentDashboard } from './pages/portals/StudentDashboard';
import { RoleGuard } from './components/common/RoleGuard';
import { UserRole } from './types';

const MainAppContent: React.FC = () => {
  const { currentUser, openAuthModal } = useAuth();
  const [currentView, setCurrentView] = useState<string>('home');

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPortal = (role: UserRole) => {
    if (!currentUser) {
      openAuthModal(role);
    } else {
      setCurrentView(`portal-${role}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavigateToPortalFromBanner = (role: UserRole) => {
    setCurrentView(`portal-${role}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F8F3] text-[#191817] selection:bg-[#E2EE58] selection:text-[#191817]">
      {/* 1. Evaluator Role-Based Switcher Banner */}
      <DemoPersonaBanner
        onNavigateToPortal={handleNavigateToPortalFromBanner}
        onNavigateHome={() => handleNavigate('home')}
      />

      {/* 2. Top Bar Navigation (3-Zone Contract) */}
      <Navbar currentView={currentView} onNavigate={handleNavigate} />

      {/* 3. Main Viewport Content */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomePage onNavigate={handleNavigate} onOpenPortal={handleOpenPortal} />
        )}
        {currentView === 'district-analytics' && <DistrictAnalyticsPage />}
        {currentView === 'nsqf-explorer' && <NsqfExplorerPage />}
        {currentView === 'architecture' && <ArchitecturePage />}
        {currentView === 'about' && <AboutPage />}
        {currentView === 'how-it-works' && <HowItWorksPage onOpenPortal={handleOpenPortal} />}
        {currentView === 'contact' && <ContactPage />}
        {currentView === 'privacy' && <LegalPages initialTab="privacy" />}
        {currentView === 'terms' && <LegalPages initialTab="terms" />}
        {currentView === 'methodology' && <LegalPages initialTab="methodology" />}

        {/* Role-Based Portals Protected by Strict RBAC Authorization */}
        {currentView === 'portal-dsdc' && (
          <RoleGuard
            requiredRole="dsdc"
            onNavigateHome={() => handleNavigate('home')}
            onNavigateToOwnPortal={(r) => handleNavigate(`portal-${r}`)}
          >
            <DsdcDashboard />
          </RoleGuard>
        )}
        {currentView === 'portal-employer' && (
          <RoleGuard
            requiredRole="employer"
            onNavigateHome={() => handleNavigate('home')}
            onNavigateToOwnPortal={(r) => handleNavigate(`portal-${r}`)}
          >
            <EmployerDashboard />
          </RoleGuard>
        )}
        {currentView === 'portal-institution' && (
          <RoleGuard
            requiredRole="institution"
            onNavigateHome={() => handleNavigate('home')}
            onNavigateToOwnPortal={(r) => handleNavigate(`portal-${r}`)}
          >
            <InstitutionDashboard />
          </RoleGuard>
        )}
        {currentView === 'portal-student' && (
          <RoleGuard
            requiredRole="student"
            onNavigateHome={() => handleNavigate('home')}
            onNavigateToOwnPortal={(r) => handleNavigate(`portal-${r}`)}
          >
            <StudentDashboard />
          </RoleGuard>
        )}
      </main>

      {/* 4. Footer */}
      <Footer onNavigate={handleNavigate} onOpenPortal={handleOpenPortal} />

      {/* 5. RBAC Auth Modal */}
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
}
