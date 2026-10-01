# TECH STACK SPECIFICATION DOCUMENT
**Project Name:** Kaushal Setu  
**Architecture:** Microservices & Event-Driven Data Pipeline  

---

> **MANDATORY SYSTEM DIRECTIVE FOR AI & DEVELOPERS:**  
> The frameworks, databases, and libraries defined in this document constitute the locked technical stack for Kaushal Setu. **Do not substitute, replace, or alter these core technologies during implementation.**

---

## 1. System Architecture Diagram

+-----------------------------------------------------------------------------------+
|                            KAUSHAL SETU TECH STACK                                |
+-----------------------------------------------------------------------------------+
| Frontend Layer     | React.js / Next.js (App Router), Tailwind CSS, Leaflet.js   |
| Backend API        | Node.js (Express) & Python FastAPI (Microservices)           |
| Ingestion & Stream | Python Scrapy Crawlers, Apache Kafka                       |
| AI / NLP Engine    | PyTorch, Hugging Face (BERT), spaCy (NER)                    |
| Graph Database     | Neo4j (Skills-to-Jobs Graph Matcher)                        |
| Spatial & Rel DB   | PostgreSQL with PostGIS extension, MongoDB                  |
| Orchestration      | Apache Airflow (DAGs), Docker, Kubernetes                   |
| Security           | OAuth 2.0 / JWT Role-Based Access Control (RBAC)            |
+-----------------------------------------------------------------------------------+

---

## 2. Module-by-Module Technical Specifications

### 2.1 Frontend User Interface
* **Core Framework:** Next.js (React.js) utilizing the App Router architecture.
* **Styling Framework:** Tailwind CSS configured with custom brand tokens.
* **Map & Spatial Rendering:** Leaflet.js / React-Leaflet for interactive district maps and supply-demand heatmaps.
* **State & API Handling:** TanStack Query (React Query) with Axios.

### 2.2 Backend & Microservices API Layer
* **Core API Gateway & App Logic:** Node.js with Express for user session management, RBAC authorization, and document exports.
* **AI & Analytics Service:** Python FastAPI for serving NLP models, running 4-axis scoring algorithms, and querying Neo4j graph data.
* **Authentication Security:** OAuth 2.0 implementation with JWT tokens for role authorization across all 4 stakeholder tiers.

### 2.3 AI, NLP & Data Pipeline
* **Entity Extraction:** Fine-tuned Hugging Face BERT and spaCy NER models for parsing unstructured job postings with 89%+ accuracy.
* **Taxonomy Standards:** Direct mapping to NSQF Qualification Packs (Levels 1–10), ESCO v1.1, and O*NET 28.0.
* **Ingestion Pipeline:** Python Scrapy crawlers for open portal data and Apache Kafka streams for employer survey ingestion.
* **Workflow Orchestration:** Apache Airflow DAGs for automated daily ingestion pipelines and DSAP PDF generation.

### 2.4 Database & Data Storage Layer
* **Graph Database:** Neo4j for skills-to-jobs proximity matching and node relationship graphs.
* **Relational / Geospatial DB:** PostgreSQL with PostGIS extension for district boundary polygons, user data, and metric scoring tables.
* **Document Store:** MongoDB for unstructured raw job ad feeds and survey inputs.

### 2.5 Infrastructure & Deployment
* **Containerization:** Docker containers for isolated service instances.
* **Cluster Management:** Kubernetes with autoscaling for state-wide scalability.
