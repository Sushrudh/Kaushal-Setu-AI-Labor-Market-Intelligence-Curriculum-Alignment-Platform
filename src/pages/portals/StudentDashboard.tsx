import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { JOB_REQUISITIONS } from '../../data/mockData';
import { JobRequisition, VerifiedAssessment } from '../../types';
import { calculateSkillsCoverage, StudentDemonstratedSkill } from '../../services/graphMatchingService';
import {
  User,
  Award,
  TrendingUp,
  Briefcase,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Plus,
  ShieldCheck,
  Clock,
  ExternalLink,
  ChevronRight,
  Info,
  Calendar,
  FileCheck,
  Check,
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { currentUser, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<'analytics' | 'gap-compare' | 'pathway-flow' | 'jobs' | 'profile'>('analytics');

  // Trainee self-declared and verified skills
  const [selfDeclaredSkills, setSelfDeclaredSkills] = useState<string[]>(
    currentUser?.skills || [
      'G-Code Programming',
      'CNC Lathe Operation',
      'Vernier Caliper & Micrometer Inspection',
      'Blueprint Reading',
      'CAD Modeling Basics',
      'Industrial Workshop Safety',
    ]
  );

  const [verifiedAssessments, setVerifiedAssessments] = useState<VerifiedAssessment[]>(
    currentUser?.verifiedAssessments || [
      {
        id: 'ass_001',
        skill: 'G-Code Programming',
        category: 'Technical',
        score: 92,
        maxScore: 100,
        proficiency: 'Advanced',
        assessmentBody: 'DGT All India Trade Test (AITT)',
        assessmentDate: '18 Jan 2026',
        certificateHash: 'sha256:d48e892c90a184f',
      },
      {
        id: 'ass_002',
        skill: 'CNC Lathe Operation',
        category: 'Tools & Machines',
        score: 86,
        maxScore: 100,
        proficiency: 'Intermediate',
        assessmentBody: 'Govt ITI Practical Evaluation Board',
        assessmentDate: '10 Feb 2026',
        certificateHash: 'sha256:b170c2941e8f203',
      },
      {
        id: 'ass_003',
        skill: 'Vernier Caliper & Micrometer Inspection',
        category: 'Metrology & Quality',
        score: 89,
        maxScore: 100,
        proficiency: 'Intermediate',
        assessmentBody: 'Mitutoyo Metrology Lab Certification',
        assessmentDate: '02 Mar 2026',
        certificateHash: 'sha256:77ae124cba49190',
      },
      {
        id: 'ass_004',
        skill: 'Blueprint Reading',
        category: 'Technical',
        score: 94,
        maxScore: 100,
        proficiency: 'Advanced',
        assessmentBody: 'DGT Trade Theory Examination',
        assessmentDate: '14 Dec 2025',
        certificateHash: 'sha256:4a38bf90918c7e2',
      },
      {
        id: 'ass_005',
        skill: 'Industrial Workshop Safety',
        category: 'Safety & Industrial Protocols',
        score: 95,
        maxScore: 100,
        proficiency: 'Advanced',
        assessmentBody: 'National Safety Council (India)',
        assessmentDate: '05 Nov 2025',
        certificateHash: 'sha256:2910fa88bb3e901',
      },
    ]
  );

  // New skill addition state
  const [newSkillInput, setNewSkillInput] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState<'Technical' | 'Tools & Machines' | 'Metrology & Quality' | 'Safety & Industrial Protocols'>('Technical');
  const [newSkillProficiency, setNewSkillProficiency] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [skillAddedSuccess, setSkillAddedSuccess] = useState<string | null>(null);

  // Target job selection for real-time gap analysis
  const [selectedJobId, setSelectedJobId] = useState<string>(JOB_REQUISITIONS[0].id);
  const selectedJob: JobRequisition = JOB_REQUISITIONS.find((j) => j.id === selectedJobId) || JOB_REQUISITIONS[0];

  // Job application state
  const [appliedJobIds, setAppliedJobIds] = useState<Record<string, string>>({
    job_001: 'Under Review',
  });
  const [applicationSuccess, setApplicationSuccess] = useState<string | null>(null);

  // Pathway enrollment progress state
  const [pathwayProgress, setPathwayProgress] = useState<Record<string, number>>({
    step_01: 100, // completed
    step_02: 100, // completed
    step_03: 45,  // in progress
    step_04: 0,   // upcoming
    step_05: 0,   // target
  });
  const [pathwayActionSuccess, setPathwayActionSuccess] = useState<string | null>(null);

  // Convert verified assessments and declared skills to unified demonstrated skills for graph matching
  const demonstratedSkills: StudentDemonstratedSkill[] = [
    ...verifiedAssessments.map((a) => ({
      skill: a.skill,
      proficiency: a.proficiency,
      evidenceSource: 'verified_assessment' as const,
      verifiedScore: a.score,
      assessmentBody: a.assessmentBody,
      assessmentDate: a.assessmentDate,
    })),
    ...selfDeclaredSkills
      .filter((s) => !verifiedAssessments.some((v) => v.skill.toLowerCase() === s.toLowerCase()))
      .map((s) => ({
        skill: s,
        proficiency: 'Intermediate' as const,
        evidenceSource: 'self_declared' as const,
      })),
  ];

  // Calculate real deterministic coverage and gap metrics using Graph Matching Engine
  const coverageAnalysis = calculateSkillsCoverage(
    selectedJob.title,
    selectedJob.employerName,
    selectedJob.requiredSkills,
    demonstratedSkills
  );

  // Categorical Skill Distribution calculation
  const categoryCounts: Record<string, number> = {
    'Technical': 0,
    'Tools & Machines': 0,
    'Metrology & Quality': 0,
    'Safety & Protocols': 0,
  };

  for (const va of verifiedAssessments) {
    if (va.category === 'Technical') categoryCounts['Technical']++;
    else if (va.category === 'Tools & Machines') categoryCounts['Tools & Machines']++;
    else if (va.category === 'Metrology & Quality') categoryCounts['Metrology & Quality']++;
    else categoryCounts['Safety & Protocols']++;
  }

  const totalAssessedSkills = verifiedAssessments.length;

  // Add self-declared skill handler
  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newSkillInput.trim();
    if (!trimmed || selfDeclaredSkills.includes(trimmed)) return;

    const updated = [...selfDeclaredSkills, trimmed];
    setSelfDeclaredSkills(updated);
    updateProfile({ skills: updated });

    setSkillAddedSuccess(`Added "${trimmed}" as self-declared competency in your profile.`);
    setNewSkillInput('');
    setTimeout(() => setSkillAddedSuccess(null), 3500);
  };

  // Job application handler
  const handleApplyToJob = (jobId: string, jobTitle: string) => {
    setAppliedJobIds((prev) => ({
      ...prev,
      [jobId]: 'Application Submitted',
    }));
    setApplicationSuccess(`Application submitted for "${jobTitle}" at ${selectedJob.employerName}. Verified portfolio attached.`);
    setTimeout(() => setApplicationSuccess(null), 5000);
  };

  return (
    <div className="bg-[#F9F8F3] min-h-screen py-8 lg:py-10 text-[#191817]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Breadcrumb & Identity Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E7E1D9]">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#81766D] mb-1 font-mono">
              <span>VOCATIONAL CAREER NETWORK</span>
              <span>/</span>
              <span>AUTHENTICATED TRAINEE PORTAL</span>
              <span>/</span>
              <span className="text-[#191817] font-semibold">{currentUser?.name || 'Aarav Sharma'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#191817]">
              Student Skill Analytics & Real-Time Market Proximity
            </h1>
            <p className="text-xs text-[#81766D] mt-0.5">
              Trainee ID: <strong className="text-[#191817] font-mono">TRAIN-PUN-2026-4402</strong> · {currentUser?.organization || 'Govt ITI Aundh (Batch of 2026)'} · NSQF Level {currentUser?.nsqfLevel || 4}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 bg-[#FFFFFF] border border-[#E7E1D9] text-[#191817] text-xs font-semibold rounded-md flex items-center gap-1.5 shadow-xs font-mono">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              <span>NSQF Level 4 Certified</span>
            </span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-[#E7E1D9] gap-6 text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`pb-3 transition-colors relative flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'analytics' ? 'text-[#191817]' : 'text-[#81766D] hover:text-[#191817]'
            }`}
          >
            <Award className="w-4 h-4 text-[#4F8279]" />
            <span>1. Skill Analytics & Proficiency</span>
            {activeTab === 'analytics' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#191817]" />}
          </button>

          <button
            onClick={() => setActiveTab('gap-compare')}
            className={`pb-3 transition-colors relative flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'gap-compare' ? 'text-[#191817]' : 'text-[#81766D] hover:text-[#191817]'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-[#4F8279]" />
            <span>2. Skill-Gap Comparison Matrix</span>
            {activeTab === 'gap-compare' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#191817]" />}
          </button>

          <button
            onClick={() => setActiveTab('pathway-flow')}
            className={`pb-3 transition-colors relative flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'pathway-flow' ? 'text-[#191817]' : 'text-[#81766D] hover:text-[#191817]'
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#4F8279]" />
            <span>3. Learning Pathway Flowchart</span>
            {activeTab === 'pathway-flow' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#191817]" />}
          </button>

          <button
            onClick={() => setActiveTab('jobs')}
            className={`pb-3 transition-colors relative flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'jobs' ? 'text-[#191817]' : 'text-[#81766D] hover:text-[#191817]'
            }`}
          >
            <Briefcase className="w-4 h-4 text-[#4F8279]" />
            <span>4. Verified Regional Openings</span>
            <span className="px-1.5 py-0.2 bg-[#F3EEE6] text-[#191817] rounded-full text-[10px] font-mono">
              {JOB_REQUISITIONS.length}
            </span>
            {activeTab === 'jobs' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#191817]" />}
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 transition-colors relative flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'profile' ? 'text-[#191817]' : 'text-[#81766D] hover:text-[#191817]'
            }`}
          >
            <User className="w-4 h-4 text-[#4F8279]" />
            <span>5. Portfolio & Declared Skills</span>
            {activeTab === 'profile' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#191817]" />}
          </button>
        </div>

        {/* TAB 1: VISUAL ANALYTICS, PROFICIENCY BARS & DISTRIBUTION */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            
            {/* Top Summary Banner */}
            <div className="p-6 bg-[#FFFFFF] border border-[#E7E1D9] rounded-2xl shadow-xs grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <span className="text-[10px] font-mono text-[#81766D] uppercase block">Assessed Competencies</span>
                <span className="text-3xl font-bold font-serif text-[#191817]">{verifiedAssessments.length}</span>
                <span className="text-[11px] text-[#10B981] font-semibold block mt-0.5">100% Exam Board Verified</span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-[#81766D] uppercase block">Self-Declared Skills</span>
                <span className="text-3xl font-bold font-serif text-[#191817]">{selfDeclaredSkills.length}</span>
                <span className="text-[11px] text-[#81766D] block mt-0.5">Trainee Declared Portfolio</span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-[#81766D] uppercase block">Average Assessment Score</span>
                <span className="text-3xl font-bold font-serif text-[#191817]">
                  {Math.round(verifiedAssessments.reduce((a, b) => a + b.score, 0) / Math.max(1, verifiedAssessments.length))}%
                </span>
                <span className="text-[11px] text-[#10B981] font-semibold block mt-0.5">Distinction Benchmark</span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-[#81766D] uppercase block">Completed Qualifications</span>
                <span className="text-3xl font-bold font-serif text-[#191817]">1</span>
                <span className="text-[11px] text-[#4F8279] block mt-0.5">Govt ITI Machinist (NSQF 4)</span>
              </div>
            </div>

            {/* Visual Analytics Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Chart 1: Skill Proficiency Bar Chart with Assessment Source and Date */}
              <div className="lg:col-span-8 p-6 bg-[#FFFFFF] border border-[#E7E1D9] rounded-2xl space-y-5 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E7E1D9] pb-3">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-[#191817]">
                      Skill Proficiency Breakdown
                    </h3>
                    <p className="text-xs text-[#81766D]">
                      Scores derived from authorized trade theory and workshop practical board examinations.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-1 bg-[#F9F8F3] border border-[#E7E1D9] rounded text-[#81766D]">
                    Scale: 0 - 100 Marks
                  </span>
                </div>

                <div className="space-y-4">
                  {verifiedAssessments.map((item) => (
                    <div key={item.id} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <div>
                          <strong className="text-[#191817] text-sm">{item.skill}</strong>
                          <span className="text-[11px] text-[#81766D] block">
                            Evaluator: {item.assessmentBody} · {item.assessmentDate}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="font-mono font-bold text-sm text-[#191817]">{item.score}/100</span>
                          <span className="text-[10px] font-mono text-[#10B981] font-semibold block uppercase">
                            {item.proficiency}
                          </span>
                        </div>
                      </div>

                      {/* Bar indicator */}
                      <div className="w-full h-3 bg-[#F3EEE6] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#191817] rounded-full transition-all duration-500"
                          style={{ width: `${item.score}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-[#81766D] font-mono">
                        <span>Category: {item.category}</span>
                        <span>Audit Ref: {item.certificateHash}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chart 2: Skill Distribution Donut / Category Breakdown */}
              <div className="lg:col-span-4 p-6 bg-[#FFFFFF] border border-[#E7E1D9] rounded-2xl space-y-5 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="border-b border-[#E7E1D9] pb-3">
                    <h3 className="font-serif font-bold text-lg text-[#191817]">
                      Skill Category Distribution
                    </h3>
                    <p className="text-xs text-[#81766D] mt-0.5">
                      Distribution of recorded skills in portfolio (not a measure of general human competence).
                    </p>
                  </div>

                  <div className="py-6 space-y-3">
                    {Object.entries(categoryCounts).map(([cat, count]) => {
                      const pct = Math.round((count / Math.max(1, totalAssessedSkills)) * 100);
                      return (
                        <div key={cat} className="space-y-1 text-xs">
                          <div className="flex justify-between font-medium">
                            <span className="text-[#191817]">{cat}</span>
                            <span className="font-mono font-bold text-[#81766D]">{pct}% ({count})</span>
                          </div>
                          <div className="w-full h-2 bg-[#F3EEE6] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#4F8279] rounded-full"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Progress Over Time Milestone Card */}
                <div className="p-4 bg-[#F9F8F3] border border-[#E7E1D9] rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#191817]">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#4F8279]" />
                      Progress-Over-Time (Dated Milestones)
                    </span>
                    <span className="text-[10px] font-mono text-[#10B981]">+15% Gain</span>
                  </div>
                  <div className="space-y-1.5 text-[11px] text-[#81766D]">
                    <div className="flex justify-between">
                      <span>Q3 2025: Workshop Safety & Benchwork</span>
                      <strong className="text-[#191817] font-mono">76%</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Q4 2025: Lathe Turning & Blueprint Drafting</span>
                      <strong className="text-[#191817] font-mono">84%</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Q1 2026: G-Code CNC & Digital Metrology</span>
                      <strong className="text-[#10B981] font-mono">91%</strong>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Course Completion Evidence Box */}
            <div className="p-6 bg-[#FFFFFF] border border-[#E7E1D9] rounded-2xl space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#E7E1D9] pb-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#4F8279]" />
                  <h3 className="font-serif font-bold text-base text-[#191817]">
                    Accredited Course Completion Records
                  </h3>
                </div>
                <span className="text-xs font-mono text-[#81766D]">
                  Directorate General of Training (DGT) Validated
                </span>
              </div>

              <div className="p-4 bg-[#F9F8F3] border border-[#E7E1D9] rounded-xl space-y-2 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className="font-serif font-bold text-sm text-[#191817]">
                    Machinist & Precision CNC Operator (NSQF Level 4)
                  </h4>
                  <span className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded font-mono font-semibold text-[11px]">
                    Grade: Distinction (88.4%)
                  </span>
                </div>
                <p className="text-[#81766D]">
                  Institution: Government Industrial Training Institute (ITI) Aundh, Pune · Completed: December 2025
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
                  <span className="px-2 py-0.5 bg-[#FFFFFF] border border-[#E7E1D9] rounded">
                    Conventional Lathe Turning
                  </span>
                  <span className="px-2 py-0.5 bg-[#FFFFFF] border border-[#E7E1D9] rounded">
                    CNC G-Code / M-Code Programming
                  </span>
                  <span className="px-2 py-0.5 bg-[#FFFFFF] border border-[#E7E1D9] rounded">
                    Precision Metrology & GD&T Inspection
                  </span>
                  <span className="px-2 py-0.5 bg-[#FFFFFF] border border-[#E7E1D9] rounded">
                    Industrial Safety & 5S Practices
                  </span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: SKILL-GAP COMPARISON MATRIX & TRANSPARENT READINESS */}
        {activeTab === 'gap-compare' && (
          <div className="space-y-6">
            
            {/* Target Job Selector Bar */}
            <div className="p-4 bg-[#FFFFFF] border border-[#E7E1D9] rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-[#81766D] font-medium">Select Regional Target Position to Evaluate:</span>
                <select
                  value={selectedJobId}
                  onChange={(e) => setSelectedJobId(e.target.value)}
                  className="px-3 py-1.5 bg-[#F9F8F3] border border-[#E7E1D9] rounded-lg font-semibold text-[#191817]"
                >
                  {JOB_REQUISITIONS.map((j) => (
                    <option key={j.id} value={j.id}>
                      {j.title} — {j.employerName} ({j.district})
                    </option>
                  ))}
                </select>
              </div>

              <div className="text-xs text-[#81766D]">
                Monthly Starting Salary: <strong className="text-[#191817] font-mono">{selectedJob.salaryRange}</strong>
              </div>
            </div>

            {/* Real Transparent Skill Coverage Scorecard */}
            <div className="bg-[#FFFFFF] border border-[#E7E1D9] rounded-2xl p-6 sm:p-8 shadow-xs">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Score Formula Display */}
                <div className="lg:col-span-4 text-center p-6 bg-[#F9F8F3] border border-[#E7E1D9] rounded-2xl space-y-3">
                  <span className="text-xs font-semibold text-[#81766D] uppercase block">
                    Transparent Skill Coverage Score
                  </span>
                  <div className="text-5xl font-serif font-bold text-[#191817] font-mono">
                    {coverageAnalysis.baselineCoveragePercent}%
                  </div>
                  <div className="font-mono text-xs text-[#4F8279] font-bold">
                    {coverageAnalysis.matchedCount} of {coverageAnalysis.totalRequired} Required Skills Evidenced
                  </div>
                  <span
                    className={`inline-block px-3 py-1 rounded-md text-xs font-semibold uppercase ${
                      coverageAnalysis.baselineCoveragePercent >= 75
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {coverageAnalysis.readinessLabel}
                  </span>

                  {/* Mathematical Disclosure Formula */}
                  <div className="pt-2 border-t border-[#E7E1D9] text-[10px] text-[#81766D] space-y-1 text-left font-mono">
                    <p className="font-semibold text-[#191817]">Calculation Methodology:</p>
                    <p>Coverage = (Matched Skills / Required Skills) × 100</p>
                    <p className="text-[9px] text-[#81766D] italic">
                      Disclaimer: This percentage represents deterministic verified competency coverage, not an automated guarantee of employment.
                    </p>
                  </div>
                </div>

                {/* Right Details */}
                <div className="lg:col-span-8 space-y-4">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-[#191817]">
                      {selectedJob.title}
                    </h3>
                    <p className="text-xs text-[#81766D] mt-0.5">
                      {selectedJob.employerName} · {selectedJob.district} · {selectedJob.workType} · NSQF Level {selectedJob.nsqfLevel}
                    </p>
                  </div>

                  <p className="text-xs text-[#81766D] leading-relaxed">
                    {coverageAnalysis.explanationSummary}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-1">
                      <span className="font-semibold text-emerald-950 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Verified In Your Portfolio ({coverageAnalysis.matchedCount})
                      </span>
                      <ul className="text-[11px] text-emerald-900 space-y-0.5">
                        {coverageAnalysis.matchedSkills.map((m) => (
                          <li key={m.skill} className="flex items-center justify-between">
                            <span>✓ {m.skill}</span>
                            <span className="font-mono text-[10px] font-semibold">({m.studentProficiency})</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 bg-red-50/60 border border-red-200 rounded-xl space-y-1">
                      <span className="font-semibold text-red-950 flex items-center gap-1.5">
                        <Info className="w-4 h-4 text-red-600" />
                        Deficits Needing Bridge Program ({coverageAnalysis.missingCount})
                      </span>
                      <ul className="text-[11px] text-red-900 space-y-0.5">
                        {coverageAnalysis.missingSkills.map((m) => (
                          <li key={m.skill} className="flex items-center justify-between">
                            <span>✕ {m.skill}</span>
                            <span className="font-mono text-[10px] text-red-700">
                              {m.isMandatory ? 'Mandatory' : 'Preferred'}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* 1-Click Action to Apply or Enroll in Bridge */}
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={() => handleApplyToJob(selectedJob.id, selectedJob.title)}
                      disabled={appliedJobIds[selectedJob.id] !== undefined}
                      className={`px-5 py-2.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-2 ${
                        appliedJobIds[selectedJob.id]
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-[#E2EE58] hover:bg-[#d6e248] text-[#191817]'
                      }`}
                    >
                      <Briefcase className="w-4 h-4" />
                      <span>{appliedJobIds[selectedJob.id] ? 'Application Submitted' : 'Submit Verified Portfolio to Employer'}</span>
                    </button>
                    {applicationSuccess && (
                      <span className="text-xs text-emerald-700 font-semibold">{applicationSuccess}</span>
                    )}
                  </div>
                </div>

              </div>
            </div>

            {/* Detailed Requirement-by-Requirement Table */}
            <div className="p-6 bg-[#FFFFFF] border border-[#E7E1D9] rounded-2xl space-y-4 shadow-xs">
              <h4 className="font-serif font-bold text-base text-[#191817]">
                Itemized Competency Evaluation Breakdown
              </h4>
              <div className="overflow-x-auto border border-[#E7E1D9] rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F9F8F3] border-b border-[#E7E1D9] text-[#81766D] font-mono text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4 font-semibold">Required Industrial Competency</th>
                      <th className="py-2.5 px-4 font-semibold">Target Proficiency</th>
                      <th className="py-2.5 px-4 font-semibold">Your Evidenced Level</th>
                      <th className="py-2.5 px-4 font-semibold">Evidence Verification Source</th>
                      <th className="py-2.5 px-4 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E7E1D9]">
                    {selectedJob.requiredSkills.map((req, idx) => {
                      const match = coverageAnalysis.matchedSkills.find((m) => m.skill === req.skill);
                      return (
                        <tr key={idx} className="hover:bg-[#F9F8F3]">
                          <td className="py-3 px-4 font-semibold text-[#191817]">{req.skill}</td>
                          <td className="py-3 px-4 text-[#81766D] font-mono">{req.proficiency}</td>
                          <td className="py-3 px-4 text-[#191817] font-mono font-medium">
                            {match ? match.studentProficiency : 'No Recorded Evidence'}
                          </td>
                          <td className="py-3 px-4 text-[#81766D]">
                            {match ? (
                              <span className="text-emerald-700 flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                {match.evidenceSource === 'verified_assessment'
                                  ? 'AITT Board Exam Verified'
                                  : 'Course-Derived Portfolio'}
                              </span>
                            ) : (
                              <span className="text-red-700">Deficit: Requires Modular Lab</span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            {match ? (
                              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-semibold text-[10px]">
                                MATCHED
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 bg-red-100 text-red-800 rounded font-semibold text-[10px]">
                                GAP IDENTIFIED
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: STEP-BY-STEP LEARNING PATHWAY FLOWCHART */}
        {activeTab === 'pathway-flow' && (
          <div className="space-y-6">
            <div className="p-6 sm:p-8 bg-[#FFFFFF] border border-[#E7E1D9] rounded-2xl space-y-6 shadow-xs">
              <div className="border-b border-[#E7E1D9] pb-4">
                <span className="text-xs font-mono text-[#4F8279] uppercase font-bold">
                  STRUCTURED BRIDGING PATHWAY
                </span>
                <h3 className="text-xl font-serif font-bold text-[#191817]">
                  From Level 4 ITI Trainee to 5-Axis Precision CNC Machining Specialist
                </h3>
                <p className="text-xs text-[#81766D] mt-1">
                  Sequenced modular pathway based on identified skill gaps and prerequisite relationships.
                </p>
              </div>

              {/* Interactive Flowchart Steps */}
              <div className="space-y-4">
                
                {/* Step 1 */}
                <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-mono font-bold flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif font-bold text-sm text-emerald-950">
                        Step 1: Current Evidenced Competency (Foundational CNC Lathe & G-Code)
                      </h4>
                      <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                        100% Completed
                      </span>
                    </div>
                    <p className="text-xs text-emerald-900">
                      Completed Machinist Trade curriculum at Govt ITI Aundh with 92/100 score in DGT Practical Examination.
                    </p>
                    <div className="text-[11px] text-emerald-800 font-mono pt-1">
                      Validated Credentials: ISO G-Code, Fanuc 0i-TF Turning, Mitutoyo Metrology
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="w-0.5 h-6 bg-[#E7E1D9]"></div>
                </div>

                {/* Step 2 */}
                <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-mono font-bold flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif font-bold text-sm text-emerald-950">
                        Step 2: Foundational Multi-Axis CAM Modeling & Geometric Dimensioning
                      </h4>
                      <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                        100% Completed
                      </span>
                    </div>
                    <p className="text-xs text-emerald-900">
                      Mastered CAD 3D modeling and ASME Y14.5M GD&T symbols required for precision aerospace part prints.
                    </p>
                    <div className="text-[11px] text-emerald-800 font-mono pt-1">
                      Validated Credentials: NX CAD Basics, True Position Tolerance
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="w-0.5 h-6 bg-[#E7E1D9]"></div>
                </div>

                {/* Step 3 */}
                <div className="p-4 bg-amber-50/70 border border-amber-300 rounded-xl flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-amber-600 text-white font-mono font-bold flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif font-bold text-sm text-amber-950">
                        Step 3: Targeted Practice: Mastercam 5-Axis Continuous CAM Simulation
                      </h4>
                      <span className="text-xs font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                        45% In Progress
                      </span>
                    </div>
                    <p className="text-xs text-amber-900">
                      Bridge module at Govt ITI Aundh Advanced Machining CoE. Learning multi-axis collision avoidance and digital twin verification.
                    </p>
                    <div className="text-[11px] text-amber-800 font-mono pt-1">
                      Batch: MWF Evening Cohort · Practical Hours Remaining: 24 hrs
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="w-0.5 h-6 bg-[#E7E1D9]"></div>
                </div>

                {/* Step 4 */}
                <div className="p-4 bg-[#F9F8F3] border border-[#E7E1D9] rounded-xl flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#81766D] text-white font-mono font-bold flex items-center justify-center shrink-0">
                    4
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif font-bold text-sm text-[#191817]">
                        Step 4: Practical Assessment & CMM Touch-Probe Calibration
                      </h4>
                      <span className="text-xs font-semibold text-[#81766D] bg-[#F3EEE6] px-2 py-0.5 rounded">
                        Upcoming Milestone
                      </span>
                    </div>
                    <p className="text-xs text-[#81766D]">
                      Independent workshop test on DMG MORI 5-axis machining center. Cutting test impeller part within 5-micron tolerance.
                    </p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="w-0.5 h-6 bg-[#E7E1D9]"></div>
                </div>

                {/* Step 5 */}
                <div className="p-4 bg-[#191817] text-[#F9F8F3] rounded-xl flex items-start gap-4 shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-[#E2EE58] text-[#191817] font-mono font-bold flex items-center justify-center shrink-0">
                    5
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif font-bold text-sm text-[#F9F8F3]">
                        Step 5: Immediate Deployment: Tata Motors Grade T3 Placement
                      </h4>
                      <span className="text-xs font-semibold text-[#191817] bg-[#E2EE58] px-2 py-0.5 rounded font-mono">
                        Target Placement
                      </span>
                    </div>
                    <p className="text-xs text-[#DCD5CB]">
                      Direct campus requisition at Pimpri Hub with starting monthly compensation ₹32,000 - ₹38,000/mo.
                    </p>
                  </div>
                </div>

              </div>

              {/* Action Banner */}
              <div className="p-4 bg-[#F9F8F3] border border-[#E7E1D9] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-[#81766D]">
                  Need lab machine practice time? Book an accredited CNC station at ITI Aundh CoE.
                </span>
                <button
                  onClick={() => {
                    setPathwayActionSuccess('Lab reservation confirmed for Saturday 10:00 AM at ITI Aundh CNC Lab 2.');
                    setTimeout(() => setPathwayActionSuccess(null), 5000);
                  }}
                  className="px-4 py-2 bg-[#191817] hover:bg-[#2A2928] text-[#F9F8F3] text-xs font-semibold rounded-md transition-colors whitespace-nowrap"
                >
                  Reserve CNC Machine Station
                </button>
              </div>
              {pathwayActionSuccess && (
                <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-semibold">
                  {pathwayActionSuccess}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: VERIFIED REGIONAL JOB OPENINGS */}
        {activeTab === 'jobs' && (
          <div className="space-y-6">
            <div className="p-6 bg-[#FFFFFF] border border-[#E7E1D9] rounded-2xl space-y-4 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E7E1D9] pb-3">
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#191817]">
                    Live Regional Job Match Feed
                  </h3>
                  <p className="text-xs text-[#81766D]">
                    Real employer vacancies filtered by geographical proximity and NSQF alignment in western Maharashtra.
                  </p>
                </div>
                <span className="text-xs font-mono text-[#81766D]">{JOB_REQUISITIONS.length} Verified Listings</span>
              </div>

              <div className="space-y-4">
                {JOB_REQUISITIONS.map((job) => {
                  const jobCoverage = calculateSkillsCoverage(job.title, job.employerName, job.requiredSkills, demonstratedSkills);
                  const isApplied = appliedJobIds[job.id] !== undefined;

                  return (
                    <div
                      key={job.id}
                      className="p-5 bg-[#F9F8F3] border border-[#E7E1D9] rounded-xl hover:border-[#191817] transition-all space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <span className="text-[10px] uppercase font-mono text-[#4F8279] font-bold">
                            {job.sector} · NSQF Level {job.nsqfLevel}
                          </span>
                          <h4 className="font-serif font-bold text-base text-[#191817]">
                            {job.title}
                          </h4>
                          <span className="text-xs text-[#81766D] font-medium">
                            {job.employerName} · {job.district} · {job.salaryRange}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <span className="text-xs font-mono font-bold text-[#191817] block">
                              {jobCoverage.baselineCoveragePercent}% Match
                            </span>
                            <span className="text-[10px] text-[#10B981] font-semibold">
                              {jobCoverage.matchedCount}/{jobCoverage.totalRequired} Skills
                            </span>
                          </div>
                          <button
                            onClick={() => handleApplyToJob(job.id, job.title)}
                            disabled={isApplied}
                            className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors ${
                              isApplied
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-[#191817] text-[#F9F8F3] hover:bg-[#2A2928]'
                            }`}
                          >
                            {isApplied ? 'Application Sent' : 'Apply Now'}
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-[#81766D] leading-relaxed">
                        {job.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#E7E1D9] text-[11px]">
                        <span className="text-[#81766D]">Required:</span>
                        {job.requiredSkills.map((s, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-[#FFFFFF] border border-[#E7E1D9] rounded font-mono text-[#191817]"
                          >
                            {s.skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: PORTFOLIO & DECLARED SKILLS */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="p-6 bg-[#FFFFFF] border border-[#E7E1D9] rounded-2xl space-y-6 shadow-xs">
              <div className="border-b border-[#E7E1D9] pb-4">
                <h3 className="font-serif font-bold text-lg text-[#191817]">
                  Add Self-Declared Competency
                </h3>
                <p className="text-xs text-[#81766D]">
                  Declare additional workshop skills. Note: Self-declared skills remain distinct from examination-board verified skills.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleAddSkill} className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div className="sm:col-span-6 space-y-1">
                  <label className="text-xs font-semibold text-[#191817]">Skill Name</label>
                  <input
                    type="text"
                    value={newSkillInput}
                    onChange={(e) => setNewSkillInput(e.target.value)}
                    placeholder="e.g. Mastercam 3D Surface Toolpaths"
                    className="w-full px-3.5 py-2 text-xs bg-[#F9F8F3] border border-[#E7E1D9] rounded-lg focus:outline-none focus:border-[#191817]"
                  />
                </div>

                <div className="sm:col-span-3 space-y-1">
                  <label className="text-xs font-semibold text-[#191817]">Category</label>
                  <select
                    value={newSkillCategory}
                    onChange={(e) => setNewSkillCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-[#F9F8F3] border border-[#E7E1D9] rounded-lg focus:outline-none focus:border-[#191817]"
                  >
                    <option value="Technical">Technical</option>
                    <option value="Tools & Machines">Tools & Machines</option>
                    <option value="Metrology & Quality">Metrology & Quality</option>
                    <option value="Safety & Industrial Protocols">Safety & Industrial Protocols</option>
                  </select>
                </div>

                <div className="sm:col-span-3 space-y-1">
                  <label className="text-xs font-semibold text-[#191817]">Self-Assessed Level</label>
                  <select
                    value={newSkillProficiency}
                    onChange={(e) => setNewSkillProficiency(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-[#F9F8F3] border border-[#E7E1D9] rounded-lg focus:outline-none focus:border-[#191817]"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div className="sm:col-span-12 flex items-center justify-between pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#191817] hover:bg-[#2A2928] text-[#F9F8F3] text-xs font-semibold rounded-md transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add to Competencies</span>
                  </button>

                  {skillAddedSuccess && (
                    <span className="text-xs text-emerald-700 font-semibold">{skillAddedSuccess}</span>
                  )}
                </div>
              </form>

              {/* Current Declared List */}
              <div className="pt-4 border-t border-[#E7E1D9] space-y-3">
                <h4 className="text-xs font-serif font-bold text-[#191817]">
                  All Recorded Portfolio Competencies ({demonstratedSkills.length})
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {demonstratedSkills.map((sk, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#F9F8F3] border border-[#E7E1D9] rounded-xl text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <strong className="text-[#191817]">{sk.skill}</strong>
                        <span className="text-[10px] font-mono text-[#81766D] font-semibold">{sk.proficiency}</span>
                      </div>
                      <div className="text-[10px] text-[#81766D] flex items-center gap-1">
                        {sk.evidenceSource === 'verified_assessment' ? (
                          <span className="text-[#10B981] font-semibold flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" />
                            Exam Board Verified ({sk.verifiedScore}/100)
                          </span>
                        ) : (
                          <span className="text-[#81766D]">Self-Declared Trainee Skill</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
