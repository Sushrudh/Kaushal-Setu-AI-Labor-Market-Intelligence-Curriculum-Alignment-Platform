import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { Menu, X, ArrowRight, UserCircle, LogOut } from 'lucide-react';

interface Props {
  currentView: string;
  onNavigate: (view: string) => void;
}

export const Navbar: React.FC<Props> = ({ currentView, onNavigate }) => {
  const { currentUser, logout, openAuthModal } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getPortalLabel = (role: UserRole) => {
    switch (role) {
      case 'dsdc':
        return 'DSDC Committee';
      case 'employer':
        return 'Employer Portal';
      case 'institution':
        return 'Institution Portal';
      case 'student':
        return 'Trainee Portal';
    }
  };

  const navLinks = [
    { id: 'home', label: 'Platform' },
    { id: 'district-analytics', label: 'District Analytics' },
    { id: 'nsqf-explorer', label: 'NSQF Taxonomy' },
    { id: 'architecture', label: 'Architecture & PRD' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'about', label: 'About & Framework' },
  ];

  const handlePortalClick = () => {
    if (currentUser) {
      onNavigate(`portal-${currentUser.role}`);
    } else {
      openAuthModal();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F8F5F0]/95 backdrop-blur-md border-b border-[#E7E1D9] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Zone 1: Single Brand Wordmark */}
          <div className="flex items-center">
            <button
              onClick={() => onNavigate('home')}
              className="group text-left text-2xl font-serif text-[#191817] hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <span className="w-3 h-3 rounded-full bg-[#4F8279] inline-block"></span>
              <span className="font-semibold tracking-tight">Kaushal Setu</span>
            </button>
          </div>

          {/* Zone 2: 4-6 Clean Text Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`text-sm transition-colors relative py-1 ${
                    isActive
                      ? 'text-[#191817] font-semibold'
                      : 'text-[#81766D] hover:text-[#191817]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#191817]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1-2 Primary Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePortalClick}
                  className="px-4 py-2 text-xs font-semibold text-[#191817] bg-[#F5ED78] hover:bg-[#eae162] rounded-md transition-colors flex items-center gap-2 whitespace-nowrap shadow-xs"
                >
                  <span>{getPortalLabel(currentUser.role)}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={logout}
                  title="Sign out"
                  className="p-2 text-[#81766D] hover:text-[#191817] hover:bg-[#F3EEE6] rounded-md transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => openAuthModal('student')}
                  className="text-sm font-medium text-[#191817] hover:text-[#4F8279] transition-colors px-2 py-1"
                >
                  Sign In
                </button>
                <button
                  onClick={() => openAuthModal('dsdc')}
                  className="px-4 py-2 text-xs font-semibold text-[#191817] bg-[#F5ED78] hover:bg-[#eae162] rounded-md transition-colors whitespace-nowrap shadow-xs flex items-center gap-1.5"
                >
                  <span>Stakeholder Access</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile hamburger button */}
          <div className="flex sm:hidden items-center gap-2">
            {currentUser && (
              <button
                onClick={handlePortalClick}
                className="px-3 py-1.5 text-xs font-semibold text-[#191817] bg-[#F5ED78] rounded-md"
              >
                Portal
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#191817] hover:bg-[#F3EEE6] rounded-md"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-[#E7E1D9] bg-[#F8F5F0] px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onNavigate(link.id);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left py-2 px-3 text-sm rounded-md ${
                currentView === link.id
                  ? 'bg-[#F3EEE6] text-[#191817] font-semibold'
                  : 'text-[#81766D] hover:bg-[#F3EEE6] hover:text-[#191817]'
              }`}
            >
              {link.label}
            </button>
          ))}

          <div className="pt-3 border-t border-[#E7E1D9] flex flex-col gap-2">
            {currentUser ? (
              <>
                <button
                  onClick={() => {
                    handlePortalClick();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 px-3 text-sm font-semibold text-[#191817] bg-[#F5ED78] rounded-md text-center"
                >
                  Enter {getPortalLabel(currentUser.role)}
                </button>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 px-3 text-sm text-[#81766D] hover:text-[#191817] text-center"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    openAuthModal('student');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 px-3 text-sm font-medium text-[#191817] border border-[#E7E1D9] rounded-md text-center"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    openAuthModal('dsdc');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 px-3 text-sm font-semibold text-[#191817] bg-[#F5ED78] rounded-md text-center"
                >
                  Stakeholder Access
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
