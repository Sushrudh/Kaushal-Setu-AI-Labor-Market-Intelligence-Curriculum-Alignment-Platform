export type UserRole = 'dsdc' | 'employer' | 'institution' | 'student';

export interface VerifiedAssessment {
  id: string;
  skill: string;
  category: 'Technical' | 'Tools & Machines' | 'Metrology & Quality' | 'Safety & Industrial Protocols';
  score: number; // e.g. 88
  maxScore: number; // e.g. 100
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced';
  assessmentBody: string;
  assessmentDate: string;
  certificateHash: string;
}

export interface CourseCompletion {
  id: string;
  courseTitle: string;
  institution: string;
  completionDate: string;
  grade: string;
  modulesCompleted: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organization?: string;
  district?: string;
  designation?: string;
  avatarUrl?: string;
  phone?: string;
  skills?: string[];
  nsqfLevel?: number;
  bio?: string;
  verifiedAssessments?: VerifiedAssessment[];
  courseCompletions?: CourseCompletion[];
}

export interface DistrictSkillData {
  id: string;
  districtName: string;
  state: string;
  annualHiringDemand: number;
  annualTrainingCapacity: number;
  supplyDemandRatio: number; // percentage, e.g. 142%
  oowiScore: number; // 0 - 100 obsolescence & oversupply risk index
  oowiStatus: 'critical' | 'warning' | 'balanced' | 'shortage';
  primaryIndustries: string[];
  topShortageSkills: { skill: string; demand: number; deficit: number; avgSalary: string }[];
  topOversuppliedTrades: { trade: string; capacity: number; hiringNeed: number; ratio: number }[];
  institutionsCount: number;
  registeredEmployers: number;
  activeOpenings: number;
  description: string;
  geoCoords: [number, number]; // lat, lng
}

export interface NsqfCourse {
  id: string;
  courseCode: string;
  title: string;
  sector: string;
  nsqfLevel: number;
  durationHours: number;
  entryQualification: string;
  description: string;
  coreCompetencies: string[];
  employabilitySkills: string[];
  targetJobRoles: string[];
  industryDemandIndex: number; // 1-100
  lastRevisionDate: string;
  isObsoleteFlag?: boolean;
}

export interface SyllabusModule {
  id: string;
  title: string;
  theoryHours: number;
  practicalHours: number;
  description: string;
  learningOutcomes: string[];
  status: 'existing' | 'added' | 'removed' | 'modified';
  changeRationale?: string;
  industryEndorsed?: boolean;
}

export interface CourseSyllabusDiff {
  courseId: string;
  courseTitle: string;
  institutionId: string;
  institutionName: string;
  currentVersion: string;
  proposedVersion: string;
  lastUpdated: string;
  status: 'draft' | 'pending_review' | 'endorsed' | 'rejected';
  modules: SyllabusModule[];
  endorsements: {
    employerId: string;
    employerName: string;
    endorserName: string;
    date: string;
    feedback: string;
    signatureHash: string;
  }[];
}

export interface JobRequisition {
  id: string;
  employerId: string;
  employerName: string;
  district: string;
  title: string;
  sector: string;
  nsqfLevel: number;
  openings: number;
  experienceMonths: number;
  salaryRange: string;
  description: string;
  requiredSkills: { skill: string; proficiency: 'Beginner' | 'Intermediate' | 'Advanced'; isMandatory: boolean }[];
  postedDate: string;
  status: 'active' | 'filled' | 'urgent';
  workType: 'Full-time' | 'Apprenticeship' | 'Contract';
}

export interface CandidateProfile {
  id: string;
  name: string;
  email: string;
  district: string;
  nsqfLevel: number;
  trade: string;
  institutionName: string;
  completionYear: number;
  skills: { skill: string; rating: number }[]; // rating 1-5
  proximityMatchScore?: number; // 0-100%
  availability: 'Immediate' | 'Within 15 Days' | 'Within 30 Days';
  portfolioUrl?: string;
  verifiedBadges: string[];
}

export interface TrainerUpskillingRecord {
  id: string;
  trainerName: string;
  specialization: string;
  currentSkills: string[];
  requiredSkills: string[];
  targetModule: string;
  upskillingStatus: 'Completed' | 'In Progress' | 'Action Needed';
  recommendedProgram: string;
  durationWeeks: number;
}

export interface DsapReport {
  id: string;
  districtId: string;
  districtName: string;
  fiscalYear: string;
  createdDate: string;
  preparedBy: string;
  executiveSummary: string;
  supplyVsDemandAnalysis: string;
  equipmentReallocationPlan: {
    instituteName: string;
    action: 'Procure New' | 'Decommission' | 'Upgrade Lab';
    equipmentType: string;
    budgetInLakhs: number;
    justification: string;
  }[];
  trainerUpskillingQuota: number;
  totalBudgetApprovedInLakhs: number;
  status: 'Draft' | 'Finalized' | 'Approved by Collector';
}
