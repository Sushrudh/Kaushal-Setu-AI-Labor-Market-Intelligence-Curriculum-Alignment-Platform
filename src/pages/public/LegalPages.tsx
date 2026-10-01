import React, { useState } from 'react';
import { ShieldCheck, Lock, FileText, AlertCircle } from 'lucide-react';

interface Props {
  initialTab?: 'privacy' | 'terms' | 'methodology';
}

export const LegalPages: React.FC<Props> = ({ initialTab = 'privacy' }) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'methodology'>(initialTab);

  return (
    <div className="bg-[#F8F5F0] py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation pill tabs */}
        <div className="flex border-b border-[#E7E1D9] text-xs font-semibold gap-6 pb-2">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`pb-2 transition-colors relative ${
              activeTab === 'privacy' ? 'text-[#191817]' : 'text-[#81766D] hover:text-[#191817]'
            }`}
          >
            Privacy Policy (DPDP Act)
            {activeTab === 'privacy' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#191817]" />}
          </button>

          <button
            onClick={() => setActiveTab('terms')}
            className={`pb-2 transition-colors relative ${
              activeTab === 'terms' ? 'text-[#191817]' : 'text-[#81766D] hover:text-[#191817]'
            }`}
          >
            Terms of Service & RBAC
            {activeTab === 'terms' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#191817]" />}
          </button>

          <button
            onClick={() => setActiveTab('methodology')}
            className={`pb-2 transition-colors relative ${
              activeTab === 'methodology' ? 'text-[#191817]' : 'text-[#81766D] hover:text-[#191817]'
            }`}
          >
            Scoring Methodology & Limitations
            {activeTab === 'methodology' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#191817]" />}
          </button>
        </div>

        {/* Content Box */}
        <div className="bg-[#FFFFFF] border border-[#E7E1D9] rounded-2xl p-8 sm:p-10 shadow-xs space-y-6 text-xs sm:text-sm text-[#191817] leading-relaxed">
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-[#4F8279]">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-xs font-semibold uppercase tracking-wider">Data Protection Notice</span>
              </div>
              <h2 className="text-2xl font-serif font-bold text-[#191817]">
                Privacy Policy & DPDP Act 2023 Compliance
              </h2>
              <p className="text-[#81766D]">
                Last updated: September 2026. Kaushal Setu operates in accordance with the Digital Personal Data Protection (DPDP) Act, 2023 of India.
              </p>

              <h4 className="text-base font-serif font-bold pt-2">1. Trainee Privacy & Access Boundaries</h4>
              <p className="text-[#81766D]">
                Student trainee records, contact information, and test scores are strictly private. Trainees maintain complete ownership of their competency records. Peer students and unauthorized third parties cannot access or view another student's profile. Registered employers only view candidate profiles when the trainee explicitly applies or opts into the regional talent proximity discovery pool.
              </p>

              <h4 className="text-base font-serif font-bold pt-2">2. Industrial Requisition Data</h4>
              <p className="text-[#81766D]">
                Job descriptions, required technical skills, and hiring volumes submitted by regional employers are aggregated to produce district-level intelligence. Proprietary business processes or confidential machinery specifications are never published publicly.
              </p>

              <h4 className="text-base font-serif font-bold pt-2">3. Zero Telemetry & Secret Protection</h4>
              <p className="text-[#81766D]">
                Kaushal Setu does not use intrusive third-party commercial advertising trackers or behavioral analytics pixels. All authentication tokens and API communications are encrypted via TLS.
              </p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-[#765033]">
                <Lock className="w-5 h-5" />
                <span className="text-xs font-semibold uppercase tracking-wider">Platform Governance</span>
              </div>
              <h2 className="text-2xl font-serif font-bold text-[#191817]">
                Terms of Service & Role-Based Access
              </h2>

              <h4 className="text-base font-serif font-bold pt-2">1. Authenticated User Roles</h4>
              <p className="text-[#81766D]">
                Users must register under their verifiable role (Government/DSDC Officer, Accredited Institution Principal, Registered Employer Representative, or Trainee). Tampering with authentication headers or attempting privilege escalation to access unauthorized administrative views violates state IT guidelines.
              </p>

              <h4 className="text-base font-serif font-bold pt-2">2. Verified Employer Endorsements</h4>
              <p className="text-[#81766D]">
                Digital endorsements submitted by industry representatives represent formal institutional reviews. Endorsement hashes are permanently recorded in the platform audit log alongside the reviewer's authenticated identity and timestamp. Fabricating endorsements is strictly prohibited.
              </p>
            </div>
          )}

          {activeTab === 'methodology' && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-[#4F8279]">
                <FileText className="w-5 h-5" />
                <span className="text-xs font-semibold uppercase tracking-wider">Methodology Disclosure</span>
              </div>
              <h2 className="text-2xl font-serif font-bold text-[#191817]">
                Calculation Methodology & Limitations
              </h2>

              <h4 className="text-base font-serif font-bold pt-2">1. Obsolescence & Oversupply Warning Index (OOWI)</h4>
              <p className="text-[#81766D]">
                The default 150% threshold for training supply versus estimated hiring demand represents an initial diagnostic project rule, not an established statutory standard. It is designed to prompt committee inquiry into trades where capacity heavily outpaces regional employer absorption.
              </p>

              <h4 className="text-base font-serif font-bold pt-2">2. Demand Scoring Limitations</h4>
              <p className="text-[#81766D]">
                Calculations are based on active surveys and registered MIDC requisitions during the specified quarterly period. Unregistered micro-enterprises or informal apprenticeship arrangements may not be fully reflected in macro demand figures. Committees must consider local context before reallocating laboratory funding.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
