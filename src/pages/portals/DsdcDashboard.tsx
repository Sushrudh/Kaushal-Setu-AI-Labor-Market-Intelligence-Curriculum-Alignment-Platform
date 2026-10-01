import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { DISTRICT_SKILL_DATA, MOCK_DSAP_REPORT } from '../../data/mockData';
import { DistrictSkillData, DsapReport } from '../../types';
import { generateDsapPdf } from '../../services/pdfService';
import { DistrictMapVisualizer } from '../../components/common/DistrictMapVisualizer';
import {
  FileText,
  Download,
  AlertTriangle,
  TrendingUp,
  Settings,
  CheckCircle,
  Building,
  Sliders,
  DollarSign,
  Printer,
  ChevronRight,
} from 'lucide-react';

export const DsdcDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictSkillData>(DISTRICT_SKILL_DATA[0]);
  const [oversupplyThreshold, setOversupplyThreshold] = useState<number>(150);
  const [currentDsap, setCurrentDsap] = useState<DsapReport>(MOCK_DSAP_REPORT);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [exportSuccessMessage, setExportSuccessMessage] = useState<string | null>(null);

  // Compute oversupplied trades using the active configurable threshold
  const oversuppliedTrades = selectedDistrict.topOversuppliedTrades.filter(
    (t) => t.ratio >= oversupplyThreshold
  );

  const handleExportDsap = () => {
    setIsGeneratingPdf(true);
    try {
      generateDsapPdf(currentDsap, selectedDistrict);
      setExportSuccessMessage(
        `Official DSAP brief for ${selectedDistrict.districtName} (FY 2026-27) generated and downloaded as PDF.`
      );
      setTimeout(() => setExportSuccessMessage(null), 5000);
    } catch (err) {
      console.error('PDF export error:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="bg-[#F8F5F0] min-h-screen py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Portal Breadcrumb & Top Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E7E1D9]">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#81766D] mb-1">
              <span>District Governance</span>
              <span>/</span>
              <span>DSDC Collectorate Portal</span>
              <span>/</span>
              <span className="text-[#191817] font-semibold">{selectedDistrict.districtName} District</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#191817]">
              District Skill Action Plan (DSAP) & Supply-Demand Intelligence
            </h1>
            <p className="text-xs text-[#81766D] mt-0.5">
              Logged in as: <strong className="text-[#191817]">{currentUser?.name || 'Shri Rajesh Kulkarni'}</strong> · {currentUser?.designation || 'District Skill Development Officer'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportDsap}
              disabled={isGeneratingPdf}
              className="px-4 py-2.5 bg-[#F5ED78] hover:bg-[#eae162] text-[#191817] text-xs font-semibold rounded-md transition-colors flex items-center gap-2 shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>{isGeneratingPdf ? 'Compiling DSAP...' : 'Download 1-Click DSAP (PDF)'}</span>
            </button>
          </div>
        </div>

        {exportSuccessMessage && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              {exportSuccessMessage}
            </span>
            <button
              onClick={() => setExportSuccessMessage(null)}
              className="text-emerald-700 font-semibold"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* District Selector & Macro Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {DISTRICT_SKILL_DATA.map((dist) => {
            const isSelected = selectedDistrict.id === dist.id;
            return (
              <div
                key={dist.id}
                onClick={() => setSelectedDistrict(dist)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[#FFFFFF] border-[#191817] shadow-sm ring-1 ring-[#191817]'
                    : 'bg-[#FFFFFF]/70 border-[#E7E1D9] hover:bg-[#FFFFFF]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-sm text-[#191817]">
                    {dist.districtName}
                  </h4>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-semibold uppercase ${
                      dist.oowiScore >= 60 ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-800'
                    }`}
                  >
                    OOWI: {dist.oowiScore}
                  </span>
                </div>
                <div className="mt-2 text-xs text-[#81766D] space-y-0.5 font-mono">
                  <div>Demand: {dist.annualHiringDemand.toLocaleString('en-IN')}</div>
                  <div>Capacity: {dist.annualTrainingCapacity.toLocaleString('en-IN')} ({dist.supplyDemandRatio}%)</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Map Visualizer */}
        <DistrictMapVisualizer
          selectedDistrictId={selectedDistrict.id}
          onSelectDistrict={(d) => setSelectedDistrict(d)}
        />

        {/* 2-Column Core Planning Modules: OOWI Warning Panel + Budget Reallocation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Module 1: Obsolescence & Oversupply Warning Index (OOWI) Panel */}
          <div className="lg:col-span-6 bg-[#FFFFFF] border border-[#E7E1D9] rounded-2xl p-6 sm:p-7 shadow-xs space-y-6">
            <div className="flex items-start justify-between pb-3 border-b border-[#E7E1D9]">
              <div>
                <span className="text-xs font-semibold text-[#D97706] uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-[#D97706]" />
                  Obsolescence & Oversupply Warning (OOWI)
                </span>
                <h3 className="text-lg font-serif font-bold text-[#191817] mt-0.5">
                  Curriculum Alert & Capacity Diagnostics
                </h3>
              </div>
              <span className="text-xs px-2.5 py-1 bg-amber-50 text-amber-800 rounded font-semibold font-mono">
                Active Threshold: {oversupplyThreshold}%
              </span>
            </div>

            {/* Configurable Threshold Slider */}
            <div className="p-4 bg-[#F8F5F0] rounded-xl border border-[#E7E1D9] space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-[#191817] flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-[#81766D]" />
                  Configure Oversupply Alert Threshold:
                </span>
                <span className="font-mono font-bold text-[#191817]">{oversupplyThreshold}% Supply/Demand</span>
              </div>
              <input
                type="range"
                min="110"
                max="250"
                step="5"
                value={oversupplyThreshold}
                onChange={(e) => setOversupplyThreshold(Number(e.target.value))}
                className="w-full accent-[#191817] cursor-pointer"
              />
              <p className="text-[11px] text-[#81766D]">
                *Note: The 150% baseline is an initial diagnostic project rule, not an established statutory threshold.
              </p>
            </div>

            {/* Oversupplied / Outdated Trades List */}
            <div className="space-y-3">
              <span className="text-xs font-semibold text-[#191817] block">
                Trades Exceeding Configured Capacity Threshold ({oversupplyThreshold}%):
              </span>

              {oversuppliedTrades.length === 0 ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800">
                  No courses exceed the current {oversupplyThreshold}% oversupply threshold in {selectedDistrict.districtName}.
                </div>
              ) : (
                oversuppliedTrades.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-red-50/50 border border-red-200 rounded-xl text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between font-semibold text-red-950">
                      <span>{item.trade}</span>
                      <span className="font-mono text-red-700 bg-red-100 px-2 py-0.5 rounded">
                        {item.ratio}% Oversupply
                      </span>
                    </div>
                    <div className="flex justify-between text-[11px] text-red-800">
                      <span>Annual Training Seats: {item.capacity}</span>
                      <span>Hiring Market Need: {item.hiringNeed}</span>
                    </div>
                    <p className="text-[11px] text-[#81766D] pt-1">
                      Action Advisory: Recommend committee freeze new admissions and redeploy lab space toward CNC / EV modules.
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Critical Deficit Counterweight */}
            <div className="pt-2">
              <span className="text-xs font-semibold text-[#191817] block mb-2">
                Unfilled Industrial Technician Deficits in {selectedDistrict.districtName}:
              </span>
              <div className="space-y-1.5">
                {selectedDistrict.topShortageSkills.slice(0, 3).map((shortage) => (
                  <div
                    key={shortage.skill}
                    className="p-2.5 bg-[#F8F5F0] border border-[#E7E1D9] rounded-lg text-xs flex items-center justify-between"
                  >
                    <div>
                      <span className="font-medium text-[#191817] block">{shortage.skill}</span>
                      <span className="text-[10px] text-[#81766D]">{shortage.avgSalary}</span>
                    </div>
                    <span className="font-mono text-red-600 font-bold text-xs">
                      -{shortage.deficit} Deficit
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Module 2: Budget & Equipment Allocation Advisor */}
          <div className="lg:col-span-6 bg-[#FFFFFF] border border-[#E7E1D9] rounded-2xl p-6 sm:p-7 shadow-xs space-y-6">
            <div className="flex items-start justify-between pb-3 border-b border-[#E7E1D9]">
              <div>
                <span className="text-xs font-semibold text-[#4F8279] uppercase tracking-wider flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-[#4F8279]" />
                  Equipment & Capital Budget Advisor
                </span>
                <h3 className="text-lg font-serif font-bold text-[#191817] mt-0.5">
                  Lab Machinery Reallocation Plan
                </h3>
              </div>
              <span className="text-xs px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded font-semibold font-mono">
                Total Fund: ₹{currentDsap.totalBudgetApprovedInLakhs} Lakhs
              </span>
            </div>

            <p className="text-xs text-[#81766D] leading-relaxed">
              Based on active factory shortages, the advisor recommends decommissioning obsolete manual machinery and procuring modern simulation beds.
            </p>

            {/* Equipment Action List */}
            <div className="space-y-3">
              {currentDsap.equipmentReallocationPlan.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-[#F8F5F0] border border-[#E7E1D9] rounded-xl text-xs space-y-1.5 hover:border-[#191817] transition-colors"
                >
                  <div className="flex items-center justify-between font-semibold">
                    <span className="text-[#191817]">
                      {item.instituteName}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] uppercase font-semibold ${
                        item.action === 'Procure New'
                          ? 'bg-emerald-100 text-emerald-800'
                          : item.action === 'Decommission'
                          ? 'bg-neutral-200 text-neutral-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {item.action} · ₹{item.budgetInLakhs} L
                    </span>
                  </div>
                  <div className="font-medium text-[#191817]">{item.equipmentType}</div>
                  <p className="text-[11px] text-[#81766D] leading-snug">{item.justification}</p>
                </div>
              ))}
            </div>

            {/* Committee Sign-Off Box */}
            <div className="p-4 bg-[#191817] text-[#F8F5F0] rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#F5ED78] uppercase">
                  Collectorate Sign-Off Status
                </span>
                <span className="text-xs font-mono text-emerald-400">
                  {currentDsap.status}
                </span>
              </div>
              <p className="text-xs text-[#DCD5CB] leading-relaxed">
                Prepared by: {currentDsap.preparedBy}. Includes a faculty upskilling quota of {currentDsap.trainerUpskillingQuota} Master Trainers for FY 2026-27.
              </p>
              <button
                onClick={handleExportDsap}
                className="w-full py-2 bg-[#F5ED78] hover:bg-[#eae162] text-[#191817] text-xs font-semibold rounded transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Export Brief for Committee Meeting</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
