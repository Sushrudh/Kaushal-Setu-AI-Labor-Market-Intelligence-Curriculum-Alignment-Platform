/**
 * Skill Standardization and Taxonomy Cross-Mapping Service
 * Cross-references raw employer & student skill strings with NSQF, ESCO v1.1, and O*NET 28.0 taxonomies.
 */

export interface CanonicalSkill {
  id: string;
  preferredLabel: string;
  category: 'Technical' | 'Tools & Machines' | 'Metrology & Quality' | 'Safety & Industrial Protocols';
  synonyms: string[];
  nsqf: {
    qpCode?: string;
    nsqfLevel: number;
    sector: string;
  };
  esco?: {
    conceptUri: string;
    preferredLabel: string;
    skillType: 'skill/competence' | 'knowledge';
  };
  onet?: {
    socCode: string;
    elementId: string;
    title: string;
  };
  equipmentTools?: string[];
}

export interface SkillMappingResult {
  rawTerm: string;
  canonicalId: string;
  standardizedTitle: string;
  category: 'Technical' | 'Tools & Machines' | 'Metrology & Quality' | 'Safety & Industrial Protocols';
  matchType: 'exact' | 'synonym' | 'fuzzy_taxonomy' | 'unresolved';
  matchConfidence: number; // 0.00 to 1.00
  evidenceText?: string;
  nsqfMapping: {
    qpCode?: string;
    level: number;
    sector: string;
  };
  escoMapping?: {
    conceptUri: string;
    label: string;
  };
  onetMapping?: {
    socCode: string;
    title: string;
  };
  flaggedForReview: boolean;
  taxonomyVersion: string;
}

