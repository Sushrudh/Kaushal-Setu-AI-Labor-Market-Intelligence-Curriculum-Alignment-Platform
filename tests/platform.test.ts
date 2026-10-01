import fs from 'fs';
import path from 'path';
import { calculate4AxisDemandScore, extractSkillsFromJobDescription } from '../src/services/geminiService';
import { runConcurrentLoadTest } from '../src/services/scalabilityService';
import { DISTRICT_SKILL_DATA, NSQF_COURSES, DEMO_USERS } from '../src/data/mockData';

let testsPassed = 0;
let testsFailed = 0;

function assert(condition: boolean, testName: string) {
  if (condition) {
    console.log(`[PASS] ${testName}`);
    testsPassed++;
  } else {
    console.error(`[FAIL] ${testName}`);
    testsFailed++;
  }
}

async function runTests() {
  console.log('--- Starting Kaushal Setu Platform Automated Verification ---\n');

  // Test 1: 4-Axis Demand Scoring Model
  const score1 = calculate4AxisDemandScore({
    roleImportance: 9,
    skillScarcity: 9,
    districtGrowthWeight: 8,
    proficiencyMultiplier: 1.25,
  });
  assert(score1.score >= 85 && score1.label === 'Critical Shortage', '4-Axis Demand Scoring: Critical Shortage classification');

  const score2 = calculate4AxisDemandScore({
    roleImportance: 3,
    skillScarcity: 2,
    districtGrowthWeight: 3,
    proficiencyMultiplier: 1.0,
  });
  assert(score2.score < 50 && score2.label === 'Balanced', '4-Axis Demand Scoring: Balanced classification');

  // Test 2: AI & Rule-Based Skill Extraction
  const jobSample = 'Urgent hiring for 10 CNC operators in Pune with experience in 5-axis milling, CAM toolpaths, Fanuc G-code programming, and micrometer inspection.';
  const extraction = await extractSkillsFromJobDescription(jobSample);
  assert(extraction.extractedSkills.length >= 3, 'Skill Extraction: Discovers at least 3 core technical skills');
  assert(extraction.extractedSkills.some(s => s.skill.includes('CNC') || s.skill.includes('G-Code')), 'Skill Extraction: Identifies CNC / G-Code competencies');
  assert(extraction.nsqfLevel === 4 || extraction.nsqfLevel === 5, 'Skill Extraction: Correctly identifies NSQF Level 4/5');

  // Test 3: OOWI Warning Index Threshold
  const pune = DISTRICT_SKILL_DATA[0];
  const threshold150 = 150;
  const oversupplied150 = pune.topOversuppliedTrades.filter(t => t.ratio >= threshold150);
  assert(oversupplied150.length >= 2, 'OOWI Engine: Isolates trades exceeding 150% threshold');
  assert(oversupplied150.every(t => t.ratio >= 150), 'OOWI Engine: Every filtered trade strictly exceeds configured threshold');

  // Test 4: Stakeholder Role Completeness
  const requiredRoles = ['dsdc', 'employer', 'institution', 'student'];
  for (const role of requiredRoles) {
    assert(DEMO_USERS[role] !== undefined, `RBAC Integrity: Demo persona exists for role "${role}"`);
    assert(DEMO_USERS[role].role === role, `RBAC Integrity: Persona role matches "${role}"`);
  }

  // Test 5: NSQF Course Catalog
  assert(NSQF_COURSES.length >= 4, 'NSQF Catalog: Contains core accredited vocational courses');
  const obsoleteCourse = NSQF_COURSES.find(c => c.isObsoleteFlag);
  assert(obsoleteCourse !== undefined && obsoleteCourse.industryDemandIndex < 30, 'Curriculum Diagnostics: Flags obsolete legacy drafting courses with low demand index');

  // Test 6: Source Specification Files Verification
  const sourceFiles = [
    'DESIGN_DOCUMENT_UI_BLUEPRINT.md',
    'PRODUCT_REQUIREMENTS_DOCUMENT_PRD.md',
    'TECH_STACK_SPECIFICATION.md',
  ];
  for (const file of sourceFiles) {
    const filePath = path.resolve(process.cwd(), 'source', file);
    const exists = fs.existsSync(filePath);
    assert(exists, `Source Verification: File "source/${file}" exists in root directory`);
    if (exists) {
      const content = fs.readFileSync(filePath, 'utf-8');
      assert(content.length > 500, `Source Verification: File "source/${file}" is non-empty and readable`);
    }
  }

  // Test 7: Scalability & Load Testing Engine Execution
  const loadTestBenchmark = await runConcurrentLoadTest({
    concurrentUsers: 1000,
    totalRequests: 200,
    durationSeconds: 1,
    endpoints: ['/api/v1/districts/pune/intelligence', '/api/v1/curriculum/diff/cnc-2026'],
  });
  assert(loadTestBenchmark.successfulRequests > 0, 'Scalability Engine: Dispatches and resolves concurrent requests');
  assert(loadTestBenchmark.errorRate === 0, 'Scalability Engine: 0.00% error rate under concurrent workload');
  assert(loadTestBenchmark.latency.p95 < 150, 'Scalability Engine: Verified p95 latency within SLA threshold');

  // Test 8: Skill Standardization & Taxonomy Cross-Mapping (Capability B, Example 2)
  const { standardizeSkill } = await import('../src/services/taxonomyService');
  const mappedCnc = standardizeSkill('5-axis milling');
  assert(mappedCnc.canonicalId === 'skill-cnc-5axis', 'Taxonomy Mapping: Correctly maps synonym "5-axis milling" to canonical skill');
  assert(mappedCnc.nsqfMapping.qpCode === 'CSC/Q0115', 'Taxonomy Mapping: Cross-maps to verified NSQF QP code CSC/Q0115');
  assert(mappedCnc.escoMapping !== undefined && mappedCnc.escoMapping.conceptUri.includes('esco'), 'Taxonomy Mapping: Cross-maps to ESCO concept URI');
  assert(mappedCnc.onetMapping !== undefined && mappedCnc.onetMapping.socCode === '51-4011.00', 'Taxonomy Mapping: Cross-maps to O*NET SOC code');

  const unmappedTerm = standardizeSkill('quantum wrench calibration 2099');
  assert(unmappedTerm.matchType === 'unresolved', 'Taxonomy Mapping: Explicitly identifies unrecognized terms as unresolved');
  assert(unmappedTerm.nsqfMapping.qpCode === undefined, 'Taxonomy Mapping: Does NOT fabricate fake QP codes for unmapped terms');

  // Test 9: Transparent Skills-to-Jobs Graph Matching (Capability C, Example 4)
  const { calculateSkillsCoverage } = await import('../src/services/graphMatchingService');
  const testRequiredSkills = [
    { skill: 'G-Code Programming', proficiency: 'Intermediate' as const, isMandatory: true },
    { skill: 'CNC Lathe Operation', proficiency: 'Intermediate' as const, isMandatory: true },
    { skill: 'Vernier Caliper Inspection', proficiency: 'Intermediate' as const, isMandatory: true },
    { skill: 'Blueprint Reading', proficiency: 'Intermediate' as const, isMandatory: true },
    { skill: 'Industrial Safety', proficiency: 'Beginner' as const, isMandatory: true },
    { skill: 'CAD Modeling', proficiency: 'Beginner' as const, isMandatory: false },
    { skill: 'MIG Welding', proficiency: 'Beginner' as const, isMandatory: false },
    { skill: '5-Axis CAM Programming', proficiency: 'Advanced' as const, isMandatory: true },
    { skill: 'CMM Touch-Probe Calibration', proficiency: 'Advanced' as const, isMandatory: false },
    { skill: 'Robotic Arm Integration', proficiency: 'Advanced' as const, isMandatory: false },
  ]; // 10 skills
  const testStudentEvidence = [
    { skill: 'G-Code Programming', proficiency: 'Intermediate' as const, evidenceSource: 'verified_assessment' as const },
    { skill: 'CNC Lathe Operation', proficiency: 'Intermediate' as const, evidenceSource: 'verified_assessment' as const },
    { skill: 'Vernier Caliper Inspection', proficiency: 'Intermediate' as const, evidenceSource: 'verified_assessment' as const },
    { skill: 'Blueprint Reading', proficiency: 'Intermediate' as const, evidenceSource: 'course_completion' as const },
    { skill: 'Industrial Safety', proficiency: 'Beginner' as const, evidenceSource: 'verified_assessment' as const },
    { skill: 'CAD Modeling', proficiency: 'Beginner' as const, evidenceSource: 'self_declared' as const },
    { skill: 'MIG Welding', proficiency: 'Beginner' as const, evidenceSource: 'course_completion' as const },
  ]; // 7 skills matched, 3 missing

  const coverageResult = calculateSkillsCoverage('Precision CNC Machinist', 'Tata Motors', testRequiredSkills, testStudentEvidence);
  assert(coverageResult.totalRequired === 10, 'Graph Matching: Accurately identifies 10 total required skills');
  assert(coverageResult.matchedCount === 7, 'Graph Matching: Accurately identifies 7 matched demonstrated skills');
  assert(coverageResult.missingCount === 3, 'Graph Matching: Accurately isolates 3 missing skill deficits');
  assert(coverageResult.baselineCoveragePercent === 70, 'Graph Matching: Deterministic baseline coverage produces exactly 70%');
  assert(coverageResult.missingSkills.some(m => m.skill.includes('5-Axis')), 'Graph Matching: Highlights missing 5-Axis CAM deficit');

  // Test 10: Student Data Isolation and Privacy Integrity (Capability H, Example 3 & 10)
  const studentUser = DEMO_USERS['student'];
  assert(studentUser.id === 'usr_stud_aarav', 'Data Isolation: Student record bound to authenticated user ID');
  assert(studentUser.verifiedAssessments !== undefined && studentUser.verifiedAssessments.length >= 4, 'Data Integrity: Student has verified assessment board records');
  assert(Boolean(studentUser.verifiedAssessments && studentUser.verifiedAssessments.every(a => a.certificateHash.startsWith('sha256:'))), 'Security: Every verified assessment record contains a cryptographic certificate hash');

  console.log(`\nVerification Summary: ${testsPassed} passed, ${testsFailed} failed.`);

  if (testsFailed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runTests().catch(err => {
  console.error('Test execution error:', err);
  process.exit(1);
});
