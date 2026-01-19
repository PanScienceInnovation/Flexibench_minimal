// Flexibench Content Data

export const useCases = [
  // Healthcare & Life Sciences
  {
    id: 1,
    title: "Clinical Notes Entity Extraction for Diagnostics",
    industry: "Healthcare & Life Sciences",
    modality: "Text",
    problem: "Clinicians struggled to surface key medical entities in unstructured clinical text.",
    solution: "Annotated symptoms, treatments, labs, and conditions with ontology linkage.",
    impact: "Improved diagnostic retrieval accuracy and faster clinician insights.",
  },
  {
    id: 2,
    title: "Pedestrian Occlusion Track Annotation for AV Safety",
    industry: "Automotive & Mobility",
    modality: "Video",
    problem: "Autonomous systems misidentified partially occluded pedestrians.",
    solution: "Frame-level tracking with temporal identity continuity.",
    impact: "Reduced false negatives and strengthened AV detection fidelity.",
  },
  {
    id: 3,
    title: "Telehealth Risk Signal Annotation",
    industry: "Healthcare & Life Sciences",
    modality: "Text",
    problem: "Telehealth calls contained ambiguous patient symptom descriptions.",
    solution: "Tagged safety risk phrases and escalation indicators.",
    impact: "Reduced misclassification of critical cases by AI triage systems.",
  },
  // Automotive & Mobility
  {
    id: 4,
    title: "Radiology Tumor Boundary Segmentation",
    industry: "Healthcare & Life Sciences",
    modality: "Image",
    problem: "Automated models could not delineate tumor margins precisely.",
    solution: "Pixel-level segmentation with expert QA protocol.",
    impact: "Enabled higher accuracy in detection models and surgical planning tools.",
  },
  {
    id: 5,
    title: "Road Sign Condition Classification for ADAS",
    industry: "Automotive & Mobility",
    modality: "Image",
    problem: "ADAS models failed under glare and occlusion conditions.",
    solution: "Annotated sign visibility conditions alongside type.",
    impact: "Improved ADAS accuracy and reduced nighttime misreads.",
  },
  // Retail & E-commerce
  {
    id: 6,
    title: "Product Attribute Extraction for Search Ranking",
    industry: "Retail & E-commerce",
    modality: "Text",
    problem: "Search relevance suffered due to missing structured product metadata.",
    solution: "Text and image combined annotation for attributes like color, size, material.",
    impact: "Increased search-to-cart conversion and reduced bounce rates.",
  },
  {
    id: 7,
    title: "Shelf Planogram Compliance Analytics",
    industry: "Retail & E-commerce",
    modality: "Image",
    problem: "Retail stores struggled to measure placement fidelity.",
    solution: "Image segmentation and detection of product facings.",
    impact: "Enhanced compliance insights and improved merchandising ROI.",
  },
  // Financial Services
  {
    id: 8,
    title: "Contract Clause Risk Tagging",
    industry: "Financial Services",
    modality: "Text",
    problem: "Legal risk teams could not systematically identify high-risk contract terms.",
    solution: "Structured clause entity tagging with risk categories.",
    impact: "Reduced contract review cycles and improved risk visibility.",
  },
  {
    id: 9,
    title: "KYC Document OCR Validation",
    industry: "Financial Services",
    modality: "Image",
    problem: "OCR errors in identity docs slowed verification pipelines.",
    solution: "Annotated correction labels and field validation markers.",
    impact: "Increased verification throughput and reduced onboarding friction.",
  },
  // Manufacturing & Robotics
  {
    id: 10,
    title: "Solder Joint Defect Mapping in PCBs",
    industry: "Manufacturing & Robotics",
    modality: "Image",
    problem: "Vision models misread subtle PCB joint anomalies.",
    solution: "High-resolution segmentation of defect patterns.",
    impact: "Decreased quality failures and improved yield consistency.",
  },
  {
    id: 11,
    title: "Worker Safety Zone Breach Annotation",
    industry: "Manufacturing & Robotics",
    modality: "Video",
    problem: "Robots and humans shared space without reliable behavior tagging.",
    solution: "Zone-based temporal tagging of human proximity breaches.",
    impact: "Improved worker safety alerts and collision avoidance triggers.",
  },
  // Media, Entertainment & Gaming
  {
    id: 12,
    title: "Sports Player Motion and Action Recognition",
    industry: "Media, Entertainment & Gaming",
    modality: "Video",
    problem: "Analytics platforms lacked detailed action labels.",
    solution: "Tracking and semantic tagging of player actions.",
    impact: "Enabled advanced performance insights for coaching tools.",
  },
  {
    id: 13,
    title: "Game Chat Toxicity Annotation",
    industry: "Media, Entertainment & Gaming",
    modality: "Text",
    problem: "In-game voice and text chat moderation was ineffective.",
    solution: "Multimodal toxic language and behavior tagging.",
    impact: "Improved moderation accuracy and community safety.",
  },
  // Telecom & Customer Experience
  {
    id: 14,
    title: "Support Ticket Intent & Escalation Tagging",
    industry: "Telecom & Customer Experience",
    modality: "Text",
    problem: "Automated support routing lacked context.",
    solution: "Intent, sentiment, urgency, and escalation labels on ticket text.",
    impact: "Increased first-contact resolution and reduced support cycle times.",
  },
  {
    id: 15,
    title: "Call Center Diarization & Emotion Annotation",
    industry: "Telecom & Customer Experience",
    modality: "Audio",
    problem: "Voice analytics missed customer emotion signals.",
    solution: "Diarization with sentiment and stress annotations.",
    impact: "Better agent coaching insights and improved CSAT scores.",
  },
  // Public Sector & Defense
  {
    id: 16,
    title: "Satellite Crop Health Segmentation for Aid Planning",
    industry: "Public Sector & Defense",
    modality: "Image",
    problem: "Disaster response models lacked structured agricultural data.",
    solution: "Pixel-level segmentation of crop stress zones.",
    impact: "Allowed prioritization of resources in impacted regions.",
  },
  {
    id: 17,
    title: "Surveillance Behavior Pattern Annotation",
    industry: "Public Sector & Defense",
    modality: "Video",
    problem: "Automated public safety systems generated high false alarms.",
    solution: "Behavioral sequence tagging with event context.",
    impact: "Reduced alarm noise and improved situational awareness.",
  },
  // Logistics & Supply Chain
  {
    id: 18,
    title: "Package Damage Detection in Sorting Lines",
    industry: "Logistics & Supply Chain",
    modality: "Image",
    problem: "Misrouted or damaged parcels slowed fulfillment.",
    solution: "Image and video annotation of package condition metrics.",
    impact: "Faster claim processing and reduced operational disruptions.",
  },
  {
    id: 19,
    title: "Conveyor Jam Event Annotation",
    industry: "Logistics & Supply Chain",
    modality: "Video",
    problem: "Automated tracking of jams was unreliable.",
    solution: "Temporal tagging of stoppage events and object flow patterns.",
    impact: "Reduced downtime and improved throughput.",
  },
  // Cross-Industry
  {
    id: 20,
    title: "Grounding Signal Annotation for LLM Safety",
    industry: "Cross-Industry",
    modality: "Text",
    problem: "LLMs hallucinated unsupported facts in enterprise Q&A.",
    solution: "Tagged grounding requirements with source citations.",
    impact: "Reduced hallucination and improved trust metrics.",
  },
  {
    id: 21,
    title: "Multilingual Toxicity Detection",
    industry: "Cross-Industry",
    modality: "Text",
    problem: "Harmful content in regional languages was under-detected.",
    solution: "Annotated toxicity signals across multiple languages.",
    impact: "Improved moderation precision in global deployments.",
  },
];

