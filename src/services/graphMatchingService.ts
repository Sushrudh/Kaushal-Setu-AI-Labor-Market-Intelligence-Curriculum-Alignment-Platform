/**
 * Skills-to-Jobs Graph Matching and Transparent Coverage Engine
 * Connects Students, Skills, Courses, Occupations, Jobs, Employers, and Institutions.
 * Implements deterministic baseline coverage, weighted proficiency coverage, and explainable gap pathways.
 */

export interface SkillRequirement {
  skill: string;
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced';
  isMandatory: boolean;
  weight?: number; // 1 to 5
}

export interface StudentDemonstratedSkill {
  skill: string;
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced';
  evidenceSource: 'verified_assessment' | 'course_completion' | 'self_declared';
  verifiedScore?: number;
  assessmentBody?: string;
  assessmentDate?: string;
}

export interface MatchAnalysisResult {
  jobTitle: string;
  employerName: string;
  totalRequired: number;
  matchedCount: number;
  missingCount: number;
  baselineCoveragePercent: number; // e.g. 70%
  weightedCoveragePercent: number;
  allMandatoryMet: boolean;
  matchedSkills: {
    skill: string;
    requiredProficiency: 'Beginner' | 'Intermediate' | 'Advanced';
    studentProficiency: 'Beginner' | 'Intermediate' | 'Advanced';
    evidenceSource: 'verified_assessment' | 'course_completion' | 'self_declared';
    proficiencyGap: 'Adequate' | 'Exceeds' | 'Needs Higher Proficiency';
    verifiedScore?: number;
  }[];
  missingSkills: {
    skill: string;
    requiredProficiency: 'Beginner' | 'Intermediate' | 'Advanced';
    isMandatory: boolean;
    recommendedBridgeAction: string;
    accreditedInstitute: string;
  }[];
  explanationSummary: string;
  readinessLabel: 'Ready for Immediate Deployment' | 'Minor Bridge Course Required' | 'Extensive Upskilling Needed';
}

const proficiencyWeights: Record<'Beginner' | 'Intermediate' | 'Advanced', number> = {
  Beginner: 1,
  Intermediate: 2,
  Advanced: 3,
};

/**
 * Compare student skills against job requirements with explainable audit trail
 */
export function calculateSkillsCoverage(
  jobTitle: string,
  employerName: string,
  requiredSkills: SkillRequirement[],
  studentSkills: StudentDemonstratedSkill[]
): MatchAnalysisResult {
  if (!requiredSkills || requiredSkills.length === 0) {
    return {
      jobTitle,
      employerName,
      totalRequired: 0,
      matchedCount: 0,
      missingCount: 0,
      baselineCoveragePercent: 100,
      weightedCoveragePercent: 100,
      allMandatoryMet: true,
      matchedSkills: [],
      missingSkills: [],
      explanationSummary: 'No specific prerequisite skills declared for this position.',
      readinessLabel: 'Ready for Immediate Deployment',
    };
  }

  const matchedSkills: MatchAnalysisResult['matchedSkills'] = [];
  const missingSkills: MatchAnalysisResult['missingSkills'] = [];

  let totalWeight = 0;
  let earnedWeight = 0;
  let allMandatoryMet = true;

  for (const req of requiredSkills) {
    const weight = req.weight || (req.isMandatory ? 3 : 2);
    totalWeight += weight;

    // Find student evidence matching the required skill (stem / exact / normalized)
    const match = studentSkills.find((s) => {
      const sNorm = s.skill.toLowerCase().trim();
      const rNorm = req.skill.toLowerCase().trim();
      return (
        sNorm === rNorm ||
        sNorm.includes(rNorm) ||
        rNorm.includes(sNorm) ||
        sNorm.split(' ')[0] === rNorm.split(' ')[0]
      );
    });

    if (match) {
      const studentP = proficiencyWeights[match.proficiency] || 1;
      const requiredP = proficiencyWeights[req.proficiency] || 2;

      let gap: 'Adequate' | 'Exceeds' | 'Needs Higher Proficiency' = 'Adequate';
      if (studentP < requiredP) {
        gap = 'Needs Higher Proficiency';
        earnedWeight += weight * 0.7; // partial weight for skill with lower proficiency
        if (req.isMandatory) {
          allMandatoryMet = false;
        }
      } else if (studentP > requiredP) {
        gap = 'Exceeds';
        earnedWeight += weight;
      } else {
        gap = 'Adequate';
        earnedWeight += weight;
      }

      matchedSkills.push({
        skill: req.skill,
        requiredProficiency: req.proficiency,
        studentProficiency: match.proficiency,
        evidenceSource: match.evidenceSource,
        proficiencyGap: gap,
        verifiedScore: match.verifiedScore,
      });
    } else {
      if (req.isMandatory) {
        allMandatoryMet = false;
      }
      missingSkills.push({
        skill: req.skill,
        requiredProficiency: req.proficiency,
        isMandatory: req.isMandatory,
        recommendedBridgeAction: `2-Week Hands-on Modular Lab in ${req.skill}`,
        accreditedInstitute: 'Govt ITI Aundh (Advanced Machining CoE)',
      });
    }
  }

  const totalRequired = requiredSkills.length;
  const matchedCount = matchedSkills.length;
  const missingCount = missingSkills.length;

  // Simple unweighted baseline coverage percentage (e.g. 7 of 10 = 70%)
  const baselineCoveragePercent = Math.round((matchedCount / Math.max(1, totalRequired)) * 100);

  // Weighted coverage accounting for mandatory importance and proficiency levels
  const weightedCoveragePercent = Math.round((earnedWeight / Math.max(1, totalWeight)) * 100);

  let readinessLabel: MatchAnalysisResult['readinessLabel'] = 'Minor Bridge Course Required';
  if (baselineCoveragePercent >= 85 && allMandatoryMet) {
    readinessLabel = 'Ready for Immediate Deployment';
  } else if (baselineCoveragePercent < 60 || !allMandatoryMet) {
    readinessLabel = 'Extensive Upskilling Needed';
  }

  const explanationSummary = `Demonstrated evidence for ${matchedCount} of ${totalRequired} required skills (${baselineCoveragePercent}% baseline coverage). ${
    missingCount > 0
      ? `Identified ${missingCount} deficit competencies: ${missingSkills.map((m) => m.skill).join(', ')}.`
      : 'All core competencies are verified in your portfolio.'
  } Note: This metric represents transparent skill coverage, not an automated guarantee of employment.`;

  return {
    jobTitle,
    employerName,
    totalRequired,
    matchedCount,
    missingCount,
    baselineCoveragePercent,
    weightedCoveragePercent,
    allMandatoryMet,
    matchedSkills,
    missingSkills,
    explanationSummary,
    readinessLabel,
  };
}
