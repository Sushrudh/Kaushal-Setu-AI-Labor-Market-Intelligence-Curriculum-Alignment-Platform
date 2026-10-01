# PRODUCT REQUIREMENTS DOCUMENT (PRD)
**Project Name:** Kaushal Setu  
**Problem Statement ID:** SIH26134  
**Organization:** Government of Maharashtra | Ministry of Education's Innovation Cell (MIC)  
**Team ID:** 183569 (Kaushal Setu)  

---

## 1. Executive Summary & Vision
Kaushal Setu is an AI-driven labor market intelligence and curriculum alignment platform designed to bridge the gap between traditional vocational training and real-world industrial demand. By replacing slow, multi-year manual revisions with real-time job ad parsing, graph matching, and employer verification, the platform aligns skills training directly with active local hiring needs.

---

## 2. Problem Statement & Objectives

### 2.1 The Problem
* **Curriculum Latency:** Syllabi revisions take 2–3 years, causing training content to become obsolete relative to market evolution.
* **Severe Skill Mismatch:** Vocational trainees graduate with poor employability, while local industries face critical talent shortages.
* **Unoptimized Capital Spend:** Public funds for lab equipment and teacher upskilling programs are spent without empirical market backing.

### 2.2 Key Objectives
* Reduce curriculum revision latency by **4x**.
* Increase graduate placement rates by **+30%**.
* Provide hyper-local district labor market intelligence starting with initial industrial corridors (Pune and Nagpur) and expanding statewide.

---

## 3. Stakeholder Workflows & Role-Based Access Control (RBAC)

1. **District Skill Committees (DSDC / Govt Collectorate):**
   * Monitors spatial labor shortages via district heatmaps.
   * Tracks the Obsolescence & Oversupply Warning Index (OOWI).
   * Generates 1-click District Skill Action Plan (DSAP) executive PDF briefs.

2. **Regional Employers (MIDC & Private Sector):**
   * Inputs hiring needs via MIDC survey forms or job listing feeds.
   * Reviews proposed syllabus changes using the GitHub-style "Syllabus Diff" engine.
   * Digitally endorses revised curricula with a 1-click approval button.

3. **Vocational Institutions (ITIs, Polytechnics, Universities):**
   * Analyzes curriculum gaps identified through multi-axis scoring.
   * Modifies course syllabi using AI-recommended NSQF-aligned modules.
   * Identifies faculty upskilling requirements.

4. **Trainees & Job Seekers:**
   * Receives automated skill proximity scores against live job ads.
   * Accesses personalized learning pathways to address skill gaps.

---

## 4. Key Functional Requirements & Unique Selling Points (USPs)

* **GitHub-Style "Syllabus Diff" Engine:** Displays added skills in **green** and outdated topics in **red**, featuring a 1-click "Employer Approve & Endorse" action.
* **Obsolescence & Oversupply Warning Index (OOWI):** Flags training programs when trainee output exceeds local hiring capacity (e.g., threshold > 150%).
* **4-Axis Demand Scoring Model:** Evaluates demand intensity using:
  $$\text{Demand Intensity} = f(\text{Role}, \text{Skill}, \text{District Location}, \text{Proficiency Level})$$
* **Automated DSAP PDF Exporter:** Generates executive briefs for government committees to guide capital spend and equipment procurement.