export const industries = [
  "All Industries",
  "Healthcare & Life Sciences",
  "Automotive & Mobility",
  "Retail & E-commerce",
  "Financial Services",
  "Manufacturing & Robotics",
  "Media, Entertainment & Gaming",
  "Telecom & Customer Experience",
  "Public Sector & Defense",
  "Logistics & Supply Chain",
  "Cross-Industry",
];

export const modalities = [
  "All Modalities",
  "Text",
  "Image",
  "Video",
  "Audio",
];

export const testimonials = [
  {
    quote: "Flexibench finally gave us consistent labels we can trust for our models. The quality control workflows alone were a game-changer.",
    authorName: "Head of ML",
    authorRole: "Global Fintech",
    avatarSrc: "/placeholder-user.jpg",
  },
  {
    quote: "DataBench and FlexiPod transformed our annotation execution — no more bottlenecks, no more reworks.",
    authorName: "Director of AI",
    authorRole: "Healthcare Platform",
    avatarSrc: "/placeholder-user.jpg",
  },
  {
    quote: "The AI-assisted labeling feature cut our annotation time in half while maintaining accuracy. Our team can now focus on complex edge cases instead of repetitive tasks.",
    authorName: "Senior Data Scientist",
    authorRole: "Autonomous Vehicle Company",
    avatarSrc: "/placeholder-user.jpg",
  },
  {
    quote: "We've tried multiple annotation platforms, but Flexibench's ontology management is unmatched. The version control and inheritance features saved us months of rework.",
    authorName: "VP of Engineering",
    authorRole: "AI Research Lab",
    avatarSrc: "/placeholder-user.jpg",
  },
  {
    quote: "The API integration was seamless. We can now automate our entire data pipeline from collection to model training without manual intervention.",
    authorName: "CTO",
    authorRole: "Computer Vision Startup",
    avatarSrc: "/placeholder-user.jpg",
  },
  {
    quote: "Flexibench's multi-step review process caught errors we would have missed. Our model performance improved by 15% just from better data quality.",
    authorName: "Lead ML Engineer",
    authorRole: "E-commerce Platform",
    avatarSrc: "/placeholder-user.jpg",
  },
];

