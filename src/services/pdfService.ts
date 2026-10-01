import jsPDF from 'jspdf';
import { DsapReport, DistrictSkillData } from '../types';

/**
 * Generate a professional, downloadable executive DSAP PDF brief for District Committees
 */
export function generateDsapPdf(report: DsapReport, districtData: DistrictSkillData): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 18;

  // Header Bar
  doc.setFillColor(25, 24, 23); // Deep charcoal #191817
  doc.rect(0, 0, pageWidth, 28, 'F');

  // Title & Emblem text
  doc.setTextColor(248, 245, 240); // Warm ivory
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('GOVERNMENT OF MAHARASHTRA — DISTRICT SKILL DEVELOPMENT COMMITTEE', 14, 11);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(245, 237, 120); // Pale lemon
  doc.text(`DISTRICT SKILL ACTION PLAN (DSAP) · FISCAL YEAR ${report.fiscalYear} · CONFIDENTIAL / COMMITTEE BRIEF`, 14, 18);

  doc.setTextColor(220, 213, 203);
  doc.setFontSize(8);
  doc.text(`District: ${report.districtName.toUpperCase()} · Reference ID: ${report.id.toUpperCase()}`, 14, 24);

  y = 38;

  // Executive Header block
  doc.setTextColor(25, 24, 23);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text(`1. Executive Summary & Labor Supply-Demand Index`, 14, y);
  y += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(80, 75, 70);

  const summaryLines = doc.splitTextToSize(report.executiveSummary, pageWidth - 28);
  doc.text(summaryLines, 14, y);
  y += summaryLines.length * 4.5 + 4;

  // Key District Macro Indicators Table
  doc.setFillColor(243, 238, 230); // Soft cream
  doc.roundedRect(14, y, pageWidth - 28, 26, 2, 2, 'F');

  doc.setTextColor(25, 24, 23);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('District Macro Indicators (Source: Kaushal Setu District Intelligence & MIDC Census)', 18, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(60, 55, 50);

  doc.text(`• Annual Industry Hiring Demand: ${districtData.annualHiringDemand.toLocaleString('en-IN')} positions`, 18, y + 12);
  doc.text(`• ITI / Polytechnic Capacity: ${districtData.annualTrainingCapacity.toLocaleString('en-IN')} seats/year`, 18, y + 17);
  doc.text(`• Training Supply / Demand Ratio: ${districtData.supplyDemandRatio}%`, 18, y + 22);

  const col2X = pageWidth / 2 + 10;
  doc.text(`• Registered Regional Employers: ${districtData.registeredEmployers}`, col2X, y + 12);
  doc.text(`• OOWI Risk Index: ${districtData.oowiScore}/100 (${districtData.oowiStatus.toUpperCase()})`, col2X, y + 17);
  doc.text(`• Active ITI & Technical Institutes: ${districtData.institutionsCount}`, col2X, y + 22);

  y += 34;

  // Section 2: Critical Deficits vs Oversupply Alert
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(25, 24, 23);
  doc.text(`2. Obsolescence & Oversupply Warning Index (OOWI) Findings`, 14, y);
  y += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(79, 130, 121); // Restrained teal
  doc.text('Critical Technician Deficits (Priority Intervention Trades):', 14, y);
  y += 5;

  doc.setTextColor(50, 45, 40);
  districtData.topShortageSkills.slice(0, 3).forEach((item) => {
    doc.text(`- ${item.skill}: Deficit of ${item.deficit.toLocaleString('en-IN')} technicians (Market Demand: ${item.demand.toLocaleString('en-IN')}, Avg Compensation: ${item.avgSalary})`, 18, y);
    y += 4.5;
  });

  y += 2;
  doc.setTextColor(180, 50, 50); // Warning red
  doc.text('Oversupplied / Outdated Curriculum Trades (> 150% Capacity Threshold):', 14, y);
  y += 5;

  doc.setTextColor(50, 45, 40);
  districtData.topOversuppliedTrades.forEach((item) => {
    doc.text(`- ${item.trade}: Training Capacity ${item.capacity} seats vs Industry Need ${item.hiringNeed} (${item.ratio}% Oversupply)`, 18, y);
    y += 4.5;
  });

  y += 6;

  // Section 3: Equipment Reallocation & Modernization Advisory
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(25, 24, 23);
  doc.text(`3. Actionable Equipment Procurement & Lab Reallocation Plan`, 14, y);
  y += 6;

  report.equipmentReallocationPlan.forEach((eq, idx) => {
    doc.setFillColor(idx % 2 === 0 ? 250 : 243, idx % 2 === 0 ? 247 : 238, idx % 2 === 0 ? 242 : 230);
    doc.roundedRect(14, y, pageWidth - 28, 14, 1.5, 1.5, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(25, 24, 23);
    doc.text(`[${eq.action.toUpperCase()}] ${eq.instituteName} — ₹${eq.budgetInLakhs.toFixed(1)} Lakhs`, 18, y + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(80, 75, 70);
    doc.text(`${eq.equipmentType} · ${eq.justification}`, 18, y + 10);

    y += 16;
  });

  y += 4;

  // Section 4: Budget & Sign-off Footer
  doc.setFillColor(25, 24, 23);
  doc.roundedRect(14, y, pageWidth - 28, 22, 2, 2, 'F');

  doc.setTextColor(248, 245, 240);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text(`Total Approved DSAP Allocation: ₹${report.totalBudgetApprovedInLakhs.toFixed(2)} Lakhs`, 18, y + 7);
  doc.text(`Faculty / Master Trainer Upskilling Quota: ${report.trainerUpskillingQuota} Faculty Members`, 18, y + 14);

  const stampX = pageWidth - 65;
  doc.setFontSize(8);
  doc.setTextColor(245, 237, 120);
  doc.text('STATUS: OFFICIALLY ENDORSED', stampX, y + 7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(220, 213, 203);
  doc.text(`Signed by District Collector & DSDO`, stampX, y + 13);

  // Footer page mark
  doc.setTextColor(140, 135, 130);
  doc.setFontSize(7.5);
  doc.text('Kaushal Setu — Academia-Industry Skill Mapping & Action Planning Engine · Verified DSDC Document', 14, 288);

  // Trigger browser download
  doc.save(`DSAP_${report.districtName}_FY${report.fiscalYear.replace('-', '_')}.pdf`);
}