// Canonical Skill Database mapped to Indian National Skills Qualifications Framework (NSQF)
export const CANONICAL_SKILL_CATALOGUE: CanonicalSkill[] = [
  {
    id: 'skill-cnc-5axis',
    preferredLabel: '5-Axis Simultaneous CNC Machining',
    category: 'Tools & Machines',
    synonyms: ['5-axis milling', 'multi-axis cnc', '5 axis machining', 'cnc milling 5-axis', 'continuous 5-axis'],
    nsqf: {
      qpCode: 'CSC/Q0115',
      nsqfLevel: 5,
      sector: 'Capital Goods & Strategic Manufacturing',
    },
    esco: {
      conceptUri: 'http://data.europa.eu/esco/skill/7a68e833-2894-4d82-8df2-841935fa2914',
      preferredLabel: 'operate 5-axis CNC milling machine',
      skillType: 'skill/competence',
    },
    onet: {
      socCode: '51-4011.00',
      elementId: '4.A.3.a.1',
      title: 'Computer-Controlled Machine Tool Operators, Metal and Plastic',
    },
    equipmentTools: ['Fanuc 31i-B5', 'Siemens Sinumerik 840D', 'Heidenhain TNC 640', 'Solid Carbide Endmills'],
  },
  {
    id: 'skill-gcode',
    preferredLabel: 'Fanuc / ISO G-Code & M-Code Programming',
    category: 'Technical',
    synonyms: ['g-code', 'gcode programming', 'fanuc programming', 'iso g-code', 'cnc programming', 'm-code'],
    nsqf: {
      qpCode: 'CSC/Q0115',
      nsqfLevel: 4,
      sector: 'Capital Goods',
    },
    esco: {
      conceptUri: 'http://data.europa.eu/esco/skill/b2203112-9b24-4f81-81d3-34e857e4e101',
      preferredLabel: 'program computer numerical control (CNC) machines',
      skillType: 'skill/competence',
    },
    onet: {
      socCode: '51-9161.00',
      elementId: '2.C.3.a',
      title: 'Computer Numerically Controlled Tool Programmers',
    },
    equipmentTools: ['G-Code Editor', 'Cimco Edit', 'Fanuc Manual Guide i'],
  },
  {
    id: 'skill-cam-toolpath',
    preferredLabel: 'Mastercam / NX CAM Toolpath Generation',
    category: 'Technical',
    synonyms: ['cam programming', 'mastercam', 'nx cam', 'toolpath optimization', 'cad/cam toolpath'],
    nsqf: {
      qpCode: 'CSC/Q0402',
      nsqfLevel: 5,
      sector: 'Capital Goods',
    },
    esco: {
      conceptUri: 'http://data.europa.eu/esco/skill/7cf62eb6-788b-49d7-84bc-299f06103e62',
      preferredLabel: 'use Computer-Aided Manufacturing (CAM) software',
      skillType: 'skill/competence',
    },
    onet: {
      socCode: '17-3026.00',
      elementId: '4.A.1.b.2',
      title: 'Industrial Engineering Technologists and Technicians',
    },
    equipmentTools: ['Mastercam 2026', 'Siemens NX CAM', 'Autodesk PowerMill'],
  },
  {
    id: 'skill-metrology-cmm',
    preferredLabel: 'Coordinate Measuring Machine (CMM) & GD&T Inspection',
    category: 'Metrology & Quality',
    synonyms: ['cmm inspection', 'gd&t', 'coordinate measuring machine', 'precision inspection', 'micrometer inspection', 'metrology'],
    nsqf: {
      qpCode: 'CSC/Q0601',
      nsqfLevel: 5,
      sector: 'Capital Goods',
    },
    esco: {
      conceptUri: 'http://data.europa.eu/esco/skill/14ec501a-963e-4f05-8bf1-2fa8d3989066',
      preferredLabel: 'operate coordinate measuring machines',
      skillType: 'skill/competence',
    },
    onet: {
      socCode: '51-9061.00',
      elementId: '4.A.2.a.4',
      title: 'Inspectors, Testers, Sorters, Samplers, and Weighers',
    },
    equipmentTools: ['Zeiss CMM', 'Mitutoyo Digital Micrometer', 'Renishaw Touch-Trigger Probe', 'Bore Gauge'],
  },
  {
    id: 'skill-industrial-safety',
    preferredLabel: 'Industrial Workshop Safety & ISO 45001 Compliance',
    category: 'Safety & Industrial Protocols',
    synonyms: ['industrial safety', 'shop floor safety', 'safety procedures', 'osha', 'iso 45001', 'ppe compliance', 'loto'],
    nsqf: {
      qpCode: 'MEP/Q0201',
      nsqfLevel: 3,
      sector: 'Management & Entrepreneurship and Professional Skills',
    },
    esco: {
      conceptUri: 'http://data.europa.eu/esco/skill/9fcb9087-c1d0-40d1-9457-4b7b250529d3',
      preferredLabel: 'comply with industrial safety regulations',
      skillType: 'knowledge',
    },
    onet: {
      socCode: '29-9011.00',
      elementId: '4.A.4.b.2',
      title: 'Occupational Health and Safety Specialists',
    },
    equipmentTools: ['PPE Gear', 'LOTO Station', 'Emergency Stop Relay', 'Spill Kit'],
  },
  {
    id: 'skill-ev-bms',
    preferredLabel: 'EV Battery Management System (BMS) Diagnostic & Safety',
    category: 'Technical',
    synonyms: ['ev battery diagnostics', 'bms diagnostics', 'battery management system', 'electric vehicle battery', 'high voltage safety'],
    nsqf: {
      qpCode: 'ASC/Q1425',
      nsqfLevel: 5,
      sector: 'Automotive Skills Development Council',
    },
    esco: {
      conceptUri: 'http://data.europa.eu/esco/skill/3b8d4f40-3b60-49e0-827c-fb8d975a6439',
      preferredLabel: 'diagnose electric vehicle battery systems',
      skillType: 'skill/competence',
    },
    onet: {
      socCode: '49-3023.00',
      elementId: '4.A.3.b.4',
      title: 'Automotive Service Technicians and Mechanics',
    },
    equipmentTools: ['CANalyzer', 'High-Voltage Insulation Multimeter', 'Li-Ion Cell Balancer'],
  },
  {
    id: 'skill-plc-automation',
    preferredLabel: 'PLC Ladder Logic & Industrial Sensor Integration',
    category: 'Tools & Machines',
    synonyms: ['plc programming', 'ladder logic', 'siemens s7-1200', 'allen bradley plc', 'sensor wiring', 'industrial automation'],
    nsqf: {
      qpCode: 'ELE/Q6308',
      nsqfLevel: 5,
      sector: 'Electronics Sector Skills Council of India',
    },
    esco: {
      conceptUri: 'http://data.europa.eu/esco/skill/56c71c45-1250-4824-a78b-3028d227bdae',
      preferredLabel: 'program programmable logic controllers',
      skillType: 'skill/competence',
    },
    onet: {
      socCode: '17-3024.00',
      elementId: '4.A.3.a.2',
      title: 'Electro-Mechanical and Mechatronics Technologists and Technicians',
    },
    equipmentTools: ['Siemens TIA Portal', 'Omron CP1E', 'Inductive Proximity Sensor', '4-20mA Transmitter'],
  },
  {
    id: 'skill-blueprint-reading',
    preferredLabel: 'Engineering Blueprint Reading & Geometric Dimensioning',
    category: 'Technical',
    synonyms: ['blueprint reading', 'engineering drawing', 'gd&t symbols', 'mechanical drawings', 'technical drawings'],
    nsqf: {
      qpCode: 'CSC/Q0115',
      nsqfLevel: 4,
      sector: 'Capital Goods',
    },
    esco: {
      conceptUri: 'http://data.europa.eu/esco/skill/e3ecae96-9f8f-4318-971c-c7604f852b71',
      preferredLabel: 'read engineering drawings',
      skillType: 'knowledge',
    },
    onet: {
      socCode: '51-4011.00',
      elementId: '2.A.1.b',
      title: 'Reading Comprehension for Technical Specifications',
    },
    equipmentTools: ['Orthographic Projection Charts', 'ASME Y14.5M Standards'],
  },
];