export const platformModules = [
  {
    id: "ontology",
    title: "Ontology & Taxonomy Management",
    icon: "Network",
    whyItMatters: "A clean ontology reduces annotation ambiguity, improves inter-annotator consistency, and powers reliable model training datasets.",
    keyCapabilities: [
      "Centralized ontology library with version control",
      "Inheritance and template reusability",
      "Relationship mappings and hierarchical label definitions",
    ],
    outcome: "Consistent classification leads to fewer model errors and higher dataset integrity, especially for regulated or domain-specific use cases.",
  },
  {
    id: "ai-labeling",
    title: "AI-Assisted Labeling",
    icon: "Sparkles",
    whyItMatters: "Manual labeling alone cannot scale with the data demands of today's models. AI assistance accelerates annotation while keeping human oversight at the center.",
    keyCapabilities: [
      "Model-generated pre-labels for repetitive tasks",
      "Confidence scores that guide human review priorities",
      "Active learning integration to focus labeling on high-impact data",
    ],
    outcome: "Higher throughput without compromising annotation quality, and continuous improvement of both data and model performance.",
  },
  {
    id: "workflow-qa",
    title: "Workflow & Quality Assurance",
    icon: "Shield",
    whyItMatters: "Quality is not an afterthought, it is engineered into every task. Customizable review and rework stages ensure that labeled data meets enterprise quality standards.",
    keyCapabilities: [
      "Multi-step review and rework queues",
      "Consensus scoring and adjudication mechanisms",
      "Reviewer roles, task routing, and performance metrics",
      "Benchmarking and quality dashboards",
    ],
    outcome: "Reliable, audit-ready datasets with measurable quality control that support safer model deployments.",
  },
  {
    id: "apis-integrations",
    title: "APIs & Integrations",
    icon: "Plug",
    whyItMatters: "Annotation does not happen in isolation. Flexible programmatic access enables automation, pipeline integration, and seamless data movement between annotation and training systems.",
    keyCapabilities: [
      "REST and SDK interfaces for batch data import/export",
      "Python SDK support for Python-native workflows",
      "Integration hooks for TensorFlow, PyTorch, ML orchestration systems, and active learning loops",
    ],
    outcome: "Accelerated dataset preparation and tighter feedback between model training and data refinement, empowering iterative model development and faster production readiness.",
  },
];

