import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { NSQF_COURSES, TRAINER_RECORDS, COURSE_SYLLABUS_DIFFS, DISTRICT_SKILL_DATA } from '../../data/mockData';
import { NsqfCourse, TrainerUpskillingRecord, SyllabusModule } from '../../types';
import { calculate4AxisDemandScore, suggestNsqfModule } from '../../services/geminiService';
import {
  GraduationCap,
  BookOpen,
  TrendingUp,
  Sparkles,
  Users,
  CheckCircle2,
  AlertTriangle,
  Plus,
  History,
  FileEdit,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

export const InstitutionDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'catalog' | 'gap-engine' | 'editor' | 'trainers'>('gap-engine');

  // Courses and selected course for gap engine
  const [courses] = useState<NsqfCourse[]>(NSQF_COURSES);
  const [selectedCourse, setSelectedCourse] = useState<NsqfCourse>(NSQF_COURSES[0]);
  const [selectedDistrict, setSelectedDistrict] = useState(DISTRICT_SKILL_DATA[0]);

  // Trainer records
  const [trainerList, setTrainerList] = useState<TrainerUpskillingRecord[]>(TRAINER_RECORDS);
  const [fellowshipSuccess, setFellowshipSuccess] = useState<string | null>(null);

  const handleAdvanceFellowship = (trainerId: string) => {
    setTrainerList((prev) =>
      prev.map((t) => {
        if (t.id !== trainerId) return t;
        let nextStatus: 'Action Needed' | 'In Progress' | 'Completed' = 'In Progress';
        if (t.upskillingStatus === 'Action Needed') nextStatus = 'In Progress';
        else if (t.upskillingStatus === 'In Progress') nextStatus = 'Completed';
        else nextStatus = 'Action Needed';

        setFellowshipSuccess(
          `Updated fellowship status for ${t.trainerName}: marked as "${nextStatus}" for module "${t.targetModule}".`
        );
        setTimeout(() => setFellowshipSuccess(null), 5000);

        return {
          ...t,
          upskillingStatus: nextStatus,
        };
      })
    );
  };

  // Syllabus Editor State
  const [activeModules, setActiveModules] = useState<SyllabusModule[]>(
    COURSE_SYLLABUS_DIFFS[0].modules
  );
  const [isAiSuggesting, setIsAiSuggesting] = useState(false);
  const [aiSuggestedModule, setAiSuggestedModule] = useState<{
    title: string;
    theoryHours: number;
    practicalHours: number;
    description: string;
    learningOutcomes: string[];
    rationale: string;
  } | null>(null);
  const [humanApproved, setHumanApproved] = useState(false);
  const [editorSuccess, setEditorSuccess] = useState<string | null>(null);

  // 4-Axis Gap Engine Calculations
  const gapAnalysisResults = selectedCourse.coreCompetencies.map((comp) => {
    // Correlate with district shortages
    const isShortage = selectedDistrict.topShortageSkills.some((s) =>
      comp.toLowerCase().includes(s.skill.toLowerCase().split(' ')[0])
    );
    const fourAxis = calculate4AxisDemandScore({
      roleImportance: isShortage ? 9 : 6,
      skillScarcity: isShortage ? 9 : 4,
      districtGrowthWeight: 8,
      proficiencyMultiplier: 1.25,
    });
    return {
      competency: comp,
      score: fourAxis.score,
      label: fourAxis.label,
      isShortage,
    };
  });

  // AI Module Suggestion Handler
  const handleRequestAiSuggestion = async () => {
    setIsAiSuggesting(true);
    setAiSuggestedModule(null);
    setHumanApproved(false);
    try {
      const moduleTitles = activeModules.map((m) => m.title);
      const suggestion = await suggestNsqfModule(selectedCourse.title, moduleTitles);
      setAiSuggestedModule(suggestion);
    } catch (err) {
      console.error('Module suggestion failed:', err);
    } finally {
      setIsAiSuggesting(false);
    }
  };

  // Add AI Suggested Module after Human Review & Approval
  const handleAdoptSuggestedModule = () => {
    if (!aiSuggestedModule || !humanApproved) return;

    const newModule: SyllabusModule = {
      id: `mod_sugg_${Date.now()}`,
      title: aiSuggestedModule.title,
      theoryHours: aiSuggestedModule.theoryHours,
      practicalHours: aiSuggestedModule.practicalHours,
      description: aiSuggestedModule.description,
      learningOutcomes: aiSuggestedModule.learningOutcomes,
      status: 'added',
      changeRationale: `[Human Approved AI Suggestion]: ${aiSuggestedModule.rationale}`,
    };

    setActiveModules([...activeModules, newModule]);
    setEditorSuccess(`Added module "${newModule.title}" to proposed syllabus revision with human sign-off.`);
    setAiSuggestedModule(null);
    setHumanApproved(false);
    setTimeout(() => setEditorSuccess(null), 5000);
  };

  return (
    <div className="bg-[#F8F5F0] min-h-screen py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Breadcrumb */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E7E1D9]">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#81766D] mb-1">
              <span>Vocational Education Board</span>
              <span>/</span>
              <span>Institution Portal</span>
              <span>/</span>
              <span className="text-[#191817] font-semibold">{currentUser?.organization || 'Govt ITI Aundh'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#191817]">
              Curriculum Gap Diagnosis & Syllabus Modernization
            </h1>
            <p className="text-xs text-[#81766D] mt-0.5">
              Logged in as: <strong className="text-[#191817]">{currentUser?.name || 'Dr. Suresh V. Patil'}</strong> · {currentUser?.designation || 'Principal & Board Member'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('editor')}
              className="px-4 py-2.5 bg-[#F5ED78] hover:bg-[#eae162] text-[#191817] text-xs font-semibold rounded-md transition-colors flex items-center gap-2 shadow-xs"
            >
              <FileEdit className="w-4 h-4" />
              <span>Syllabus Editor</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#E7E1D9] gap-6 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('gap-engine')}
            className={`pb-3 transition-colors relative flex items-center gap-2 ${
              activeTab === 'gap-engine' ? 'text-[#191817]' : 'text-[#81766D] hover:text-[#191817]'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-[#4F8279]" />
            <span>4-Axis Curriculum Gap Engine</span>
            {activeTab === 'gap-engine' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#191817]" />}
          </button>

          <button
            onClick={() => setActiveTab('editor')}
            className={`pb-3 transition-colors relative flex items-center gap-2 ${
              activeTab === 'editor' ? 'text-[#191817]' : 'text-[#81766D] hover:text-[#191817]'
            }`}
          >
            <FileEdit className="w-4 h-4 text-[#765033]" />
            <span>Interactive Syllabus Builder & AI Suggestions</span>
            {activeTab === 'editor' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#191817]" />}
          </button>

          <button
            onClick={() => setActiveTab('trainers')}
            className={`pb-3 transition-colors relative flex items-center gap-2 ${
              activeTab === 'trainers' ? 'text-[#191817]' : 'text-[#81766D] hover:text-[#191817]'
            }`}
          >
            <Users className="w-4 h-4 text-[#191817]" />
            <span>Faculty Upskilling Tracker</span>
            <span className="px-1.5 py-0.2 bg-[#F3EEE6] text-[#191817] rounded-full text-[10px]">
              {trainerList.length}
            </span>
            {activeTab === 'trainers' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#191817]" />}
          </button>

          <button
            onClick={() => setActiveTab('catalog')}
            className={`pb-3 transition-colors relative flex items-center gap-2 ${
              activeTab === 'catalog' ? 'text-[#191817]' : 'text-[#81766D] hover:text-[#191817]'
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#81766D]" />
            <span>Institutional Course Catalogue</span>
            {activeTab === 'catalog' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#191817]" />}
          </button>
        </div>

        {/* TAB 1: 4-AXIS CURRICULUM GAP ENGINE */}
        {activeTab === 'gap-engine' && (
          <div className="space-y-6">
            {/* Controls Bar: Select Course & District Location */}
            <div className="p-4 bg-[#FFFFFF] border border-[#E7E1D9] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
              <div className="flex flex-wrap items-center gap-3 text-xs w-full sm:w-auto">
                <span className="text-[#81766D] font-medium">Select Qualification:</span>
                <select
                  value={selectedCourse.id}
                  onChange={(e) => {
                    const c = courses.find((crs) => crs.id === e.target.value);
                    if (c) setSelectedCourse(c);
                  }}
                  className="px-3 py-1.5 bg-[#F8F5F0] border border-[#E7E1D9] rounded-lg font-semibold text-[#191817]"
                >
                  {courses.map((crs) => (
                    <option key={crs.id} value={crs.id}>
                      {crs.title} (Level {crs.nsqfLevel})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-[#81766D]">District Benchmark:</span>
                <select
                  value={selectedDistrict.id}
                  onChange={(e) => {
                    const d = DISTRICT_SKILL_DATA.find((dist) => dist.id === e.target.value);
                    if (d) setSelectedDistrict(d);
                  }}
                  className="px-3 py-1.5 bg-[#F8F5F0] border border-[#E7E1D9] rounded-lg font-semibold text-[#191817]"
                >
                  {DISTRICT_SKILL_DATA.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.districtName} District
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 4-Axis Formula Banner */}
            <div className="p-4 bg-[#F3EEE6] border border-[#E7E1D9] rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
              <div>
                <span className="font-semibold text-[#4F8279] uppercase text-[10px]">
                  Governing Model
                </span>
                <p className="font-mono text-xs text-[#191817] font-medium">
                  Demand Intensity = f(Role Importance × 0.35, Skill Scarcity × 0.40, District Weight × 0.25) × Proficiency Multiplier
                </p>
              </div>
              <span className="px-2.5 py-1 bg-[#FFFFFF] border border-[#E7E1D9] rounded text-[11px] font-mono text-[#81766D] shrink-0">
                Grounded in MIDC Census & Active Job Postings
              </span>
            </div>

            {/* Gap Analysis Results Table */}
            <div className="bg-[#FFFFFF] border border-[#E7E1D9] rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#E7E1D9] pb-3">
                <h3 className="font-serif font-bold text-base text-[#191817]">
                  Competency Gap Breakdown: {selectedCourse.title}
                </h3>
                <span className="text-xs font-mono text-[#4F8279] font-semibold">
                  Course Demand Index: {selectedCourse.industryDemandIndex}/100
                </span>
              </div>

              <div className="space-y-3">
                {gapAnalysisResults.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-[#F8F5F0] border border-[#E7E1D9] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:border-[#191817] transition-colors"
                  >
                    <div className="space-y-1">
                      <span className="font-semibold text-[#191817] block">
                        {item.competency}
                      </span>
                      <span className="text-[11px] text-[#81766D]">
                        Status in {selectedDistrict.districtName} Corridor:{' '}
                        {item.isShortage ? (
                          <strong className="text-red-700">Acute Industry Deficit (High Priority)</strong>
                        ) : (
                          <strong className="text-emerald-700">Satisfactorily Covered</strong>
                        )}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <span className="font-mono font-bold text-sm text-[#191817]">
                          {item.score}/100
                        </span>
                        <span className="text-[10px] text-[#81766D] block">Demand Intensity</span>
                      </div>
                      <span
                        className={`px-2.5 py-1 rounded text-[10px] font-semibold uppercase ${
                          item.score >= 80
                            ? 'bg-red-50 text-red-700 border border-red-200'
                            : item.score >= 60
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action recommendation */}
              <div className="p-4 bg-[#FFFFFF] border border-[#E7E1D9] rounded-xl flex items-center justify-between text-xs">
                <span className="text-[#81766D]">
                  Need to modernize this course with missing industry skills? Launch the syllabus editor.
                </span>
                <button
                  onClick={() => setActiveTab('editor')}
                  className="px-3 py-1.5 bg-[#191817] text-[#F8F5F0] rounded-md font-semibold text-xs flex items-center gap-1.5"
                >
                  <span>Edit Course Syllabus</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE SYLLABUS BUILDER & AI ASSISTANT */}
        {activeTab === 'editor' && (
          <div className="space-y-6">
            {editorSuccess && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  {editorSuccess}
                </span>
                <button onClick={() => setEditorSuccess(null)} className="font-semibold">
                  Dismiss
                </button>
              </div>
            )}

            {/* AI Assistant Banner */}
            <div className="p-6 bg-[#FFFFFF] border border-[#E7E1D9] rounded-2xl shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-[#E7E1D9]">
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#4F8279]" />
                    <span className="text-xs font-semibold text-[#4F8279] uppercase tracking-wider">
                      NSQF Curriculum Modernization Assistant
                    </span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-[#191817] mt-0.5">
                    AI-Assisted Module Generator (Human Review Required)
                  </h3>
                </div>

                <button
                  onClick={handleRequestAiSuggestion}
                  disabled={isAiSuggesting}
                  className="px-4 py-2 bg-[#191817] hover:bg-[#2C2B29] text-[#F8F5F0] text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 shadow-xs whitespace-nowrap"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#F5ED78]" />
                  <span>{isAiSuggesting ? 'Analyzing NSQF Standards...' : 'Suggest Modern Industry Module'}</span>
                </button>
              </div>

              {/* AI Suggestion Card with Mandatory Human Review */}
              {aiSuggestedModule && (
                <div className="p-5 bg-amber-50/50 border border-amber-200 rounded-xl space-y-3 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-amber-900 uppercase">
                      Proposed Module Draft
                    </span>
                    <span className="text-[11px] font-mono text-amber-800">
                      Theory: {aiSuggestedModule.theoryHours}h · Practical: {aiSuggestedModule.practicalHours}h
                    </span>
                  </div>

                  <h4 className="text-base font-serif font-bold text-[#191817]">
                    {aiSuggestedModule.title}
                  </h4>
                  <p className="text-xs text-[#81766D] leading-relaxed">
                    {aiSuggestedModule.description}
                  </p>

                  <div className="p-3 bg-[#FFFFFF] rounded border border-amber-200 text-xs text-[#191817]">
                    <strong>Industrial Justification:</strong> {aiSuggestedModule.rationale}
                  </div>

                  {/* Mandatory Human Review Checkbox */}
                  <div className="pt-2 border-t border-amber-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <label className="flex items-center gap-2 text-xs text-[#191817] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={humanApproved}
                        onChange={(e) => setHumanApproved(e.target.checked)}
                        className="w-4 h-4 accent-[#191817] rounded"
                      />
                      <span className="font-medium">
                        I have verified this module aligns with National Skill Qualifications Framework (NSQF) standards and approve its inclusion in the curriculum revision draft.
                      </span>
                    </label>

                    <button
                      onClick={handleAdoptSuggestedModule}
                      disabled={!humanApproved}
                      className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                        humanApproved
                          ? 'bg-[#F5ED78] hover:bg-[#eae162] text-[#191817] shadow-xs'
                          : 'bg-[#DCD5CB] text-[#81766D] cursor-not-allowed'
                      }`}
                    >
                      Adopt to Syllabus Revision
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Current Active Course Modules Editor */}
            <div className="bg-[#FFFFFF] border border-[#E7E1D9] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#E7E1D9]">
                <div>
                  <h3 className="text-lg font-serif font-bold text-[#191817]">
                    Course Modules in Revision Draft ({selectedCourse.title})
                  </h3>
                  <p className="text-xs text-[#81766D]">
                    Proposed additions will be submitted to regional employers (Tata Motors, Bharat Forge) for GitHub-style diff endorsement.
                  </p>
                </div>
                <span className="text-xs font-mono font-semibold text-[#4F8279]">
                  {activeModules.length} Modules Total
                </span>
              </div>

              <div className="space-y-3">
                {activeModules.map((mod, i) => (
                  <div
                    key={mod.id || i}
                    className={`p-4 rounded-xl border text-xs space-y-1.5 transition-colors ${
                      mod.status === 'added'
                        ? 'bg-emerald-50/60 border-emerald-200'
                        : mod.status === 'removed'
                        ? 'bg-red-50/60 border-red-200'
                        : 'bg-[#F8F5F0] border-[#E7E1D9]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif font-bold text-sm text-[#191817]">
                        {mod.title}
                      </h4>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-mono font-semibold uppercase ${
                          mod.status === 'added'
                            ? 'bg-emerald-100 text-emerald-800'
                            : mod.status === 'removed'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-neutral-100 text-neutral-800'
                        }`}
                      >
                        {mod.status}
                      </span>
                    </div>

                    <p className="text-xs text-[#81766D]">{mod.description}</p>

                    <div className="flex justify-between items-center text-[11px] text-[#81766D] pt-1">
                      <span>Theory: {mod.theoryHours}h · Practical: {mod.practicalHours}h</span>
                      {mod.status === 'added' && (
                        <span className="text-[#4F8279] font-medium">✓ Ready for employer review</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-[#E7E1D9] flex items-center justify-between">
                <span className="text-xs text-[#81766D]">
                  Changes are saved to local institutional draft.
                </span>
                <button
                  onClick={() => {
                    setEditorSuccess('Syllabus revision submitted to DSDC Board & Regional Employer Review Hub!');
                    setTimeout(() => setEditorSuccess(null), 4000);
                  }}
                  className="px-5 py-2.5 bg-[#191817] text-[#F8F5F0] hover:bg-[#2C2B29] text-xs font-semibold rounded-md transition-colors"
                >
                  Submit Revision for Industry Endorsement
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: FACULTY UPSKILLING TRACKER */}
        {activeTab === 'trainers' && (
          <div className="space-y-6">
            {fellowshipSuccess && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  {fellowshipSuccess}
                </span>
                <button onClick={() => setFellowshipSuccess(null)} className="font-semibold">
                  Dismiss
                </button>
              </div>
            )}

            <div className="p-6 bg-[#FFFFFF] border border-[#E7E1D9] rounded-2xl shadow-xs space-y-4">
              <div>
                <h3 className="text-lg font-serif font-bold text-[#191817]">
                  Faculty Competency Matrix & Master Trainer Bootcamps
                </h3>
                <p className="text-xs text-[#81766D] mt-0.5">
                  Tracks which instructors require formal upskilling fellowships before accredited ITIs can deliver newly adopted NSQF modules.
                </p>
              </div>

              <div className="space-y-3">
                {trainerList.map((tr) => (
                  <div
                    key={tr.id}
                    className="p-5 bg-[#F8F5F0] border border-[#E7E1D9] rounded-xl space-y-2 hover:border-[#191817] transition-colors text-xs"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-serif font-bold text-sm text-[#191817]">
                          {tr.trainerName}
                        </h4>
                        <span className="text-[11px] text-[#81766D]">
                          Specialization: {tr.specialization} · Target Module: {tr.targetModule}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] px-2.5 py-1 rounded font-semibold uppercase ${
                          tr.upskillingStatus === 'Action Needed'
                            ? 'bg-amber-100 text-amber-900 border border-amber-200'
                            : tr.upskillingStatus === 'In Progress'
                            ? 'bg-blue-100 text-blue-900 border border-blue-200'
                            : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                        }`}
                      >
                        {tr.upskillingStatus}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-[11px]">
                      <div>
                        <span className="text-[#81766D] block">Current Verified Competencies:</span>
                        <span className="text-[#191817] font-medium">{tr.currentSkills.join(', ')}</span>
                      </div>
                      <div>
                        <span className="text-[#4F8279] font-medium block">Required Upskilling Skills:</span>
                        <span className="text-[#191817] font-semibold">{tr.requiredSkills.join(', ')}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#E7E1D9] flex items-center justify-between text-[11px]">
                      <span className="text-[#81766D]">
                        Assigned Program: <strong>{tr.recommendedProgram}</strong> ({tr.durationWeeks} Weeks)
                      </span>
                      <button
                        onClick={() => handleAdvanceFellowship(tr.id)}
                        className="text-[#191817] font-semibold hover:text-[#4F8279] transition-colors flex items-center gap-1"
                      >
                        <span>Advance Status</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: INSTITUTIONAL COURSE CATALOGUE */}
        {activeTab === 'catalog' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map((crs) => (
              <div
                key={crs.id}
                className="p-5 bg-[#FFFFFF] border border-[#E7E1D9] rounded-xl space-y-2.5 shadow-xs"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#81766D] uppercase">
                      {crs.courseCode} · {crs.sector}
                    </span>
                    <h4 className="font-serif font-bold text-base text-[#191817]">
                      {crs.title}
                    </h4>
                  </div>
                  <span className="px-2 py-0.5 text-[10px] font-semibold bg-[#F3EEE6] rounded">
                    Level {crs.nsqfLevel}
                  </span>
                </div>
                <p className="text-xs text-[#81766D] line-clamp-2">{crs.description}</p>
                <div className="pt-2 border-t border-[#E7E1D9] flex items-center justify-between text-xs text-[#81766D]">
                  <span>{crs.durationHours} Training Hours</span>
                  <span className="font-semibold text-[#4F8279]">
                    Demand: {crs.industryDemandIndex}/100
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
