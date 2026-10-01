import React, { useState } from 'react';
import { UserRole } from '../../types';
import { Building, Factory, GraduationCap, User, ArrowRight, CheckCircle2 } from 'lucide-react';

interface Props {
  onOpenPortal: (role: UserRole) => void;
}

export const HowItWorksPage: React.FC<Props> = ({ onOpenPortal }) => {
  const [activeTab, setActiveTab] = useState<UserRole>('dsdc');

  const roleWorkflows: Record<UserRole, { title: string; subtitle: string; steps: { step: string; detail: string }[]; cta: string }> = {
    dsdc: {
      title: 'District Skill Development Committees (DSDC / Govt)',
      subtitle: 'Macro planning, training capacity monitoring, and budget reallocation',
      steps: [
        {
          step: '1. Ingest Industrial Requisitions',
          detail: 'Aggregates hiring demand data from regional MIDC manufacturers, industrial parks, and national career portals.',
        },
        {
          step: '2. Monitor OOWI Warning Index',
          detail: 'Automated alerts highlight trades where training output exceeds demand by > 150% (e.g. Traditional Draughtsman).',
        },
        {
          step: '3. Reallocate Machinery & Equipment',
          detail: 'Advisory engine recommends decommissioning legacy benches and funding high-demand multi-axis CNC or EV testing labs.',
        },
        {
          step: '4. Export 1-Click DSAP Reports',
          detail: 'Generate comprehensive, publication-ready executive PDF briefs for Collectorate committee meetings.',
        },
      ],
      cta: 'Explore DSDC Workflow',
    },
    employer: {
      title: 'Regional Employers & Industrial Plants',
      subtitle: 'Post requisitions, review course changes, and discover vetted talent',
      steps: [
        {
          step: '1. Submit Hiring Requisitions',
          detail: 'Upload unstructured job descriptions or submit structured technical hiring surveys with required proficiencies.',
        },
        {
          step: '2. Review GitHub-Style Syllabus Diffs',
          detail: 'Inspect side-by-side comparisons of course modules with additions in green and outdated topics in red.',
        },
        {
          step: '3. Digitally Endorse Curriculum',
          detail: 'Submit verified digital sign-offs committing to interview or hire graduates trained under the revised syllabus.',
        },
        {
          step: '4. Candidate Proximity Discovery',
          detail: 'Filter local ITI graduates matching specific machine controls (Siemens 828D, Mastercam) with transparent match scores.',
        },
      ],
      cta: 'Explore Employer Workflow',
    },
    institution: {
      title: 'Vocational Institutions (ITIs & Polytechnics)',
      subtitle: 'Course modernization, skill gap diagnosis, and faculty upskilling',
      steps: [
        {
          step: '1. Benchmark Active Courses',
          detail: 'Select courses to run 4-axis curriculum gap analysis against active local manufacturing demand.',
        },
        {
          step: '2. Edit Syllabi with AI Assistance',
          detail: 'Propose module updates using AI-suggested NSQF competencies with required human review and approval.',
        },
        {
          step: '3. Secure Industry Endorsement',
          detail: 'Publish revision proposals to regional employers to collect formal feedback and hiring commitments.',
        },
        {
          step: '4. Track Trainer Upskilling',
          detail: 'Identify faculty members requiring master trainer bootcamps before deploying modernized curriculum.',
        },
      ],
      cta: 'Explore Institution Workflow',
    },
    student: {
      title: 'Students & Trainees (Job Seekers)',
      subtitle: 'Competency tracking, personalized gap bridging, and direct job placement',
      steps: [
        {
          step: '1. Build NSQF Skill Profile',
          detail: 'Record trade qualifications, verified machine certifications, and evaluated workshop proficiencies.',
        },
        {
          step: '2. Review Explainable Skill-Gap Report',
          detail: 'See exactly which competencies are missing for target roles (e.g. 5-Axis CAM or CAN-bus diagnostics).',
        },
        {
          step: '3. Enroll in Bridging Micro-Credentials',
          detail: 'Complete recommended 2-4 week technical bridge modules hosted at regional centers of excellence.',
        },
        {
          step: '4. Apply Directly to Local Openings',
          detail: 'Connect with verified regional employers with transparent applicant match transparency.',
        },
      ],
      cta: 'Explore Student Workflow',
    },
  };

  const current = roleWorkflows[activeTab];

  return (
    <div className="bg-[#F8F5F0] py-12 lg:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-semibold text-[#4F8279] uppercase tracking-wider block">
            End-to-End Operational Lifecycle
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#191817]">
            How Kaushal Setu Works
          </h1>
          <p className="text-sm sm:text-base text-[#81766D] leading-relaxed">
            Four interconnected portals working on a shared data model to create a self-correcting vocational training ecosystem.
          </p>
        </div>

        {/* Role Tab Selectors */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 bg-[#F3EEE6] rounded-xl border border-[#E7E1D9]">
          <button
            onClick={() => setActiveTab('dsdc')}
            className={`py-2.5 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'dsdc'
                ? 'bg-[#FFFFFF] text-[#191817] shadow-xs'
                : 'text-[#81766D] hover:text-[#191817]'
            }`}
          >
            <Building className="w-4 h-4 text-[#4F8279]" />
            <span>Govt / DSDC</span>
          </button>

          <button
            onClick={() => setActiveTab('employer')}
            className={`py-2.5 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'employer'
                ? 'bg-[#FFFFFF] text-[#191817] shadow-xs'
                : 'text-[#81766D] hover:text-[#191817]'
            }`}
          >
            <Factory className="w-4 h-4 text-[#765033]" />
            <span>Employer</span>
          </button>

          <button
            onClick={() => setActiveTab('institution')}
            className={`py-2.5 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'institution'
                ? 'bg-[#FFFFFF] text-[#191817] shadow-xs'
                : 'text-[#81766D] hover:text-[#191817]'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-[#4F8279]" />
            <span>Institution</span>
          </button>

          <button
            onClick={() => setActiveTab('student')}
            className={`py-2.5 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'student'
                ? 'bg-[#FFFFFF] text-[#191817] shadow-xs'
                : 'text-[#81766D] hover:text-[#191817]'
            }`}
          >
            <User className="w-4 h-4 text-[#191817]" />
            <span>Student</span>
          </button>
        </div>

        {/* Active Workflow Card */}
        <div className="bg-[#FFFFFF] border border-[#E7E1D9] rounded-2xl p-8 shadow-xs space-y-8">
          <div>
            <span className="text-xs font-mono font-semibold text-[#4F8279] uppercase">
              Role Specification
            </span>
            <h3 className="text-2xl font-serif font-bold text-[#191817] mt-1">
              {current.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#81766D] mt-1">
              {current.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {current.steps.map((st, i) => (
              <div
                key={i}
                className="p-5 bg-[#F8F5F0] border border-[#E7E1D9] rounded-xl space-y-2 hover:border-[#191817] transition-colors"
              >
                <h5 className="font-serif font-bold text-base text-[#191817]">
                  {st.step}
                </h5>
                <p className="text-xs text-[#81766D] leading-relaxed">
                  {st.detail}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#E7E1D9] flex items-center justify-between">
            <span className="text-xs text-[#81766D]">
              Ready to test this role? Log in or launch the interactive portal.
            </span>
            <button
              onClick={() => onOpenPortal(activeTab)}
              className="px-5 py-2.5 bg-[#F5ED78] hover:bg-[#eae162] text-[#191817] font-semibold text-xs rounded-md transition-colors flex items-center gap-2 shadow-xs"
            >
              <span>{current.cta}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