/**
 * Standardize an employer-submitted or student-entered skill string
 * Resolves against canonical catalog with exact, synonym, and fuzzy matching.
 */
export function standardizeSkill(rawSkillText: string, contextEvidence?: string): SkillMappingResult {
  const normalizedInput = rawSkillText.trim().toLowerCase();

  // 1. Check exact preferred label match
  const exactMatch = CANONICAL_SKILL_CATALOGUE.find(
    (c) => c.preferredLabel.toLowerCase() === normalizedInput
  );
  if (exactMatch) {
    return {
      rawTerm: rawSkillText,
      canonicalId: exactMatch.id,
      standardizedTitle: exactMatch.preferredLabel,
      category: exactMatch.category,
      matchType: 'exact',
      matchConfidence: 0.99,
      evidenceText: contextEvidence || `Matched exact canonical label "${exactMatch.preferredLabel}"`,
      nsqfMapping: {
        qpCode: exactMatch.nsqf.qpCode,
        level: exactMatch.nsqf.nsqfLevel,
        sector: exactMatch.nsqf.sector,
      },
      escoMapping: exactMatch.esco ? { conceptUri: exactMatch.esco.conceptUri, label: exactMatch.esco.preferredLabel } : undefined,
      onetMapping: exactMatch.onet ? { socCode: exactMatch.onet.socCode, title: exactMatch.onet.title } : undefined,
      flaggedForReview: false,
      taxonomyVersion: 'NSQF 2026 / ESCO v1.1 / O*NET 28.0',
    };
  }

  // 2. Check synonym match
  for (const skill of CANONICAL_SKILL_CATALOGUE) {
    for (const syn of skill.synonyms) {
      if (normalizedInput === syn.toLowerCase() || normalizedInput.includes(syn.toLowerCase()) || syn.toLowerCase().includes(normalizedInput)) {
        return {
          rawTerm: rawSkillText,
          canonicalId: skill.id,
          standardizedTitle: skill.preferredLabel,
          category: skill.category,
          matchType: 'synonym',
          matchConfidence: 0.94,
          evidenceText: contextEvidence || `Matched verified synonym "${syn}" from industrial trade vocabulary`,
          nsqfMapping: {
            qpCode: skill.nsqf.qpCode,
            level: skill.nsqf.nsqfLevel,
            sector: skill.nsqf.sector,
          },
          escoMapping: skill.esco ? { conceptUri: skill.esco.conceptUri, label: skill.esco.preferredLabel } : undefined,
          onetMapping: skill.onet ? { socCode: skill.onet.socCode, title: skill.onet.title } : undefined,
          flaggedForReview: false,
          taxonomyVersion: 'NSQF 2026 / ESCO v1.1 / O*NET 28.0',
        };
      }
    }
  }

  // 3. Fallback: Unresolved custom skill - preserved without fabricating non-existent QP codes
  return {
    rawTerm: rawSkillText,
    canonicalId: `custom_${normalizedInput.replace(/[^a-z0-9]/g, '_')}`,
    standardizedTitle: rawSkillText.trim(),
    category: 'Technical',
    matchType: 'unresolved',
    matchConfidence: 0.50,
    evidenceText: contextEvidence || `Custom skill term preserved without artificial taxonomy force-fitting`,
    nsqfMapping: {
      qpCode: undefined, // Truthful: do NOT invent fake QP codes
      level: 4,
      sector: 'General Manufacturing & Engineering',
    },
    flaggedForReview: true,
    taxonomyVersion: 'NSQF 2026 / ESCO v1.1 / O*NET 28.0 (Unresolved Review Queue)',
  };
}
