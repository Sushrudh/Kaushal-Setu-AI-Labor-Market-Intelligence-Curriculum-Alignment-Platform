import React, { useState } from 'react';
import { NSQF_COURSES } from '../../data/mockData';
import { NsqfCourse } from '../../types';
import { Search, Filter, BookOpen, Clock, Award, CheckCircle, AlertTriangle } from 'lucide-react';

export const NsqfExplorerPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<number | 'all'>('all');
  const [selectedCourse, setSelectedCourse] = useState<NsqfCourse>(NSQF_COURSES[0]);

  const filteredCourses = NSQF_COURSES.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.courseCode.toLowerCase().includes(search.toLowerCase()) ||
      c.sector.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || c.nsqfLevel === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="bg-[#F8F5F0] py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-semibold text-[#4F8279] uppercase tracking-wider block">
            National Skills Qualifications Framework
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#191817]">
            NSQF Taxonomy & Skill Explorer
          </h1>
          <p className="text-sm sm:text-base text-[#81766D] leading-relaxed">
            Search standardized Qualification Packs (Levels 1–10) mapped to National Occupational Standards (NOS) and verified regional industrial demand.
          </p>
        </div>

        {/* Filter bar */}
        <div className="bg-[#FFFFFF] border border-[#E7E1D9] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#81766D] absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, code (CSC/Q0115), or sector..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-[#F8F5F0] border border-[#E7E1D9] rounded-lg focus:outline-hidden focus:border-[#191817]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 text-xs">
            <span className="text-[#81766D] mr-1 hidden md:inline">NSQF Level:</span>
            {['all', 4, 5, 6].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl as any)}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  selectedLevel === lvl
                    ? 'bg-[#191817] text-[#F8F5F0]'
                    : 'bg-[#F3EEE6] text-[#81766D] hover:text-[#191817]'
                }`}
              >
                {lvl === 'all' ? 'All Levels' : `Level ${lvl}`}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Catalog Grid: Course List & Course Detail Spec */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Course Cards List */}
          <div className="lg:col-span-5 space-y-3">
            {filteredCourses.map((crs) => {
              const isSelected = selectedCourse.id === crs.id;
              return (
                <div
                  key={crs.id}
                  onClick={() => setSelectedCourse(crs)}
                  className={`p-5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#FFFFFF] border-[#191817] shadow-sm'
                      : 'bg-[#FFFFFF]/70 border-[#E7E1D9] hover:bg-[#FFFFFF]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono text-[#81766D] uppercase">
                        {crs.courseCode} · {crs.sector}
                      </span>
                      <h4 className="text-base font-serif font-bold text-[#191817] mt-0.5">
                        {crs.title}
                      </h4>
                    </div>
                    <span className="px-2 py-0.5 text-[11px] font-semibold bg-[#F3EEE6] text-[#191817] rounded shrink-0">
                      Level {crs.nsqfLevel}
                    </span>
                  </div>

                  <p className="text-xs text-[#81766D] mt-2 line-clamp-2">
                    {crs.description}
                  </p>

                  <div className="mt-3 pt-3 border-t border-[#E7E1D9] flex items-center justify-between text-xs text-[#81766D]">
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5" />
                      {crs.durationHours} hrs
                    </span>
                    <span
                      className={`font-semibold ${
                        crs.isObsoleteFlag
                          ? 'text-red-600 flex items-center gap-1'
                          : 'text-[#4F8279]'
                      }`}
                    >
                      {crs.isObsoleteFlag ? (
                        <>
                          <AlertTriangle className="w-3 h-3" /> Flagged Outdated
                        </>
                      ) : (
                        `Demand Index: ${crs.industryDemandIndex}/100`
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Course Specification View */}
          <div className="lg:col-span-7">
            <div className="bg-[#FFFFFF] border border-[#E7E1D9] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-start justify-between pb-4 border-b border-[#E7E1D9]">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-semibold text-[#4F8279]">
                      {selectedCourse.courseCode}
                    </span>
                    <span className="text-xs text-[#81766D]">·</span>
                    <span className="text-xs text-[#81766D]">{selectedCourse.sector}</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-[#191817]">
                    {selectedCourse.title}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 bg-[#191817] text-[#F8F5F0] rounded-md text-xs font-semibold block">
                    NSQF Level {selectedCourse.nsqfLevel}
                  </span>
                  <span className="text-[10px] text-[#81766D] mt-1 block">
                    Revised: {selectedCourse.lastRevisionDate}
                  </span>
                </div>
              </div>

              <div>
                <h5 className="text-xs font-semibold uppercase tracking-wider text-[#81766D] mb-1.5">
                  Qualification Overview
                </h5>
                <p className="text-xs sm:text-sm text-[#191817] leading-relaxed">
                  {selectedCourse.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 bg-[#F8F5F0] rounded-xl border border-[#E7E1D9] text-xs">
                <div>
                  <span className="text-[#81766D] block">Course Duration</span>
                  <span className="font-semibold text-[#191817] font-mono">
                    {selectedCourse.durationHours} Training Hours
                  </span>
                </div>
                <div>
                  <span className="text-[#81766D] block">Entry Requirement</span>
                  <span className="font-semibold text-[#191817]">
                    {selectedCourse.entryQualification}
                  </span>
                </div>
              </div>

              {/* Core Competencies */}
              <div>
                <h5 className="text-xs font-semibold uppercase tracking-wider text-[#81766D] mb-2.5">
                  Core Assessed Competencies
                </h5>
                <div className="space-y-2">
                  {selectedCourse.coreCompetencies.map((comp, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 bg-[#FFFFFF] border border-[#E7E1D9] rounded-lg text-xs flex items-start gap-2.5"
                    >
                      <CheckCircle className="w-4 h-4 text-[#4F8279] shrink-0 mt-0.5" />
                      <span className="text-[#191817]">{comp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Target Job Roles */}
              <div>
                <h5 className="text-xs font-semibold uppercase tracking-wider text-[#81766D] mb-2">
                  Target Industrial Job Roles
                </h5>
                <div className="flex flex-wrap gap-2 text-xs">
                  {selectedCourse.targetJobRoles.map((role) => (
                    <span
                      key={role}
                      className="px-3 py-1 bg-[#F3EEE6] border border-[#E7E1D9] text-[#191817] rounded-md font-medium"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
