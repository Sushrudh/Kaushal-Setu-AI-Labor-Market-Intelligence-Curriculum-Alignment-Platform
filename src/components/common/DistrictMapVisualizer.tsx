import React, { useState } from 'react';
import { DISTRICT_SKILL_DATA } from '../../data/mockData';
import { DistrictSkillData } from '../../types';
import { MapPin, AlertTriangle, TrendingUp, Users, Factory, Building2, CheckCircle2 } from 'lucide-react';

interface Props {
  selectedDistrictId?: string;
  onSelectDistrict?: (district: DistrictSkillData) => void;
  compact?: boolean;
}

export const DistrictMapVisualizer: React.FC<Props> = ({
  selectedDistrictId = 'dist_pune',
  onSelectDistrict,
  compact = false,
}) => {
  const [activeId, setActiveId] = useState(selectedDistrictId);
  const [metricView, setMetricView] = useState<'shortage' | 'ratio' | 'oowi'>('shortage');

  const selectedDistrict = DISTRICT_SKILL_DATA.find((d) => d.id === activeId) || DISTRICT_SKILL_DATA[0];

  const handleDistrictClick = (district: DistrictSkillData) => {
    setActiveId(district.id);
    if (onSelectDistrict) {
      onSelectDistrict(district);
    }
  };

  const getDistrictColor = (district: DistrictSkillData) => {
    if (metricView === 'oowi') {
      if (district.oowiScore >= 60) return '#DC2626'; // Alert red
      if (district.oowiScore >= 48) return '#D97706'; // Amber warning
      return '#4F8279'; // Balanced / stable teal
    }
    if (metricView === 'ratio') {
      if (district.supplyDemandRatio > 120) return '#D97706'; // Oversupply warning
      if (district.supplyDemandRatio < 80) return '#4F8279'; // High industry absorption
      return '#3B82F6';
    }
    // Shortage view
    return '#191817';
  };

  return (
    <div className={`bg-[#FFFFFF] border border-[#E7E1D9] rounded-xl overflow-hidden shadow-xs ${compact ? 'p-4' : 'p-6'}`}>
      {/* Metric Mode Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#E7E1D9]">
        <div>
          <h3 className="text-base font-serif font-semibold text-[#191817] flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#4F8279]" />
            <span>District Skill Intelligence Map</span>
          </h3>
          <p className="text-xs text-[#81766D] mt-0.5">
            Real-time geospatial supply-demand correlation across industrial corridors
          </p>
        </div>

        {/* Segmented filter buttons */}
        <div className="flex items-center gap-1 p-1 bg-[#F3EEE6] rounded-lg text-xs">
          <button
            onClick={() => setMetricView('shortage')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              metricView === 'shortage'
                ? 'bg-[#FFFFFF] text-[#191817] shadow-xs'
                : 'text-[#81766D] hover:text-[#191817]'
            }`}
          >
            Skill Deficits
          </button>
          <button
            onClick={() => setMetricView('ratio')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              metricView === 'ratio'
                ? 'bg-[#FFFFFF] text-[#191817] shadow-xs'
                : 'text-[#81766D] hover:text-[#191817]'
            }`}
          >
            Supply / Demand Ratio
          </button>
          <button
            onClick={() => setMetricView('oowi')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              metricView === 'oowi'
                ? 'bg-[#FFFFFF] text-[#191817] shadow-xs'
                : 'text-[#81766D] hover:text-[#191817]'
            }`}
          >
            OOWI Risk Index
          </button>
        </div>
      </div>

      {/* Main Grid: Interactive Map Schematic + Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-5">
        {/* Map schematic canvas */}
        <div className="lg:col-span-7 bg-[#F8F5F0] border border-[#E7E1D9] rounded-lg p-5 flex flex-col justify-between relative min-h-[340px]">
          <div className="flex items-center justify-between text-xs text-[#81766D] mb-2">
            <span>Maharashtra Regional Manufacturing Belts</span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#4F8279]"></span> Balanced
              <span className="w-2 h-2 rounded-full bg-[#D97706] ml-2"></span> Warning (&gt;120%)
              <span className="w-2 h-2 rounded-full bg-[#DC2626] ml-2"></span> Critical OOWI
            </span>
          </div>

          {/* Stylized SVG Map Representation of Maharashtra Districts */}
          <div className="relative w-full h-[260px] flex items-center justify-center">
            <svg viewBox="0 0 500 320" className="w-full h-full max-h-[260px]">
              {/* Regional base outline */}
              <path
                d="M 50,110 Q 90,60 180,50 T 360,50 Q 440,70 470,120 T 430,220 Q 380,290 280,290 T 130,270 Q 70,220 50,110 Z"
                fill="#F3EEE6"
                stroke="#DCD5CB"
                strokeWidth="1.5"
                strokeDasharray="4 2"
              />

              {/* District Node 1: Nashik */}
              <g
                className="cursor-pointer transition-transform hover:scale-110"
                onClick={() => handleDistrictClick(DISTRICT_SKILL_DATA[2])}
              >
                <circle
                  cx="140"
                  cy="110"
                  r={activeId === 'dist_nashik' ? '24' : '18'}
                  fill={activeId === 'dist_nashik' ? '#191817' : '#FFFFFF'}
                  stroke={getDistrictColor(DISTRICT_SKILL_DATA[2])}
                  strokeWidth="3"
                />
                <text
                  x="140"
                  y="114"
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="bold"
                  fill={activeId === 'dist_nashik' ? '#F8F5F0' : '#191817'}
                >
                  Nashik
                </text>
                <text x="140" y="142" textAnchor="middle" fontSize="9" fill="#81766D">
                  83% Ratio
                </text>
              </g>

              {/* District Node 2: Thane / MMR */}
              <g
                className="cursor-pointer transition-transform hover:scale-110"
                onClick={() => handleDistrictClick(DISTRICT_SKILL_DATA[4])}
              >
                <circle
                  cx="90"
                  cy="175"
                  r={activeId === 'dist_thane' ? '24' : '18'}
                  fill={activeId === 'dist_thane' ? '#191817' : '#FFFFFF'}
                  stroke={getDistrictColor(DISTRICT_SKILL_DATA[4])}
                  strokeWidth="3"
                />
                <text
                  x="90"
                  y="179"
                  textAnchor="middle"
                  fontSize="9.5"
                  fontWeight="bold"
                  fill={activeId === 'dist_thane' ? '#F8F5F0' : '#191817'}
                >
                  Thane
                </text>
                <text x="90" y="206" textAnchor="middle" fontSize="9" fill="#81766D">
                  78% Ratio
                </text>
              </g>

              {/* District Node 3: Pune (Primary cluster) */}
              <g
                className="cursor-pointer transition-transform hover:scale-110"
                onClick={() => handleDistrictClick(DISTRICT_SKILL_DATA[0])}
              >
                <circle
                  cx="170"
                  cy="205"
                  r={activeId === 'dist_pune' ? '28' : '22'}
                  fill={activeId === 'dist_pune' ? '#191817' : '#FFFFFF'}
                  stroke={getDistrictColor(DISTRICT_SKILL_DATA[0])}
                  strokeWidth="3.5"
                />
                <text
                  x="170"
                  y="209"
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="bold"
                  fill={activeId === 'dist_pune' ? '#F8F5F0' : '#191817'}
                >
                  Pune
                </text>
                <text x="170" y="240" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#4F8279">
                  4.8k Deficit
                </text>
              </g>

              {/* District Node 4: Chhatrapati Sambhaji Nagar */}
              <g
                className="cursor-pointer transition-transform hover:scale-110"
                onClick={() => handleDistrictClick(DISTRICT_SKILL_DATA[3])}
              >
                <circle
                  cx="250"
                  cy="145"
                  r={activeId === 'dist_aurangabad' ? '24' : '18'}
                  fill={activeId === 'dist_aurangabad' ? '#191817' : '#FFFFFF'}
                  stroke={getDistrictColor(DISTRICT_SKILL_DATA[3])}
                  strokeWidth="3"
                />
                <text
                  x="250"
                  y="149"
                  textAnchor="middle"
                  fontSize="9"
                  fontWeight="bold"
                  fill={activeId === 'dist_aurangabad' ? '#F8F5F0' : '#191817'}
                >
                  Sambhaji Ngr
                </text>
                <text x="250" y="176" textAnchor="middle" fontSize="9" fill="#81766D">
                  80% Ratio
                </text>
              </g>

              {/* District Node 5: Nagpur */}
              <g
                className="cursor-pointer transition-transform hover:scale-110"
                onClick={() => handleDistrictClick(DISTRICT_SKILL_DATA[1])}
              >
                <circle
                  cx="390"
                  cy="105"
                  r={activeId === 'dist_nagpur' ? '25' : '19'}
                  fill={activeId === 'dist_nagpur' ? '#191817' : '#FFFFFF'}
                  stroke={getDistrictColor(DISTRICT_SKILL_DATA[1])}
                  strokeWidth="3"
                />
                <text
                  x="390"
                  y="109"
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="bold"
                  fill={activeId === 'dist_nagpur' ? '#F8F5F0' : '#191817'}
                >
                  Nagpur
                </text>
                <text x="390" y="136" textAnchor="middle" fontSize="9" fontWeight="600" fill="#D97706">
                  129% Supply
                </text>
              </g>

              {/* Correlation connecting lines */}
              <line x1="140" y1="110" x2="170" y2="205" stroke="#DCD5CB" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="90" y1="175" x2="170" y2="205" stroke="#DCD5CB" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="170" y1="205" x2="250" y2="145" stroke="#DCD5CB" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="250" y1="145" x2="390" y2="105" stroke="#DCD5CB" strokeWidth="1" strokeDasharray="3 3" />
            </svg>
          </div>

          <div className="text-[11px] text-[#81766D] flex items-center justify-between pt-2 border-t border-[#E7E1D9]">
            <span>Click any node to inspect real district micro-metrics</span>
            <span>Selected: <strong className="text-[#191817]">{selectedDistrict.districtName}</strong></span>
          </div>
        </div>

        {/* District Detail Information Panel */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] text-[#4F8279] font-semibold uppercase tracking-wider">
                  {selectedDistrict.state}
                </span>
                <h4 className="text-xl font-serif font-bold text-[#191817]">
                  {selectedDistrict.districtName} District
                </h4>
              </div>
              <span
                className={`text-xs px-2.5 py-1 rounded font-semibold ${
                  selectedDistrict.oowiScore >= 60
                    ? 'bg-red-50 text-red-700 border border-red-200'
                    : selectedDistrict.oowiScore >= 48
                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                }`}
              >
                OOWI Index: {selectedDistrict.oowiScore}/100
              </span>
            </div>

            <p className="text-xs text-[#81766D] mt-2 leading-relaxed">
              {selectedDistrict.description}
            </p>

            {/* Quick Macro Cards */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="p-3 bg-[#F8F5F0] border border-[#E7E1D9] rounded-lg">
                <span className="text-[11px] text-[#81766D] block">Hiring Demand</span>
                <span className="text-base font-semibold font-mono tabular-nums text-[#191817]">
                  {selectedDistrict.annualHiringDemand.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-[#4F8279] block mt-0.5">positions / yr</span>
              </div>
              <div className="p-3 bg-[#F8F5F0] border border-[#E7E1D9] rounded-lg">
                <span className="text-[11px] text-[#81766D] block">Training Capacity</span>
                <span className="text-base font-semibold font-mono tabular-nums text-[#191817]">
                  {selectedDistrict.annualTrainingCapacity.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-[#81766D] block mt-0.5">certified seats / yr</span>
              </div>
            </div>

            {/* Top Shortage Deficits */}
            <div className="mt-4">
              <span className="text-xs font-semibold text-[#191817] block mb-2 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-[#4F8279]" />
                Top High-Demand Technician Gaps
              </span>
              <div className="space-y-1.5">
                {selectedDistrict.topShortageSkills.slice(0, 3).map((item) => (
                  <div
                    key={item.skill}
                    className="p-2 bg-[#F8F5F0] border border-[#E7E1D9] rounded flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-medium text-[#191817] block">{item.skill}</span>
                      <span className="text-[10px] text-[#81766D]">{item.avgSalary}</span>
                    </div>
                    <span className="font-mono text-red-600 font-semibold text-[11px] whitespace-nowrap">
                      -{item.deficit} gap
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Oversupply Alert Bar */}
            {selectedDistrict.topOversuppliedTrades.length > 0 && (
              <div className="mt-4 p-2.5 bg-amber-50/60 border border-amber-200/80 rounded text-xs">
                <span className="font-semibold text-amber-900 flex items-center gap-1 mb-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                  Oversupply Alert (OOWI Flag)
                </span>
                <p className="text-[11px] text-amber-800 leading-snug">
                  {selectedDistrict.topOversuppliedTrades[0].trade}: Training output is{' '}
                  <strong>{selectedDistrict.topOversuppliedTrades[0].ratio}%</strong> of hiring absorption capacity. Recommended for syllabus realignment.
                </p>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-[#E7E1D9] flex items-center justify-between text-xs text-[#81766D]">
            <span className="flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" />
              {selectedDistrict.institutionsCount} ITIs / Colleges
            </span>
            <span className="flex items-center gap-1">
              <Factory className="w-3.5 h-3.5" />
              {selectedDistrict.registeredEmployers} MIDC Employers
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
