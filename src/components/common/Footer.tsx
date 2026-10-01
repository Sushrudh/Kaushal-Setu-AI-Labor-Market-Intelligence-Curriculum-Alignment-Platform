import React from 'react';
import { UserRole } from '../../types';

interface Props {
  onNavigate: (view: string) => void;
  onOpenPortal: (role: UserRole) => void;
}

export const Footer: React.FC<Props> = ({ onNavigate, onOpenPortal }) => {
  return (
    <footer className="bg-[#191817] text-[#DCD5CB] border-t border-[#2C2B29] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#2C2B29]">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#4F8279]"></span>
              <span className="text-2xl font-serif text-[#F8F5F0] font-semibold">Kaushal Setu</span>
            </div>
            <p className="text-sm text-[#81766D] leading-relaxed max-w-sm">
              An evidence-based academia–industry skill mapping and collaboration platform bridging the gap between vocational training capacity and real-time regional hiring demand.
            </p>
            <div className="pt-2 text-xs text-[#81766D] space-y-1">
              <p>Aligned with Ministry of Skill Development & Entrepreneurship (MSDE) & NSQF</p>
              <p>Serving District Skill Development Committees (DSDCs) & Regional Industrial Hubs</p>
            </div>
          </div>

          {/* Platform Pages */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-[#F8F5F0] uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2 text-sm text-[#81766D]">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-[#F8F5F0] transition-colors">
                  Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('district-analytics')} className="hover:text-[#F8F5F0] transition-colors">
                  District Skill Analytics
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('nsqf-explorer')} className="hover:text-[#F8F5F0] transition-colors">
                  NSQF Skill Catalogue
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('architecture')} className="hover:text-[#F8F5F0] transition-colors">
                  Tech Architecture & PRD
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('how-it-works')} className="hover:text-[#F8F5F0] transition-colors">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#F8F5F0] transition-colors">
                  About & Governance
                </button>
              </li>
            </ul>
          </div>

          {/* Stakeholder Portals */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-[#F8F5F0] uppercase tracking-wider">Stakeholder Portals</h4>
            <ul className="space-y-2 text-sm text-[#81766D]">
              <li>
                <button onClick={() => onOpenPortal('dsdc')} className="hover:text-[#F5ED78] transition-colors text-left">
                  District Skill Committees (DSDC)
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPortal('employer')} className="hover:text-[#F5ED78] transition-colors text-left">
                  Regional Employers & Industry
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPortal('institution')} className="hover:text-[#F5ED78] transition-colors text-left">
                  Vocational Institutions & ITIs
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPortal('student')} className="hover:text-[#F5ED78] transition-colors text-left">
                  Students & Job Seekers
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Governance */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-[#F8F5F0] uppercase tracking-wider">Governance & Trust</h4>
            <ul className="space-y-2 text-sm text-[#81766D]">
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-[#F8F5F0] transition-colors">
                  Privacy Policy & DPDP Act
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-[#F8F5F0] transition-colors">
                  Terms of Service & RBAC
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('methodology')} className="hover:text-[#F8F5F0] transition-colors">
                  Scoring Methodology & Limitations
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[#F8F5F0] transition-colors">
                  Contact & Support
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#81766D] gap-4">
          <p>© {new Date().getFullYear()} Kaushal Setu Platform. Built for transparent workforce planning and academic-industry alignment.</p>
          <div className="flex items-center gap-4">
            <span>NSQF Levels 1–10 Taxonomy</span>
            <span>·</span>
            <span>OOWI Warning Engine</span>
            <span>·</span>
            <span>Human-Guided Decisions</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