export const capabilities = [
  {
    type: "Text",
    icon: "FileText",
    whatItDoes: "Builds richly labeled language datasets that help models understand meaning, intent, context, and safety constraints.",
    coreCapabilities: [
      "Named entity extraction and relation mapping",
      "Intent and sentiment tagging for complex text signals",
      "Chain-of-thought and reasoning guidance annotations",
      "Multi-label classification and hierarchical tagging",
      "OCR validation and structured text extraction",
    ],
    whatClientsGet: "Model-ready language datasets that reduce ambiguity and improve NLP model accuracy. Fine-tuning corpora aligned to domain semantics and safety policies.",
    whyItMatters: "Text annotation shapes how models interpret nuance, disambiguate intent, and reason over language, especially for generative or decision-support applications.",
  },
  {
    type: "Image",
    icon: "Image",
    whatItDoes: "Teaches vision models to see, segment, classify, and understand visual components with fine-grain detail.",
    coreCapabilities: [
      "Bounding boxes and object detection tagging",
      "Polygon/semantic and instance segmentation",
      "Keypoint and landmark annotation",
      "Visual attribute labeling (texture, condition, material)",
      "Complex scene understanding (relationships and context)",
    ],
    whatClientsGet: "High-fidelity visual datasets for robust model training. Precise segmentation and detection maps for complex vision tasks.",
    whyItMatters: "Image annotation is foundational for computer vision models that power analytics, inspection, identity verification, medical imaging, retail insights, and more.",
  },
  {
    type: "Video",
    icon: "Video",
    whatItDoes: "Enables models to interpret action, sequence, and temporal behavior across frames, not just static images.",
    coreCapabilities: [
      "Frame-level classification and tagging",
      "Object tracking and temporal identity preservation",
      "Activity and event recognition with timestamps",
      "Scene segmentation and zone labeling",
      "Trajectory and motion pattern annotation",
    ],
    whatClientsGet: "Temporal event datasets that help models learn action dynamics. Behavioral and safety annotations for real-time AI systems.",
    whyItMatters: "Video is rich with temporal context. Annotation that captures motion, activity chains, and event sequences boosts model understanding of real-world scenes.",
  },
  {
    type: "Audio",
    icon: "Music",
    whatItDoes: "Structures audio and speech data to power ASR, voice assistants, and acoustic understanding models.",
    coreCapabilities: [
      "Speaker diarization and turn-taking labels",
      "Transcription and translation with timestamps",
      "Acoustic event detection and classification",
      "Prosody, emotion, and sentiment signal tagging",
      "Noise profile and background context labeling",
    ],
    whatClientsGet: "Clean speech datasets ready for training and evaluation. Rich acoustic metadata that improves ASR and voice understanding.",
    whyItMatters: "Audio annotation unlocks voice interactions and sound intelligence for conversational AI, compliance automation, and acoustic pattern recognition.",
  },
];

export const whyFlexibenchPoints = [
  {
    title: "Annotation Is Not a Service, It Is the Data Engine That Powers AI",
    description: "At Indika (our parent company), we learned early that models are only as good as the data they train on. The AI landscape shifted, but annotation remained fragmented, inconsistent, and siloed in task-level tools. Flexibench was built to solve this gap: to turn annotation from a checklist activity into an engineering discipline that drives model quality, reliability, and deployment readiness.",
    icon: "Database",
  },
  {
    title: "Built From Experience, Not Assumption",
    description: "Existing annotation platforms often treat tasks as isolated jobs, focus on throughput over correctness, and fail to tie labeling to model outcomes. We built Flexibench because we needed something better for ourselves, a platform that integrates deeply with training workflows, enforces consistent ontologies across projects, supports auditable quality pipelines, and gives feedback signals back into model training.",
    icon: "Lightbulb",
  },
  {
    title: "Quality First by Design",
    description: "High-performance AI requires precise, contextually consistent labels, robust review and QA processes, domain-aware scaffolding and tooling, and iterative refinement feeds into training loops. Flexibench's annotation pipelines are engineered around these principles, not as add-ons: custom schema and ontology versioning, multi-tier review gates, consensus scoring and expert arbitration, model-assisted annotation that reduces error rates.",
    icon: "Award",
  },
  {
    title: "Annotation That Adapts to the Problem",
    description: "Flexibench is not 'one interface fits all.' It is configured per use case because labelling requirements vary dramatically between telecom call intent needs, autonomous vehicle perception taxonomies, multimodal medical imaging signals, and voice AI prosody and acoustic event parsing. This flexibility delivers faster time to annotated dataset, fewer review cycles, and stronger model alignment.",
    icon: "Settings",
  },
  {
    title: "From Annotation to Model Outcomes",
    description: "Annotation is the input; model quality is the output. Flexibench closes the loop: models pre-label and suggest annotations, annotators refine with domain precision, QA layers validate against standards, feedback signals improve future annotation & model iteration.",
    icon: "ArrowRight",
  },
];

