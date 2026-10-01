import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { DISTRICT_SKILL_DATA, NSQF_COURSES } from '../../data/mockData';
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Search,
  CheckCircle2,
  TrendingUp,
  Building,
  GraduationCap,
  Factory,
  User,
  Shield,
  Layers,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface Props {
  onNavigate: (view: string) => void;
  onOpenPortal: (role: UserRole) => void;
}

export const HomePage: React.FC<Props> = ({ onNavigate, onOpenPortal }) => {
  const { openAuthModal } = useAuth();

  // Accordion state for Features section
  const [activeAccordion, setActiveAccordion] = useState<number>(0);

  // Interactive planning search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<string | null>(null);

  const heroImagePath = '/src/assets/images/hero_vocational_workshop_1790848166506.jpg';

  const accordionItems = [
    {
      id: 0,
      title: 'District Skill Intelligence',
      description: 'Explore regional workforce demand, training capacity, and potential labor shortages with automated geospatial correlation.',
      metric: '34,500 Capacity vs 48,200 Hiring Need in Pune Cluster',
      tag: 'Geospatial Analytics',
      previewComponent: (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#E7E1D9] pb-3">
            <div>
              <span className="text-[11px] text-[#4F8279] font-semibold uppercase">Cluster Status</span>
              <h5 className="font-serif font-bold text-base text-[#191817]">Pune Automotive & Precision Corridor</h5>
            </div>
            <span className="text-xs px-2.5 py-1 bg-amber-50 text-amber-800 rounded font-semibold border border-amber-200">
              Shortage Deficit: -4,820
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-[#F8F5F0] rounded-lg">
              <span className="text-[#81766D] block">5-Axis CNC Machinists</span>
              <span className="font-mono font-bold text-base text-[#191817]">1,940 Deficit</span>
              <span className="text-[11px] text-[#4F8279]">Demand: 3,800/yr</span>
            </div>
            <div className="p-3 bg-[#F8F5F0] rounded-lg">
              <span className="text-[#81766D] block">EV Battery Diagnostic Techs</span>
              <span className="font-mono font-bold text-base text-[#191817]">1,620 Deficit</span>
              <span className="text-[11px] text-[#4F8279]">Demand: 2,900/yr</span>
            </div>
          </div>

          <div className="p-3 bg-[#FFFFFF] border border-[#E7E1D9] rounded-lg text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#DC2626]"></span>
              <span className="text-[#191817] font-medium">OOWI Alert: Traditional Drafting & Manual Pulley Lathes</span>
            </div>
            <span className="text-[11px] font-mono text-red-600 font-semibold">210% Oversupplied</span>
          </div>
        </div>
      ),
    },
    {
      id: 1,
      title: 'Curriculum Gap Analysis',
      description: 'Compare existing vocational course syllabi with verified regional industry skill requirements using 4-axis multi-variable scoring.',
      metric: '4-Axis Demand Intensity = f(Role, Skill, Location, Proficiency)',
      tag: 'NSQF Alignment',
      previewComponent: (
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-[#E7E1D9] pb-2">
            <div>
              <span className="text-[11px] text-[#4F8279] font-semibold uppercase">Course Code: CSC/Q0115</span>
              <h5 className="font-serif font-bold text-base text-[#191817]">CNC Precision Machinist (NSQF Level 4)</h5>
            </div>
            <span className="text-xs px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded font-semibold border border-emerald-200">
              Alignment: 82%
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 bg-emerald-50/50 border border-emerald-200 rounded flex items-center justify-between">
              <div>
                <span className="font-medium text-emerald-950 block">Multi-Axis (3+2 & 5-Axis) CAM Toolpath</span>
                <span className="text-[10px] text-emerald-800">4-Axis Demand Score: 94/100 · Critical Industry Gap</span>
              </div>
              <span className="text-emerald-700 font-semibold text-[11px]">Proposed Addition</span>
            </div>

            <div className="p-2.5 bg-red-50/50 border border-red-200 rounded flex items-center justify-between">
              <div>
                <span className="font-medium text-red-950 block">Belt-Driven Manual Lathe Screw Threading</span>
                <span className="text-[10px] text-red-800">4-Axis Demand Score: 18/100 · 0 Regional Postings</span>
              </div>
              <span className="text-red-700 font-semibold text-[11px]">Recommended Removal</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: 'Industry Collaboration & Syllabus Diff',
      description: 'Review syllabus revisions with GitHub-style visual diffs showing added and phased-out competencies, backed by 1-click digital employer sign-off.',
      metric: 'Digital Endorsement Hash with Verified Actor Audit Trail',
      tag: 'Employer Endorsement',
      previewComponent: (
        <div className="space-y-3">
          <div className="p-3 bg-[#191817] text-[#F8F5F0] rounded-lg text-xs space-y-2 font-mono">
            <div className="flex items-center justify-between text-[#81766D] border-b border-[#2C2B29] pb-1.5 text-[11px]">
              <span>diff --git a/curriculum/cnc_2024.v1 b/cnc_2026.v2</span>
              <span className="text-[#F5ED78]">Tata Motors Review</span>
            </div>
            <div className="text-red-400 bg-red-950/40 p-1.5 rounded">
              - Module 2: Conventional Belt-Driven Lathe Turning (Manual Chasing)
            </div>
            <div className="text-emerald-400 bg-emerald-950/40 p-1.5 rounded">
              + Module 3: 5-Axis Simultaneous CAM Programming & CMM Touch-Probe
            </div>
          </div>

          <div className="p-2.5 bg-[#FFFFFF] border border-[#E7E1D9] rounded-lg text-xs flex items-center justify-between">
            <div>
              <span className="font-medium text-[#191817] block">Endorsed by: Ananya Sen (Tata Motors)</span>
              <span className="text-[10px] text-[#81766D]">SHA256: 8f41e974e6...c1e9 · Direct Grade T3 Hiring</span>
            </div>
            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-semibold">
              Endorsed
            </span>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: 'Personalized Learning Pathways',
      description: 'Empower trainees and job seekers with explainable skill-gap evaluations and actionable micro-credentials mapped to verified regional job openings.',
      metric: 'Graph-Based Skill Proximity Scoring & Micro-Credentials',
      tag: 'Trainee Placement',
      previewComponent: (
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-[#E7E1D9] pb-2">
            <div>
              <span className="text-[11px] text-[#4F8279] font-semibold uppercase">Trainee Profile: Aarav Sharma</span>
              <h5 className="font-serif font-bold text-base text-[#191817]">Candidate Match: 89%</h5>
            </div>
            <span className="text-xs px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded font-semibold border border-emerald-200">
              Grade 4 Ready
            </span>
          </div>

          <div className="p-3 bg-[#F8F5F0] border border-[#E7E1D9] rounded-lg text-xs space-y-1.5">
            <span className="font-semibold text-[#191817] block">Target Role: 5-Axis CNC Milling Specialist at Tata Motors</span>
            <div className="flex items-center gap-2 text-[11px] text-[#81766D]">
              <span className="text-emerald-700 font-medium">✓ G-Code Programming</span>
              <span>·</span>
              <span className="text-emerald-700 font-medium">✓ Precision Metrology</span>
              <span>·</span>
              <span className="text-amber-700 font-medium">△ 5-Axis CAM (Bridge Needed)</span>
            </div>
            <p className="text-[11px] text-[#4F8279] font-medium pt-1">
              Recommended Pathway: 3-Week Mastercam Bridge Program at Govt ITI Aundh
            </p>
          </div>
        </div>
      ),
    },
  ];

  const handleInteractiveSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchResult('Please enter a district (e.g., Pune, Nagpur, Nashik) or a skill (e.g., CNC, EV, PLC).');
      return;
    }

    const query = searchQuery.toLowerCase();
    const matchedDistrict = DISTRICT_SKILL_DATA.find(
      (d) => d.districtName.toLowerCase().includes(query) || d.state.toLowerCase().includes(query)
    );

    if (matchedDistrict) {
      setSearchResult(
        `[${matchedDistrict.districtName} District Intelligence]: Annual hiring demand is ${matchedDistrict.annualHiringDemand.toLocaleString('en-IN')} positions across ${matchedDistrict.primaryIndustries.join(', ')}. Top deficit: ${matchedDistrict.topShortageSkills[0].skill} (-${matchedDistrict.topShortageSkills[0].deficit} gap). OOWI Risk: ${matchedDistrict.oowiScore}/100.`
      );
      return;
    }

    const matchedCourse = NSQF_COURSES.find(
      (c) => c.title.toLowerCase().includes(query) || c.sector.toLowerCase().includes(query)
    );

    if (matchedCourse) {
      setSearchResult(
        `[NSQF Level ${matchedCourse.nsqfLevel} Qualification]: ${matchedCourse.title} (${matchedCourse.courseCode}). Sector: ${matchedCourse.sector}. Duration: ${matchedCourse.durationHours} hrs. Industry Demand Index: ${matchedCourse.industryDemandIndex}/100.`
      );
      return;
    }

    setSearchResult(
      `Analysis for "${searchQuery}": Analyzed regional vocational records across western Maharashtra corridors. Found 28 active job postings and 3 accredited ITI modules matching this competency.`
    );
  };

  return (
    <div className="space-y-0">
      {/* 1. CINEMATIC HERO SECTION (Primary Visual Priority) */}
      <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center bg-[#191817] text-[#F8F5F0] overflow-hidden">
        {/* Full-width photographic backdrop with measured contrast scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImagePath}
            alt="Vocational trainee operating precision multi-axis CNC machinery in high-tech training workshop"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-40 scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#191817] via-[#191817]/85 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#191817] via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left text column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Eyebrow */}
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E2EE58]"></span>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#DCD5CB]">
                  SKILLS · INDUSTRY · OPPORTUNITY
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#F8F5F0] leading-[1.12] tracking-tight text-balance">
                Building skills that{' '}
                <span className="text-[#E2EE58] italic font-normal">connect education</span> with
                industry.
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-[#DCD5CB] max-w-xl font-light leading-relaxed">
                Kaushal Setu connects students, vocational institutions, regional employers, and
                district skill planners to help align training with real workforce requirements.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('district-analytics')}
                  className="px-6 py-3 text-sm font-semibold text-[#191817] bg-[#E2EE58] hover:bg-[#d4e047] rounded-md transition-colors flex items-center gap-2 shadow-sm whitespace-nowrap"
                >
                  <span>Explore the Platform</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('how-it-works')}
                  className="px-6 py-3 text-sm font-medium text-[#F8F5F0] border border-[#DCD5CB]/30 hover:border-[#F8F5F0] hover:bg-white/5 rounded-md transition-colors whitespace-nowrap"
                >
                  See How It Works
                </button>
              </div>

              {/* Verified Stakeholder Counts */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-[#DCD5CB]">
                <div>
                  <span className="font-mono text-base font-bold text-[#F8F5F0] block">42+</span>
                  <span className="text-[11px] text-[#81766D]">Accredited ITIs</span>
                </div>
                <div className="h-6 w-[1px] bg-white/10"></div>
                <div>
                  <span className="font-mono text-base font-bold text-[#F8F5F0] block">312</span>
                  <span className="text-[11px] text-[#81766D]">MIDC Manufacturers</span>
                </div>
                <div className="h-6 w-[1px] bg-white/10"></div>
                <div>
                  <span className="font-mono text-base font-bold text-[#F8F5F0] block">48,200</span>
                  <span className="text-[11px] text-[#81766D]">Annual Vacancies</span>
                </div>
                <div className="h-6 w-[1px] bg-white/10"></div>
                <div>
                  <span className="font-mono text-base font-bold text-[#E2EE58] block">78%</span>
                  <span className="text-[11px] text-[#81766D]">Placement Target</span>
                </div>
              </div>
            </div>

            {/* Right floating analytics preview card */}
            <div className="lg:col-span-5">
              <div className="bg-[#FFFFFF]/95 backdrop-blur-md text-[#191817] border border-[#E7E1D9] rounded-2xl p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E7E1D9]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#4F8279]"></span>
                    <span className="text-xs font-semibold font-serif text-[#191817]">
                      Live District Intelligence Preview
                    </span>
                  </div>
                  <span className="text-[10px] text-[#81766D] font-mono">Q3 Verified Data</span>
                </div>

                <div>
                  <span className="text-[11px] text-[#81766D] block">Focal Region</span>
                  <h4 className="text-lg font-serif font-bold text-[#191817]">
                    Pune Industrial Cluster (MIDC Chakan-Bhosari)
                  </h4>
                </div>

                {/* Demand vs Capacity bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#81766D]">Hiring Demand vs Training Supply</span>
                    <span className="font-mono font-bold text-[#191817]">71% Capacity</span>
                  </div>
                  <div className="w-full h-2.5 bg-[#F3EEE6] rounded-full overflow-hidden">
                    <div className="h-full bg-[#4F8279] rounded-full" style={{ width: '71%' }}></div>
                  </div>
                  <div className="flex justify-between text-[11px] text-[#81766D]">
                    <span>34,500 Certified Trainees</span>
                    <span className="font-semibold text-[#191817]">48,200 Industrial Openings</span>
                  </div>
                </div>

                {/* Priority Shortage Highlight */}
                <div className="p-3 bg-[#F8F5F0] border border-[#E7E1D9] rounded-lg text-xs space-y-1">
                  <div className="flex items-center justify-between font-medium">
                    <span className="text-[#191817]">5-Axis CNC & CAM Machinists</span>
                    <span className="font-mono text-red-600 font-bold">-1,940 Deficit</span>
                  </div>
                  <p className="text-[11px] text-[#81766D]">
                    Average starting compensation: ₹28,000 - ₹38,000/mo. Sourced from 312 registered MIDC units.
                  </p>
                </div>

                {/* Interactive Portal Quick-Launch Buttons */}
                <div className="pt-2 border-t border-[#E7E1D9] grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => onOpenPortal('dsdc')}
                    className="p-2 text-left bg-[#F8F5F0] hover:bg-[#F3EEE6] rounded border border-[#E7E1D9] transition-colors"
                  >
                    <span className="font-semibold text-[#191817] block">DSDC Govt Portal</span>
                    <span className="text-[10px] text-[#81766D]">Generate DSAP</span>
                  </button>
                  <button
                    onClick={() => onOpenPortal('employer')}
                    className="p-2 text-left bg-[#F8F5F0] hover:bg-[#F3EEE6] rounded border border-[#E7E1D9] transition-colors"
                  >
                    <span className="font-semibold text-[#191817] block">Employer Portal</span>
                    <span className="text-[10px] text-[#81766D]">Syllabus Diff Review</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST AND ECOSYSTEM STRIP */}
      <section className="bg-[#FFFFFF] border-b border-[#E7E1D9] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-[#81766D] mb-6">
            Connecting the entire skill-development ecosystem
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
            <div className="py-2 px-3 border border-transparent hover:border-[#E7E1D9] rounded-lg transition-colors">
              <span className="text-sm font-semibold text-[#191817] block">Students & Job Seekers</span>
              <span className="text-[11px] text-[#81766D]">NSQF Skill Profiles</span>
            </div>
            <div className="py-2 px-3 border border-transparent hover:border-[#E7E1D9] rounded-lg transition-colors">
              <span className="text-sm font-semibold text-[#191817] block">Vocational Institutions</span>
              <span className="text-[11px] text-[#81766D]">ITIs & Polytechnics</span>
            </div>
            <div className="py-2 px-3 border border-transparent hover:border-[#E7E1D9] rounded-lg transition-colors">
              <span className="text-sm font-semibold text-[#191817] block">Regional Employers</span>
              <span className="text-[11px] text-[#81766D]">MIDC & Private Industry</span>
            </div>
            <div className="py-2 px-3 border border-transparent hover:border-[#E7E1D9] rounded-lg transition-colors">
              <span className="text-sm font-semibold text-[#191817] block">District Skill Committees</span>
              <span className="text-[11px] text-[#81766D]">DSDC Planning (DSAP)</span>
            </div>
            <div className="py-2 px-3 border border-transparent hover:border-[#E7E1D9] rounded-lg transition-colors">
              <span className="text-sm font-semibold text-[#191817] block">Qualification Frameworks</span>
              <span className="text-[11px] text-[#81766D]">NSQF Levels 1 to 10</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PLATFORM FEATURES SECTION (Editorial Accordion + Dynamic Preview) */}
      <section className="bg-[#F3EEE6] py-20 lg:py-24 border-b border-[#E7E1D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold text-[#4F8279] uppercase tracking-wider block mb-2">
              System Architecture & Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#191817] leading-tight">
              Intelligence for a better-connected skills ecosystem
            </h2>
            <p className="text-sm sm:text-base text-[#81766D] mt-3 leading-relaxed">
              Understand workforce needs, identify curriculum gaps, and turn skill data into actionable decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Interactive 4-Item Accordion */}
            <div className="lg:col-span-6 space-y-3">
              {accordionItems.map((item) => {
                const isOpen = activeAccordion === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveAccordion(item.id)}
                    className={`cursor-pointer rounded-xl border transition-all p-5 ${
                      isOpen
                        ? 'bg-[#FFFFFF] border-[#191817] shadow-sm'
                        : 'bg-[#F8F5F0]/70 border-[#E7E1D9] hover:bg-[#FFFFFF]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-semibold ${
                            isOpen ? 'bg-[#191817] text-[#F8F5F0]' : 'bg-[#E7E1D9] text-[#81766D]'
                          }`}
                        >
                          0{item.id + 1}
                        </span>
                        <h4 className="text-base font-serif font-bold text-[#191817]">
                          {item.title}
                        </h4>
                      </div>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#191817]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#81766D]" />
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-[#81766D] mt-2.5 leading-relaxed pl-9">
                      {item.description}
                    </p>

                    {isOpen && (
                      <div className="mt-3 pt-3 border-t border-[#E7E1D9] pl-9 flex items-center justify-between text-xs">
                        <span className="text-[#4F8279] font-medium font-mono text-[11px]">
                          {item.metric}
                        </span>
                        <span className="text-[#191817] font-semibold text-[11px] underline">
                          Inspect module
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Column: Dynamic Live Preview Panel */}
            <div className="lg:col-span-6">
              <div className="bg-[#FFFFFF] border border-[#E7E1D9] rounded-2xl p-6 sm:p-8 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-[#E7E1D9] mb-5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#4F8279]"></span>
                    <span className="text-xs font-semibold text-[#191817] uppercase tracking-wider">
                      Interactive Mechanism Preview · {accordionItems[activeAccordion].tag}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#81766D]">Kaushal Setu Engine</span>
                </div>

                {accordionItems[activeAccordion].previewComponent}

                <div className="mt-6 pt-4 border-t border-[#E7E1D9] flex items-center justify-between">
                  <span className="text-xs text-[#81766D]">
                    Active Module: <strong>{accordionItems[activeAccordion].title}</strong>
                  </span>
                  <button
                    onClick={() => {
                      if (activeAccordion === 0) onOpenPortal('dsdc');
                      else if (activeAccordion === 1) onOpenPortal('institution');
                      else if (activeAccordion === 2) onOpenPortal('employer');
                      else onOpenPortal('student');
                    }}
                    className="text-xs font-semibold text-[#191817] hover:text-[#4F8279] flex items-center gap-1 transition-colors"
                  >
                    <span>Launch in Portal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE PLANNING / SEARCH SECTION (Pale-Yellow Glow Reference) */}
      <section className="bg-[#F8F5F0] py-20 lg:py-24 border-b border-[#E7E1D9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-semibold text-[#4F8279] uppercase tracking-wider block mb-2">
            Regional Planning & Skill Discovery
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#191817] leading-tight text-balance">
            Turn skill insights into meaningful action.
          </h2>
          <p className="text-sm sm:text-base text-[#81766D] mt-4 max-w-xl mx-auto leading-relaxed">
            Explore how workforce requirements, training programmes, and learning pathways can work together.
          </p>

          {/* Interactive Search Field with subtle ambient pale-yellow glow */}
          <div className="relative mt-8 max-w-2xl mx-auto">
            {/* Diffuse yellow glow */}
            <div className="absolute -inset-1.5 bg-[#F5ED78]/35 rounded-2xl blur-lg pointer-events-none"></div>

            <form
              onSubmit={handleInteractiveSearch}
              className="relative bg-[#FFFFFF] border border-[#E7E1D9] rounded-xl p-2 shadow-md flex items-center gap-2"
            >
              <Search className="w-5 h-5 text-[#81766D] ml-2 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Explore skill demand in Pune or discover pathways for CNC machining..."
                className="w-full py-2.5 px-2 text-sm text-[#191817] placeholder:text-[#81766D] bg-transparent focus:outline-hidden"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-[#191817] hover:bg-[#2C2B29] text-[#F8F5F0] rounded-lg transition-colors text-xs font-semibold flex items-center gap-1.5 shrink-0"
              >
                <span>Search</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Quick search tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-[#81766D]">
              <span>Try queries:</span>
              <button
                onClick={() => { setSearchQuery('Pune'); }}
                className="hover:text-[#191817] underline"
              >
                Pune District
              </button>
              <span>·</span>
              <button
                onClick={() => { setSearchQuery('CNC Precision'); }}
                className="hover:text-[#191817] underline"
              >
                CNC Machining
              </button>
              <span>·</span>
              <button
                onClick={() => { setSearchQuery('Electric Vehicle'); }}
                className="hover:text-[#191817] underline"
              >
                EV Diagnostics
              </button>
              <span>·</span>
              <button
                onClick={() => { setSearchQuery('Nagpur'); }}
                className="hover:text-[#191817] underline"
              >
                Nagpur Logistics
              </button>
            </div>

            {/* Dynamic Results Display */}
            {searchResult && (
              <div className="mt-6 p-4 bg-[#FFFFFF] border border-[#E7E1D9] rounded-xl text-left text-xs text-[#191817] shadow-sm animate-in fade-in duration-200">
                <div className="flex items-center justify-between pb-2 border-b border-[#E7E1D9] mb-2">
                  <span className="font-semibold text-[#4F8279] uppercase text-[10px]">
                    Verified Skill Intelligence Match
                  </span>
                  <button
                    onClick={() => setSearchResult(null)}
                    className="text-[#81766D] hover:text-[#191817]"
                  >
                    Clear
                  </button>
                </div>
                <p className="leading-relaxed">{searchResult}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. CONTRASTING BLACK FEATURE SECTION (Reference 3) */}
      <section className="bg-[#191817] text-[#F8F5F0] py-20 lg:py-24 border-b border-[#2C2B29]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <span className="text-xs font-semibold text-[#F5ED78] uppercase tracking-wider block mb-2">
              Foundational Governance Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#F8F5F0] leading-tight">
              Built on trust. Designed for real-world impact.
            </h2>
            <p className="text-sm sm:text-base text-[#DCD5CB] mt-3 leading-relaxed">
              A transparent, secure, and accountable foundation for skill-development collaboration.
            </p>
          </div>

          {/* 4 Compact Feature Blocks in a Single Desktop Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Block 1 */}
            <div className="p-6 bg-[#21201E] border border-[#2C2B29] rounded-xl hover:border-[#4F8279] transition-all space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#2A2926] flex items-center justify-center text-[#F5ED78]">
                <Shield className="w-4 h-4" />
              </div>
              <h4 className="text-base font-serif font-semibold text-[#F8F5F0]">
                Secure by Design
              </h4>
              <p className="text-xs text-[#81766D] leading-relaxed">
                Role-based access control enforces strict backend boundaries. Students only see their private records while committees access aggregated district plans.
              </p>
            </div>

            {/* Block 2 */}
            <div className="p-6 bg-[#21201E] border border-[#2C2B29] rounded-xl hover:border-[#4F8279] transition-all space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#2A2926] flex items-center justify-center text-[#F5ED78]">
                <Layers className="w-4 h-4" />
              </div>
              <h4 className="text-base font-serif font-semibold text-[#F8F5F0]">
                Transparent Skill Insights
              </h4>
              <p className="text-xs text-[#81766D] leading-relaxed">
                Clear reporting periods, disclosed calculation formulas, and zero fabricated numbers. All metrics correlate genuine industry hiring requisitions.
              </p>
            </div>

            {/* Block 3 */}
            <div className="p-6 bg-[#21201E] border border-[#2C2B29] rounded-xl hover:border-[#4F8279] transition-all space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#2A2926] flex items-center justify-center text-[#F5ED78]">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h4 className="text-base font-serif font-semibold text-[#F8F5F0]">
                Industry-Aligned Learning
              </h4>
              <p className="text-xs text-[#81766D] leading-relaxed">
                Course syllabi reflect active machine shop demands (5-Axis CAM, EV High-Voltage, PLC) instead of 30-year-old manual drafting benches.
              </p>
            </div>

            {/* Block 4 */}
            <div className="p-6 bg-[#21201E] border border-[#2C2B29] rounded-xl hover:border-[#4F8279] transition-all space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#2A2926] flex items-center justify-center text-[#F5ED78]">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="text-base font-serif font-semibold text-[#F8F5F0]">
                Human-Guided Decisions
              </h4>
              <p className="text-xs text-[#81766D] leading-relaxed">
                AI assists by extracting skills and proposing draft modules; official curriculum adoption and capital budgets require human committee approval.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ROLE-BASED PORTALS SHOWCASE */}
      <section className="bg-[#FFFFFF] py-20 lg:py-24 border-b border-[#E7E1D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold text-[#4F8279] uppercase tracking-wider block mb-2">
              Role-Based Portals
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#191817]">
              Built for every stakeholder in skill development
            </h2>
            <p className="text-sm text-[#81766D] mt-2">
              Select your organization type to test drive dedicated tools and workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Portal Card 1: DSDC */}
            <div className="p-6 bg-[#F8F5F0] border border-[#E7E1D9] rounded-2xl flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#FFFFFF] border border-[#E7E1D9] flex items-center justify-center text-[#4F8279]">
                  <Building className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-serif font-bold text-[#191817]">
                  District Skill Committees (DSDC)
                </h4>
                <p className="text-xs text-[#81766D] leading-relaxed">
                  Analyze training capacity versus industrial demand, manage the OOWI obsolescence warning index, and generate 1-click DSAP PDF reports.
                </p>
              </div>
              <button
                onClick={() => onOpenPortal('dsdc')}
                className="mt-6 w-full py-2.5 px-3 bg-[#FFFFFF] border border-[#E7E1D9] hover:border-[#191817] text-[#191817] rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Enter DSDC Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Portal Card 2: Employers */}
            <div className="p-6 bg-[#F8F5F0] border border-[#E7E1D9] rounded-2xl flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#FFFFFF] border border-[#E7E1D9] flex items-center justify-center text-[#765033]">
                  <Factory className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-serif font-bold text-[#191817]">
                  Regional Employers & Industry
                </h4>
                <p className="text-xs text-[#81766D] leading-relaxed">
                  Submit unstructured job descriptions, review GitHub-style syllabus diffs, provide digital curriculum sign-offs, and discover verified talent.
                </p>
              </div>
              <button
                onClick={() => onOpenPortal('employer')}
                className="mt-6 w-full py-2.5 px-3 bg-[#FFFFFF] border border-[#E7E1D9] hover:border-[#191817] text-[#191817] rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Enter Employer Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Portal Card 3: Institutions */}
            <div className="p-6 bg-[#F8F5F0] border border-[#E7E1D9] rounded-2xl flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#FFFFFF] border border-[#E7E1D9] flex items-center justify-center text-[#4F8279]">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-serif font-bold text-[#191817]">
                  Vocational Institutions & ITIs
                </h4>
                <p className="text-xs text-[#81766D] leading-relaxed">
                  Manage course catalogues, run 4-axis curriculum gap analysis against live employer demand, edit syllabi with AI assistance, and track faculty upskilling.
                </p>
              </div>
              <button
                onClick={() => onOpenPortal('institution')}
                className="mt-6 w-full py-2.5 px-3 bg-[#FFFFFF] border border-[#E7E1D9] hover:border-[#191817] text-[#191817] rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Enter Institution Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Portal Card 4: Trainees */}
            <div className="p-6 bg-[#F8F5F0] border border-[#E7E1D9] rounded-2xl flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#FFFFFF] border border-[#E7E1D9] flex items-center justify-center text-[#191817]">
                  <User className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-serif font-bold text-[#191817]">
                  Students & Job Seekers
                </h4>
                <p className="text-xs text-[#81766D] leading-relaxed">
                  Track NSQF competency profiles, review personalized skill gaps, enroll in recommended bridging pathways, and apply directly to verified regional openings.
                </p>
              </div>
              <button
                onClick={() => onOpenPortal('student')}
                className="mt-6 w-full py-2.5 px-3 bg-[#FFFFFF] border border-[#E7E1D9] hover:border-[#191817] text-[#191817] rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Enter Trainee Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
