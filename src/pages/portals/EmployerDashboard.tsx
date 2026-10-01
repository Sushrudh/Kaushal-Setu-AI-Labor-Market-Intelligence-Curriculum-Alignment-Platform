import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { JOB_REQUISITIONS, COURSE_SYLLABUS_DIFFS, CANDIDATES } from '../../data/mockData';
import { JobRequisition, CourseSyllabusDiff, CandidateProfile } from '../../types';
import { extractSkillsFromJobDescription } from '../../services/geminiService';
import {
  Factory,
  PlusCircle,
  GitPullRequest,
  CheckCircle2,
  Users,
  Search,
  ArrowRight,
  Sparkles,
  FileCode,
  ShieldCheck,
  Send,
  MessageSquare,
} from 'lucide-react';

export const EmployerDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'diff' | 'jobs' | 'post-job' | 'talent'>('diff');

  // State for jobs
  const [jobList, setJobList] = useState<JobRequisition[]>(JOB_REQUISITIONS);
  const [syllabusDiffs, setSyllabusDiffs] = useState<CourseSyllabusDiff[]>(COURSE_SYLLABUS_DIFFS);
  const [selectedDiffIndex, setSelectedDiffIndex] = useState(0);

  // Endorsement form state
  const [endorsementFeedback, setEndorsementFeedback] = useState('');
  const [endorsementSuccess, setEndorsementSuccess] = useState<string | null>(null);

  // New Job Description Form state
  const [unstructuredText, setUnstructuredText] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [jobOpenings, setJobOpenings] = useState(12);
  const [jobSalary, setJobSalary] = useState('₹28,000 - ₹36,000 / mo');
  const [jobNsqfLevel, setJobNsqfLevel] = useState(4);
  const [extractedSkills, setExtractedSkills] = useState<{ skill: string; proficiency: 'Beginner' | 'Intermediate' | 'Advanced'; isMandatory: boolean }[]>([]);
  const [postJobSuccess, setPostJobSuccess] = useState<string | null>(null);

  // Talent filter state
  const [talentSearch, setTalentSearch] = useState('');
  const [talentAvailability, setTalentAvailability] = useState<string>('all');
  const [requestedInterviews, setRequestedInterviews] = useState<Record<string, boolean>>({});
  const [interviewSuccess, setInterviewSuccess] = useState<string | null>(null);

  const handleRequestInterview = (candidateId: string, candidateName: string) => {
    setRequestedInterviews((prev) => ({
      ...prev,
      [candidateId]: true,
    }));
    setInterviewSuccess(`Formal interview invitation dispatched to ${candidateName} via accredited ITI placement cell!`);
    setTimeout(() => setInterviewSuccess(null), 5000);
  };

  const activeDiff = syllabusDiffs[selectedDiffIndex] || syllabusDiffs[0];

  // Handle AI Skill Extraction from unstructured text
  const handleExtractSkills = async () => {
    if (!unstructuredText.trim()) return;
    setIsExtracting(true);
    try {
      const result = await extractSkillsFromJobDescription(unstructuredText);
      setJobTitle(result.extractedTitle);
      setJobNsqfLevel(result.nsqfLevel);
      setExtractedSkills(result.extractedSkills);
    } catch (err) {
      console.error('Skill extraction failed:', err);
    } finally {
      setIsExtracting(false);
    }
  };

  // Submit Job Requisition
  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    const newJob: JobRequisition = {
      id: `job_${Date.now()}`,
      employerId: currentUser?.id || 'usr_emp_tata',
      employerName: currentUser?.organization || 'Tata Motors Precision Components Hub',
      district: currentUser?.district || 'Pune',
      title: jobTitle || 'Precision CNC Machining Specialist',
      sector: 'Automotive & Precision Manufacturing',
      nsqfLevel: jobNsqfLevel,
      openings: jobOpenings,
      experienceMonths: 6,
      salaryRange: jobSalary,
      description: unstructuredText || 'Operate high precision machinery in accordance with ISO quality standards.',
      requiredSkills: extractedSkills.length > 0 ? extractedSkills : [
        { skill: '5-Axis CNC Milling & CAM', proficiency: 'Intermediate', isMandatory: true },
        { skill: 'G-Code Programming', proficiency: 'Advanced', isMandatory: true }
      ],
      postedDate: new Date().toISOString().split('T')[0],
      status: 'active',
      workType: 'Full-time',
    };

    setJobList([newJob, ...jobList]);
    setPostJobSuccess(`Job requisition "${newJob.title}" (${newJob.openings} openings) published to Kaushal Setu network!`);
    setUnstructuredText('');
    setJobTitle('');
    setExtractedSkills([]);
    setTimeout(() => {
      setPostJobSuccess(null);
      setActiveTab('jobs');
    }, 2000);
  };

  // 1-Click Employer Endorsement Sign-Off
  const handleEndorseSyllabus = () => {
    const endorserName = currentUser?.name || 'Ananya Sen';
    const employerOrg = currentUser?.organization || 'Tata Motors Precision Components Hub';
    const timestamp = new Date().toISOString();
    const mockHash = `SHA256:${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`;

    const updatedDiff: CourseSyllabusDiff = {
      ...activeDiff,
      status: 'endorsed',
      endorsements: [
        ...activeDiff.endorsements,
        {
          employerId: currentUser?.id || 'usr_emp_tata',
          employerName: employerOrg,
          endorserName: endorserName,
          date: timestamp,
          feedback: endorsementFeedback || 'Formally approved. We commit to priority campus interviews for trainees completing these updated modules.',
          signatureHash: mockHash,
        },
      ],
    };

    const newDiffs = [...syllabusDiffs];
    newDiffs[selectedDiffIndex] = updatedDiff;
    setSyllabusDiffs(newDiffs);
    setEndorsementSuccess(`Successfully recorded verified employer endorsement for "${activeDiff.courseTitle}". Digital signature hash: ${mockHash}`);
    setEndorsementFeedback('');
    setTimeout(() => setEndorsementSuccess(null), 6000);
  };

  // Filter candidates
  const filteredCandidates = CANDIDATES.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(talentSearch.toLowerCase()) ||
      c.trade.toLowerCase().includes(talentSearch.toLowerCase()) ||
      c.skills.some((s) => s.skill.toLowerCase().includes(talentSearch.toLowerCase()));
    const matchesAvail = talentAvailability === 'all' || c.availability === talentAvailability;
    return matchesSearch && matchesAvail;
  });

  return (
    <div className="bg-[#F8F5F0] min-h-screen py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Breadcrumb */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E7E1D9]">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#81766D] mb-1">
              <span>Industry Network</span>
              <span>/</span>
              <span>Regional Employer Portal</span>
              <span>/</span>
              <span className="text-[#191817] font-semibold">{currentUser?.organization || 'Tata Motors Components'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#191817]">
              Industry-Academia Collaboration & Syllabus Approval
            </h1>
            <p className="text-xs text-[#81766D] mt-0.5">
              Logged in as: <strong className="text-[#191817]">{currentUser?.name || 'Ananya Sen'}</strong> · {currentUser?.designation || 'Head of Technical Talent Acquisition'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('post-job')}
              className="px-4 py-2.5 bg-[#F5ED78] hover:bg-[#eae162] text-[#191817] text-xs font-semibold rounded-md transition-colors flex items-center gap-2 shadow-xs"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post Hiring Requisition</span>
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-[#E7E1D9] gap-6 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('diff')}
            className={`pb-3 transition-colors relative flex items-center gap-2 ${
              activeTab === 'diff' ? 'text-[#191817]' : 'text-[#81766D] hover:text-[#191817]'
            }`}
          >
            <GitPullRequest className="w-4 h-4 text-[#4F8279]" />
            <span>GitHub-Style Syllabus Diff Engine</span>
            <span className="px-1.5 py-0.2 bg-[#F3EEE6] text-[#191817] rounded-full text-[10px]">
              {syllabusDiffs.length}
            </span>
            {activeTab === 'diff' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#191817]" />}
          </button>

          <button
            onClick={() => setActiveTab('jobs')}
            className={`pb-3 transition-colors relative flex items-center gap-2 ${
              activeTab === 'jobs' ? 'text-[#191817]' : 'text-[#81766D] hover:text-[#191817]'
            }`}
          >
            <Factory className="w-4 h-4 text-[#765033]" />
            <span>Active Job Requisitions</span>
            <span className="px-1.5 py-0.2 bg-[#F3EEE6] text-[#191817] rounded-full text-[10px]">
              {jobList.length}
            </span>
            {activeTab === 'jobs' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#191817]" />}
          </button>

          <button
            onClick={() => setActiveTab('post-job')}
            className={`pb-3 transition-colors relative flex items-center gap-2 ${
              activeTab === 'post-job' ? 'text-[#191817]' : 'text-[#81766D] hover:text-[#191817]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#4F8279]" />
            <span>AI Job Description Skill Parser</span>
            {activeTab === 'post-job' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#191817]" />}
          </button>

          <button
            onClick={() => setActiveTab('talent')}
            className={`pb-3 transition-colors relative flex items-center gap-2 ${
              activeTab === 'talent' ? 'text-[#191817]' : 'text-[#81766D] hover:text-[#191817]'
            }`}
          >
            <Users className="w-4 h-4 text-[#191817]" />
            <span>Talent Proximity Discovery</span>
            {activeTab === 'talent' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#191817]" />}
          </button>
        </div>

        {/* TAB 1: GITHUB-STYLE SYLLABUS DIFF ENGINE */}
        {activeTab === 'diff' && (
          <div className="space-y-6">
            {endorsementSuccess && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  {endorsementSuccess}
                </span>
                <button onClick={() => setEndorsementSuccess(null)} className="font-semibold">
                  Dismiss
                </button>
              </div>
            )}

            {/* Course Selector */}
            <div className="flex flex-wrap items-center gap-2 pb-2">
              <span className="text-xs text-[#81766D]">Reviewing Curriculum Proposal:</span>
              {syllabusDiffs.map((diff, idx) => (
                <button
                  key={diff.courseId}
                  onClick={() => setSelectedDiffIndex(idx)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    selectedDiffIndex === idx
                      ? 'bg-[#191817] text-[#F8F5F0]'
                      : 'bg-[#FFFFFF] border border-[#E7E1D9] text-[#81766D] hover:text-[#191817]'
                  }`}
                >
                  {diff.courseTitle} ({diff.proposedVersion})
                </button>
              ))}
            </div>

            {/* Main Diff Display Box */}
            <div className="bg-[#FFFFFF] border border-[#E7E1D9] rounded-2xl overflow-hidden shadow-xs">
              {/* Diff Header Bar */}
              <div className="p-6 bg-[#F8F5F0] border-b border-[#E7E1D9] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#81766D] mb-1 font-mono">
                    <GitPullRequest className="w-3.5 h-3.5 text-[#4F8279]" />
                    <span>{activeDiff.institutionName}</span>
                    <span>·</span>
                    <span>Branch: {activeDiff.currentVersion} → {activeDiff.proposedVersion}</span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#191817]">
                    {activeDiff.courseTitle}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-md uppercase tracking-wider ${
                      activeDiff.status === 'endorsed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {activeDiff.status === 'endorsed' ? 'Industry Endorsed' : 'Awaiting Employer Review'}
                  </span>
                </div>
              </div>

              {/* Diff Visual Legend */}
              <div className="px-6 py-3 bg-[#FFFFFF] border-b border-[#E7E1D9] flex items-center justify-between text-xs text-[#81766D]">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-emerald-500"></span>
                    <strong className="text-[#191817]">Green</strong> = Proposed Modern Skill Addition
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-red-500"></span>
                    <strong className="text-[#191817]">Red</strong> = Phased-Out Obsolete Module
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-amber-500"></span>
                    <strong className="text-[#191817]">Amber</strong> = Upgraded Controller Spec
                  </span>
                </div>
                <span className="font-mono text-[11px]">
                  {activeDiff.modules.length} Modules in Diff Tree
                </span>
              </div>

              {/* Side-by-side / Unified GitHub Style Module Comparison */}
              <div className="divide-y divide-[#E7E1D9] text-xs">
                {activeDiff.modules.map((mod) => {
                  let bgColor = 'bg-[#FFFFFF]';
                  let prefix = ' ';
                  let statusBadge = 'Existing Core';

                  if (mod.status === 'added') {
                    bgColor = 'bg-emerald-50/70';
                    prefix = '+';
                    statusBadge = 'PROPOSED ADDITION';
                  } else if (mod.status === 'removed') {
                    bgColor = 'bg-red-50/70';
                    prefix = '-';
                    statusBadge = 'PHASED OUT / REMOVED';
                  } else if (mod.status === 'modified') {
                    bgColor = 'bg-amber-50/60';
                    prefix = '~';
                    statusBadge = 'SPECIFICATION UPGRADED';
                  }

                  return (
                    <div key={mod.id} className={`p-5 transition-colors ${bgColor}`}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-sm w-4">{prefix}</span>
                            <h4 className="font-serif font-bold text-sm text-[#191817]">
                              {mod.title}
                            </h4>
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded font-mono font-semibold ${
                                mod.status === 'added'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : mod.status === 'removed'
                                  ? 'bg-red-100 text-red-800'
                                  : mod.status === 'modified'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-neutral-100 text-neutral-700'
                              }`}
                            >
                              {statusBadge}
                            </span>
                          </div>

                          <p className="text-xs text-[#81766D] pl-6 leading-relaxed">
                            {mod.description}
                          </p>

                          {mod.changeRationale && (
                            <div className="mt-2 pl-6 text-[11px] text-[#765033] bg-[#F8F5F0] p-2 rounded border border-[#E7E1D9]">
                              <strong>Industrial Rationale:</strong> {mod.changeRationale}
                            </div>
                          )}
                        </div>

                        <div className="text-right text-[11px] font-mono text-[#81766D] shrink-0">
                          <div>Theory: {mod.theoryHours}h</div>
                          <div>Practical: {mod.practicalHours}h</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Employer Endorsement Section */}
              <div className="p-6 bg-[#F8F5F0] border-t border-[#E7E1D9] space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-serif font-bold text-[#191817] flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#4F8279]" />
                    Employer Review & Digital Endorsement
                  </h4>
                  <span className="text-xs text-[#81766D]">
                    Authenticated Actor: {currentUser?.name || 'Ananya Sen'} ({currentUser?.organization || 'Tata Motors'})
                  </span>
                </div>

                <div className="space-y-3">
                  <label className="block text-xs font-medium text-[#191817]">
                    Feedback Notes & Hiring Commitment (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={endorsementFeedback}
                    onChange={(e) => setEndorsementFeedback(e.target.value)}
                    placeholder="e.g. We endorse these modules and agree to offer direct technical apprentice interviews for the graduating batch..."
                    className="w-full px-3 py-2 text-xs bg-[#FFFFFF] border border-[#E7E1D9] rounded-lg focus:outline-hidden focus:border-[#191817]"
                  ></textarea>

                  <div className="flex items-center justify-between pt-1">
                    <p className="text-[11px] text-[#81766D]">
                      Endorsement commits your organization's digital review to the state curriculum audit trail.
                    </p>
                    <button
                      onClick={handleEndorseSyllabus}
                      className="px-5 py-2.5 bg-[#F5ED78] hover:bg-[#eae162] text-[#191817] text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 shadow-xs whitespace-nowrap"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Approve & Digitally Endorse Syllabus</span>
                    </button>
                  </div>
                </div>

                {/* Existing Endorsements History */}
                {activeDiff.endorsements.length > 0 && (
                  <div className="pt-4 border-t border-[#E7E1D9]">
                    <span className="text-xs font-semibold text-[#81766D] uppercase tracking-wider block mb-2">
                      Verified Sign-Off Log ({activeDiff.endorsements.length})
                    </span>
                    <div className="space-y-2">
                      {activeDiff.endorsements.map((end, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-[#FFFFFF] border border-[#E7E1D9] rounded-lg text-xs space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-[#191817]">
                              {end.employerName} · {end.endorserName}
                            </span>
                            <span className="text-[10px] font-mono text-[#4F8279]">
                              {end.signatureHash}
                            </span>
                          </div>
                          <p className="text-[#81766D] text-[11px] italic">"{end.feedback}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ACTIVE JOB REQUISITIONS */}
        {activeTab === 'jobs' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2">
              <div>
                <h3 className="text-lg font-serif font-bold text-[#191817]">
                  Published Industry Job Requisitions
                </h3>
                <p className="text-xs text-[#81766D]">
                  These requisitions directly feed the district skill deficit algorithms and ITI syllabus gap engines.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('post-job')}
                className="px-3 py-1.5 bg-[#191817] text-[#F8F5F0] text-xs font-semibold rounded-md"
              >
                + New Requisition
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {jobList.map((job) => (
                <div
                  key={job.id}
                  className="p-5 bg-[#FFFFFF] border border-[#E7E1D9] rounded-xl space-y-3 shadow-xs hover:border-[#191817] transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-[#4F8279] uppercase">
                        {job.employerName} · {job.district}
                      </span>
                      <h4 className="text-base font-serif font-bold text-[#191817] mt-0.5">
                        {job.title}
                      </h4>
                    </div>
                    <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-50 text-emerald-800 rounded">
                      {job.openings} Openings
                    </span>
                  </div>

                  <p className="text-xs text-[#81766D] line-clamp-2 leading-relaxed">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {job.requiredSkills.map((req, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-[#F8F5F0] border border-[#E7E1D9] rounded text-[11px] text-[#191817]"
                      >
                        {req.skill} ({req.proficiency})
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-[#E7E1D9] flex items-center justify-between text-xs text-[#81766D]">
                    <span className="font-mono text-[#191817] font-semibold">{job.salaryRange}</span>
                    <span>Posted: {job.postedDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: AI JOB DESCRIPTION SKILL PARSER */}
        {activeTab === 'post-job' && (
          <div className="max-w-3xl mx-auto bg-[#FFFFFF] border border-[#E7E1D9] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <span className="text-xs font-semibold text-[#4F8279] uppercase tracking-wider block">
                NLP Competency Extraction
              </span>
              <h3 className="text-xl font-serif font-bold text-[#191817] mt-0.5">
                AI Job Description Skill Extractor & Requisition Form
              </h3>
              <p className="text-xs text-[#81766D] mt-1 leading-relaxed">
                Paste an unstructured factory job posting or technical draft. Our engine extracts standardized NSQF competencies and populates the structured hiring survey.
              </p>
            </div>

            {postJobSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg">
                {postJobSuccess}
              </div>
            )}

            <div className="space-y-3">
              <label className="block text-xs font-semibold text-[#191817]">
                Paste Unstructured Job Description or Factory Requisition
              </label>
              <textarea
                rows={5}
                value={unstructuredText}
                onChange={(e) => setUnstructuredText(e.target.value)}
                placeholder="Example: We are looking for 15 CNC Milling Specialists for our Pune plant. Must know Siemens 828D control, 5-axis CAM toolpaths using Mastercam, G-code canned cycles, and CMM metrology inspection. 1 year experience preferred. Starting salary ₹32,000/mo."
                className="w-full px-3 py-2 text-xs bg-[#F8F5F0] border border-[#E7E1D9] rounded-xl focus:outline-hidden focus:border-[#191817]"
              ></textarea>

              <button
                type="button"
                onClick={handleExtractSkills}
                disabled={isExtracting || !unstructuredText.trim()}
                className="px-4 py-2 bg-[#191817] hover:bg-[#2C2B29] text-[#F8F5F0] text-xs font-semibold rounded-lg transition-colors flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#F5ED78]" />
                <span>{isExtracting ? 'Extracting NSQF Competencies...' : 'Extract Technical Skills with AI'}</span>
              </button>
            </div>

            {/* Structured Form */}
            <form onSubmit={handlePostJob} className="pt-4 border-t border-[#E7E1D9] space-y-4">
              <h4 className="text-sm font-serif font-bold text-[#191817]">
                Structured Requisition Attributes
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#191817] mb-1">
                    Job Title / Role
                  </label>
                  <input
                    type="text"
                    required
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g. 5-Axis CNC Milling Specialist"
                    className="w-full px-3 py-2 text-xs bg-[#F8F5F0] border border-[#E7E1D9] rounded-lg focus:outline-hidden focus:border-[#191817]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#191817] mb-1">
                    Open Vacancies (Count)
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={jobOpenings}
                    onChange={(e) => setJobOpenings(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-[#F8F5F0] border border-[#E7E1D9] rounded-lg focus:outline-hidden focus:border-[#191817]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#191817] mb-1">
                    Compensation Range
                  </label>
                  <input
                    type="text"
                    value={jobSalary}
                    onChange={(e) => setJobSalary(e.target.value)}
                    placeholder="₹28,000 - ₹36,000 / month"
                    className="w-full px-3 py-2 text-xs bg-[#F8F5F0] border border-[#E7E1D9] rounded-lg focus:outline-hidden focus:border-[#191817]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#191817] mb-1">
                    Target NSQF Level
                  </label>
                  <select
                    value={jobNsqfLevel}
                    onChange={(e) => setJobNsqfLevel(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-[#F8F5F0] border border-[#E7E1D9] rounded-lg focus:outline-hidden focus:border-[#191817]"
                  >
                    <option value={4}>NSQF Level 4 (ITI Machinist / Fitter)</option>
                    <option value={5}>NSQF Level 5 (Specialist Technician / Diploma)</option>
                    <option value={6}>NSQF Level 6 (Advanced Automation / Mechatronics)</option>
                  </select>
                </div>
              </div>

              {/* Extracted Skills List */}
              {extractedSkills.length > 0 && (
                <div>
                  <label className="block text-xs font-medium text-[#191817] mb-2">
                    Extracted Mandatory Competencies ({extractedSkills.length})
                  </label>
                  <div className="space-y-1.5">
                    {extractedSkills.map((sk, idx) => (
                      <div
                        key={idx}
                        className="p-2 bg-[#F8F5F0] border border-[#E7E1D9] rounded flex items-center justify-between text-xs"
                      >
                        <span className="font-medium text-[#191817]">{sk.skill}</span>
                        <span className="text-[10px] text-[#4F8279] font-mono font-semibold">
                          {sk.proficiency} Proficiency
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#F5ED78] hover:bg-[#eae162] text-[#191817] text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Publish Requisition to District Network</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: TALENT PROXIMITY DISCOVERY */}
        {activeTab === 'talent' && (
          <div className="space-y-6">
            {interviewSuccess && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  {interviewSuccess}
                </span>
                <button onClick={() => setInterviewSuccess(null)} className="font-semibold">
                  Dismiss
                </button>
              </div>
            )}

            <div className="bg-[#FFFFFF] border border-[#E7E1D9] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-[#81766D] absolute left-3 top-3" />
                <input
                  type="text"
                  value={talentSearch}
                  onChange={(e) => setTalentSearch(e.target.value)}
                  placeholder="Filter candidates by skill, trade, or name..."
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[#F8F5F0] border border-[#E7E1D9] rounded-lg focus:outline-hidden focus:border-[#191817]"
                />
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-[#81766D]">Availability:</span>
                <select
                  value={talentAvailability}
                  onChange={(e) => setTalentAvailability(e.target.value)}
                  className="px-2.5 py-1.5 bg-[#F8F5F0] border border-[#E7E1D9] rounded-lg text-xs"
                >
                  <option value="all">All Available</option>
                  <option value="Immediate">Immediate</option>
                  <option value="Within 15 Days">Within 15 Days</option>
                  <option value="Within 30 Days">Within 30 Days</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCandidates.map((cand) => (
                <div
                  key={cand.id}
                  className="p-5 bg-[#FFFFFF] border border-[#E7E1D9] rounded-xl space-y-3 shadow-xs hover:border-[#191817] transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif font-bold text-base text-[#191817]">
                          {cand.name}
                        </h4>
                        <span className="text-[10px] px-2 py-0.5 bg-[#F3EEE6] text-[#191817] rounded font-semibold">
                          Level {cand.nsqfLevel}
                        </span>
                      </div>
                      <span className="text-xs text-[#81766D] block mt-0.5">
                        {cand.trade} · {cand.institutionName} ({cand.completionYear})
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-[#4F8279] bg-emerald-50 px-2 py-1 rounded block">
                        {cand.proximityMatchScore}% Match
                      </span>
                      <span className="text-[10px] text-[#81766D] mt-0.5 block">
                        {cand.availability}
                      </span>
                    </div>
                  </div>

                  {/* Skills badges */}
                  <div className="space-y-1">
                    <span className="text-[11px] text-[#81766D] font-medium block">
                      Assessed Technical Proficiencies:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cand.skills.map((sk, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-[#F8F5F0] border border-[#E7E1D9] rounded text-[11px] text-[#191817]"
                        >
                          {sk.skill} ({'★'.repeat(sk.rating)})
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#E7E1D9] flex items-center justify-between text-xs">
                    <div className="flex gap-1.5">
                      {cand.verifiedBadges.map((b) => (
                        <span key={b} className="text-[10px] text-[#765033] font-semibold">
                          ✓ {b}
                        </span>
                      ))}
                    </div>
                    {requestedInterviews[cand.id] ? (
                      <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                        ✓ Interview Requested
                      </span>
                    ) : (
                      <button
                        onClick={() => handleRequestInterview(cand.id, cand.name)}
                        className="text-[11px] font-semibold text-[#191817] hover:text-[#4F8279] flex items-center gap-1 transition-colors"
                      >
                        <span>Request Interview</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
