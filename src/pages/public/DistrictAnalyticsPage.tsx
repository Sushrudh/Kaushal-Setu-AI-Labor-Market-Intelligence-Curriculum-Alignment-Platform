import React, { useState } from 'react';
import { DISTRICT_SKILL_DATA } from '../../data/mockData';
import { DistrictSkillData } from '../../types';
import { DistrictMapVisualizer } from '../../components/common/DistrictMapVisualizer';
import { BarChart3, TrendingUp, AlertTriangle, Building2, Factory, Search, Download } from 'lucide-react';

export const DistrictAnalyticsPage: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictSkillData>(DISTRICT_SKILL_DATA[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDistricts = DISTRICT_SKILL_DATA.filter((d) =>
    d.districtName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.primaryIndustries.some(i => i.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="bg-[#F8F5F0] py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Header */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-semibold text-[#4F8279] uppercase tracking-wider block">
            Public Labor Market Intelligence
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#191817]">
            District Skill Analytics & Capacity Mapping
          </h1>
          <p className="text-sm sm:text-base text-[#81766D] leading-relaxed">
            Correlating regional training seat availability in ITIs and polytechnics against verified employer hiring requisitions across industrial corridors.
          </p>
        </div>

        {/* Interactive District Map Canvas */}
        <DistrictMapVisualizer
          selectedDistrictId={selectedDistrict.id}
          onSelectDistrict={(dist) => setSelectedDistrict(dist)}
        />

        {/* District Comparison & Shortages Table */}
        <div className="bg-[#FFFFFF] border border-[#E7E1D9] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E7E1D9]">
            <div>
              <h3 className="text-lg font-serif font-bold text-[#191817]">
                Regional Manufacturing Belts Comparison
              </h3>
              <p className="text-xs text-[#81766D] mt-0.5">
                Supply vs Demand data aggregated from 170+ accredited training centers and MIDC census
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-[#81766D] absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filter by district or industry..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#F8F5F0] border border-[#E7E1D9] rounded-lg focus:outline-hidden focus:border-[#191817]"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8F5F0] text-[#191817] font-semibold border-b border-[#E7E1D9]">
                <tr>
                  <th className="py-3 px-4">District</th>
                  <th className="py-3 px-4">Key Industrial Clusters</th>
                  <th className="py-3 px-4 text-right">Annual Demand</th>
                  <th className="py-3 px-4 text-right">Training Capacity</th>
                  <th className="py-3 px-4 text-center">Supply/Demand</th>
                  <th className="py-3 px-4 text-center">OOWI Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7E1D9]">
                {filteredDistricts.map((d) => (
                  <tr
                    key={d.id}
                    onClick={() => setSelectedDistrict(d)}
                    className={`cursor-pointer transition-colors ${
                      selectedDistrict.id === d.id ? 'bg-[#F3EEE6] font-medium' : 'hover:bg-[#F8F5F0]'
                    }`}
                  >
                    <td className="py-3.5 px-4 font-semibold text-[#191817]">
                      {d.districtName}
                    </td>
                    <td className="py-3.5 px-4 text-[#81766D]">
                      {d.primaryIndustries.slice(0, 3).join(', ')}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono tabular-nums text-[#191817]">
                      {d.annualHiringDemand.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono tabular-nums text-[#81766D]">
                      {d.annualTrainingCapacity.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono font-semibold">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[11px] ${
                          d.supplyDemandRatio > 120
                            ? 'bg-amber-50 text-amber-800'
                            : d.supplyDemandRatio < 80
                            ? 'bg-emerald-50 text-emerald-800'
                            : 'bg-blue-50 text-blue-800'
                        }`}
                      >
                        {d.supplyDemandRatio}%
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] uppercase font-semibold ${
                          d.oowiScore >= 60
                            ? 'bg-red-50 text-red-700'
                            : d.oowiScore >= 48
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-emerald-50 text-emerald-700'
                        }`}
                      >
                        {d.oowiStatus} ({d.oowiScore}/100)
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDistrict(d);
                        }}
                        className="text-[11px] text-[#4F8279] hover:underline font-semibold"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-2 text-[11px] text-[#81766D] flex flex-wrap items-center justify-between gap-2 border-t border-[#E7E1D9]">
            <span>Data source: Quarterly District Skill Planning Surveys & Accredited ITI Portals</span>
            <span>OOWI = Obsolescence and Oversupply Warning Index (Threshold: 150%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