export const qualityPrinciples = [
  {
    title: "Benchmarking and Gold Standards",
    description: "Flexibench lets teams define benchmark examples as ground truth. These benchmarks act as reference points for labeler performance, training calibrations, and automated QA checks.",
    icon: "Target",
  },
  {
    title: "Consensus Scoring Across Annotators",
    description: "Consensus mechanisms evaluate agreement between multiple annotators on the same data item. A high consensus score indicates strong alignment, while lower scores trigger review and adjudication workflows.",
    icon: "Users",
  },
  {
    title: "Multi-Stage Review Pipelines",
    description: "Flexibench supports flexible review workflows: initial annotation pass, peer review or expert adjudication, automated gated QA rules, and escalation for ambiguous or high-risk items.",
    icon: "Layers",
  },
  {
    title: "Real-Time Quality Monitoring Dashboards",
    description: "Teams get visibility into quality metrics such as agreement scores per annotator, consensus distributions across datasets, benchmark pass rates, and labeler performance over time.",
    icon: "BarChart3",
  },
  {
    title: "Auditability and Traceability",
    description: "Every label, edit, and review action is tracked with metadata (who, when, how). This data lineage provides traceable decision history, compliance and governance support, and forensic investigation of quality issues.",
    icon: "FileCheck",
  },
];

export const internalTools = [
  {
    title: "DataBench",
    subtitle: "A central workspace for building, refining, and governing enterprise datasets",
    description: "DataBench is where annotation becomes science and strategy, not just tasks. It brings together collection, labeling, review, experiment integration, and dataset iteration into a single workspace.",
    whyItMatters: "Today's AI systems require structured datasets with governance, repeatability, and metric visibility. DataBench empowers teams to design workflows, enforce standards, measure progress, and iterate with auditable quality checkpoints.",
    capabilities: [
      "Unified Dataset Repository: Single source of truth for all annotation work",
      "Workflow Builder: Configurable pipelines from raw input to production-ready dataset",
      "Labelset & Schema Manager: Reuse ontologies across domains and projects",
      "Review Dashboards: Monitor consensus scores, disagreement hotspots, and tooltip metrics",
      "Experiment Integration: Export labeled datasets with tags and metadata to training pipelines",
    ],
    icon: "Workflow",
  },
  {
    title: "Phonex",
    subtitle: "The voice annotation product designed for speech-first AI",
    description: "Phonex is DataBench's specialized annotation engine for all things audio and speech. It goes far beyond transcription. Phonex handles linguistically rich labeling tasks, speaker diarization, intent tagging, acoustic event annotation, prosody cues, and environment signals.",
    whyItMatters: "Voice data is complex: noisy environments, accents, switching contexts, overlap speech, and domain jargon. Phonex embeds audio-centric tooling directly into DataBench pipelines so voice datasets are not just labeled, but structured for model understanding.",
    capabilities: [
      "Speaker diarization and turn separation",
      "Multilingual transcription with confidence scores",
      "Acoustic event and environmental tagging",
      "Prosody & emotion markers",
      "Background noise profiling",
    ],
    icon: "Mic",
  },
  {
    title: "FlexiPod",
    subtitle: "Cross-functional talent pods that take full ownership from strategy to execution",
    description: "FlexiPod is not a gig crowd. It is a high-agency, engineered execution layer consisting of annotation engineers, domain specialists, data scientists, and product operators. Pods are assembled for outcomes, not punch-list tasks.",
    whyItMatters: "Too often annotation teams get stuck in process overhead, task batching, and quality rework. FlexiPod flips the model: you get a team that owns the problem, not just the tasks.",
    capabilities: [
      "Annotation strategy and schema design",
      "Workflow engineering in DataBench",
      "Quality assurance and reviewer calibration",
      "Delivery of model-ready datasets",
    ],
    icon: "Users",
  },
];
