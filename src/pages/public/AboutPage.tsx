import React from 'react';
import { ShieldCheck, Target, Award, Users, Scale, FileText } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-[#F8F5F0] py-12 lg:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-semibold text-[#4F8279] uppercase tracking-wider block">
            National Mission & Governance Alignment
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#191817]">
            Bridging India's Vocational Divide Through Verified Data
          </h1>
          <p className="text-sm sm:text-base text-[#81766D] leading-relaxed">
            Kaushal Setu is an open, evidence-driven collaboration infrastructure connecting District Skill Development Committees, Industrial Training Institutes, regional industrial manufacturers, and trainees.
          </p>
        </div>

        {/* Mission & Problem Statement Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-[#FFFFFF] border border-[#E7E1D9] rounded-2xl shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#F8F5F0] border border-[#E7E1D9] flex items-center justify-center text-[#765033]">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#191817]">
              The Core Challenge
            </h3>
            <p className="text-xs sm:text-sm text-[#81766D] leading-relaxed">
              For decades, vocational training curriculums in India remained decoupled from regional factory floor evolutions. While tier-1 automotive, clean mobility, and aerospace manufacturers adopted 5-axis CNC machining, EV battery testing, and industrial robotics, local ITIs continued training thousands in manual drafting and obsolete belt lathes—leading to severe youth underemployment alongside acute industrial labor shortages.
            </p>
          </div>

          <div className="p-8 bg-[#FFFFFF] border border-[#E7E1D9] rounded-2xl shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#F8F5F0] border border-[#E7E1D9] flex items-center justify-center text-[#4F8279]">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#191817]">
              The Kaushal Setu Solution
            </h3>
            <p className="text-xs sm:text-sm text-[#81766D] leading-relaxed">
              Kaushal Setu establishes a transparent, continuous feedback loop. When regional manufacturers post hiring requisitions, our engine extracts technical competencies, maps them against NSQF Qualification Packs, highlights curriculum gaps with GitHub-style visual diffs, and equips District Committees with actionable data to reallocate machinery budgets.
            </p>
          </div>
        </div>

        {/* 4-Axis Methodology Spec */}
        <div className="p-8 bg-[#FFFFFF] border border-[#E7E1D9] rounded-2xl shadow-xs space-y-6">
          <h3 className="text-2xl font-serif font-bold text-[#191817]">
            Transparent 4-Axis Demand Scoring Model
          </h3>
          <p className="text-xs sm:text-sm text-[#81766D] leading-relaxed">
            Rather than relying on opaque black-box AI scores, Kaushal Setu ranks skill demand using an explainable mathematical formula:
          </p>

          <div className="p-5 bg-[#F3EEE6] border border-[#E7E1D9] rounded-xl font-mono text-xs sm:text-sm text-[#191817] text-center overflow-x-auto">
            Demand Intensity = f(Role, Skill, District Location, Proficiency Level)
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-3 bg-[#F8F5F0] rounded-lg">
              <span className="font-semibold text-[#191817] block">1. Role Weight</span>
              <span className="text-[#81766D]">Core production vs ancillary function</span>
            </div>
            <div className="p-3 bg-[#F8F5F0] rounded-lg">
              <span className="font-semibold text-[#191817] block">2. Skill Scarcity</span>
              <span className="text-[#81766D]">Deficit ratio in active industrial postings</span>
            </div>
            <div className="p-3 bg-[#F8F5F0] rounded-lg">
              <span className="font-semibold text-[#191817] block">3. District Cluster</span>
              <span className="text-[#81766D]">Industrial hub growth multiplier</span>
            </div>
            <div className="p-3 bg-[#F8F5F0] rounded-lg">
              <span className="font-semibold text-[#191817] block">4. Proficiency Level</span>
              <span className="text-[#81766D]">Beginner (1.0x) to Advanced (1.5x)</span>
            </div>
          </div>
        </div>

        {/* Governance & Safeguards */}
        <div className="p-8 bg-[#191817] text-[#F8F5F0] rounded-2xl space-y-4">
          <div className="flex items-center gap-2 text-[#F5ED78]">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-xs font-semibold uppercase tracking-wider">Human-in-the-Loop Safeguards</span>
          </div>
          <h4 className="text-xl font-serif font-bold">
            No Automated Funding or De-affiliation Decisions
          </h4>
          <p className="text-xs sm:text-sm text-[#DCD5CB] leading-relaxed">
            Kaushal Setu does not replace democratic governance or official state skill boards. The 150% oversupply warning threshold (OOWI) serves as an initial diagnostic advisory flag. All curriculum changes, equipment reallocations, and District Skill Action Plans require formal human review and committee sign-off by the District Collector and designated officers.
          </p>
        </div>
      </div>
    </div>
  );
};
