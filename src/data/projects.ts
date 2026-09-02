export type ProjectLink = {
  label: "Live site" | "Source" | "Demo";
  href: string;
};

export type ProjectMetric = {
  value: string;
  label: string;
};

export type ProjectGalleryItem = {
  src: string;
  alt: string;
  caption: string;
};

export type ProjectCaseStudy = {
  slug: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  summary: string;
  category: string;
  role: string;
  year: string;
  status: string;
  featured: boolean;
  accent: "sage" | "amber" | "blue" | "rose";
  hero: string;
  heroAlt: string;
  stack: string[];
  links: ProjectLink[];
  metrics?: ProjectMetric[];
  challenge: string;
  approach: string[];
  outcome: string[];
  limitations?: string;
  gallery?: ProjectGalleryItem[];
};

export const projects: ProjectCaseStudy[] = [
  {
    slug: "skyglass-hillside-garden",
    title: "SkyGlass Hillside Garden",
    shortTitle: "SkyGlass",
    subtitle: "Hospitality website and inquiry experience",
    summary:
      "A calm, image-led website that helps guests understand the venue, browse stays and packages, and send a structured visit request.",
    category: "Web product",
    role: "Full-stack developer",
    year: "2026",
    status: "Live demo",
    featured: true,
    accent: "sage",
    hero: "/assets/projects/skyglass/home.webp",
    heroAlt: "SkyGlass Hillside Garden desktop homepage",
    stack: ["React", "TypeScript", "Vite", "Responsive UI", "Vercel"],
    links: [
      {
        label: "Live site",
        href: "https://skyglass-hillside-garden-demo.vercel.app/",
      },
    ],
    challenge:
      "The venue needed more than a gallery. Visitors had to understand what they could book, whether the place suited their event, and what information to send before contacting the owner.",
    approach: [
      "Organized the experience around stay, celebrate, gallery, packages, availability, and FAQs.",
      "Used real venue imagery and short decision-focused copy instead of a long marketing page.",
      "Built a guided inquiry path that collects useful context without pretending to confirm a reservation.",
    ],
    outcome: [
      "A responsive hospitality demo with a clear route from discovery to inquiry.",
      "Reusable content and components for future venue updates.",
      "A production-like deployment that can be reviewed on desktop and mobile.",
    ],
  },
  {
    slug: "drones-and-gadgets-ph",
    title: "Drones & Gadgets PH",
    shortTitle: "Drones & Gadgets",
    subtitle: "Trust-first commerce experience and owner workspace",
    summary:
      "A DJI-focused storefront that balances product discovery, buyer confidence, controlled checkout behavior, and catalog operations.",
    category: "Commerce",
    role: "Full-stack developer",
    year: "2026",
    status: "Live demo",
    featured: true,
    accent: "blue",
    hero: "/assets/projects/drones-gadgets/home.webp",
    heroAlt: "Drones and Gadgets PH storefront homepage",
    stack: ["React", "TypeScript", "Supabase", "PayMongo modes", "Vercel"],
    links: [
      {
        label: "Live site",
        href: "https://drones-and-gadgets-ph.vercel.app/",
      },
    ],
    challenge:
      "The store needed to present high-consideration products clearly while keeping owner controls, stock changes, and payment testing separated from public shopping.",
    approach: [
      "Designed category and product paths around specifications, compatibility, and trust signals.",
      "Added an owner workspace for catalog and operational review.",
      "Kept checkout in controlled test or simulation modes until owner authentication and catalog sign-off are complete.",
    ],
    outcome: [
      "A responsive catalog and commerce experience with a live review URL.",
      "Clear separation between customer browsing and owner operations.",
      "Safer payment integration work without presenting an unapproved flow as production-ready.",
    ],
    limitations:
      "The current public build demonstrates the purchase journey. Production payment activation still depends on owner sign-off and live credentials.",
  },
  {
    slug: "visionai-face-guard",
    title: "VisionAI Face Guard",
    shortTitle: "Face Guard",
    subtitle: "Face detection and privacy-focused image anonymization",
    summary:
      "A Streamlit computer-vision app that detects faces with a custom-trained YOLOv8 model and applies adjustable Gaussian blur before the user downloads the anonymized result.",
    category: "Computer vision",
    role: "Computer vision application developer",
    year: "2026",
    status: "Source available",
    featured: true,
    accent: "blue",
    hero: "/assets/projects/face-blur-app/interface.webp",
    heroAlt: "VisionAI Face Guard interface showing uploaded samples and a face-blurred output preview",
    stack: ["Python", "Streamlit", "YOLOv8", "OpenCV", "Custom CNN", "Computer vision"],
    links: [
      { label: "Source", href: "https://github.com/GITLAGGUI/face-blur-app" },
    ],
    metrics: [
      { value: "YOLOv8", label: "deployed detector" },
      { value: "4", label: "built-in test images" },
      { value: "2", label: "privacy controls" },
    ],
    challenge:
      "People need a simple way to hide faces before sharing an image, while still being able to tune missed detections and the strength of the anonymization.",
    approach: [
      "Compared a custom TensorFlow CNN against YOLOv8, then used the stronger multi-face detector in the final application.",
      "Built an upload-and-preview flow with adjustable detection confidence and blur intensity.",
      "Kept processing in memory and prepared the output as a downloadable PNG instead of creating a public image archive.",
    ],
    outcome: [
      "A working privacy-focused interface that detects multiple faces and applies blur only to the detected regions.",
      "Four one-click sample images make the workflow reviewable without requiring a personal upload.",
      "The source, trained weights, application code, and training examples are available in the public repository.",
    ],
    limitations:
      "Detection still depends on image quality, lighting, occlusion, and the chosen confidence threshold. This tool assists anonymization but should be checked before sensitive images are shared.",
    gallery: [
      {
        src: "/assets/projects/face-blur-app/training-result.webp",
        alt: "Face-blur training result with the detected face anonymized",
        caption: "A public training example from the repository showing the blur applied to a detected face.",
      },
    ],
  },
  {
    slug: "riceguardai",
    title: "RiceGuardAI",
    shortTitle: "RiceGuardAI",
    subtitle: "Drone-image disease detection and segmentation research",
    summary:
      "A research pipeline that checks high-resolution drone images for rice disease areas while preserving enough detail for review.",
    category: "Computer vision",
    role: "AI and data pipeline developer",
    year: "2025–2026",
    status: "Research pipeline",
    featured: true,
    accent: "sage",
    hero: "/assets/projects/riceguardai/drone-inference.webp",
    heroAlt: "Drone-captured rice field frame with RiceGuardAI segmentation predictions",
    stack: [
      "Python",
      "YOLOv8-seg",
      "YOLOv26-seg",
      "Ultralytics",
      "OpenCV",
      "CVAT",
      "Kaggle",
      "AWS",
    ],
    links: [],
    metrics: [
      { value: "4K", label: "native image workflow" },
      { value: "2", label: "reviewed disease classes" },
      { value: "sealed", label: "Video4 holdout" },
    ],
    challenge:
      "Small disease regions can disappear when 4K drone frames are resized. Training also has to stay blocked when labels, expert review, or holdout boundaries are incomplete.",
    approach: [
      "Built tiled inference with native-coordinate stitching and export validation.",
      "Prepared CVAT review assets and diverse Video3 frame candidates instead of treating every adjacent frame as unique training data.",
      "Added readiness reports and AWS job infrastructure while keeping Video4 sealed for final evaluation.",
    ],
    outcome: [
      "Verified the stitching and export path with repeatable local tests.",
      "Established explicit dataset and expert-review gates before paid training.",
      "Documented the difference between infrastructure readiness and model accuracy.",
    ],
    limitations:
      "This is an active research pipeline. Final training and promotion remain blocked by expert-approved label completeness and curated precision tiles; no final accuracy claim is made here.",
    gallery: [
      {
        src: "/assets/projects/riceguardai/video3-selection.webp",
        alt: "Training-only Video3 drone frame selection sheet",
        caption: "Training-frame selection evidence kept separate from the sealed Video4 evaluation set.",
      },
    ],
  },
  {
    slug: "youtube-automation-pipeline",
    title: "YouTube Short-Video Automation Pipeline",
    shortTitle: "YouTube Pipeline",
    subtitle: "A repeatable AI-assisted workflow for short psychology videos",
    summary:
      "A repeatable production workflow behind Mind Echoes Daily, covering research, scripts, voice, images, animation, editing, sound, and final short-form exports.",
    category: "AI automation",
    role: "Automation builder",
    year: "2026",
    status: "Published channel workflow",
    featured: true,
    accent: "amber",
    hero: "/assets/projects/youtube-automation/channel.webp",
    heroAlt: "Mind Echoes Daily YouTube channel showing four published psychology Shorts",
    stack: ["Claude", "ElevenLabs", "GPT image generation", "Google Flow", "FFmpeg", "Python"],
    links: [{ label: "Demo", href: "https://www.youtube.com/@MindEchoesDaily" }],
    metrics: [
      { value: "4", label: "published Shorts reviewed" },
      { value: "9:16", label: "vertical output" },
      { value: "end-to-end", label: "script to final edit" },
    ],
    challenge:
      "Each video needed the same quality steps—script, narration, imagery, motion, captions, sound, and export—without rebuilding the process from zero.",
    approach: [
      "Used Claude for scripts and editing direction, ElevenLabs for voice, GPT for image creation, and Google Flow for animation.",
      "Turned each approved story into timed scenes with captions, transitions, sound design, and platform-ready exports.",
      "Kept a human review step for claims, tone, visual fit, and the final upload.",
    ],
    outcome: [
      "A working workflow used for the four published Mind Echoes Daily Shorts reviewed on the channel.",
      "A consistent voice and visual style across psychology-focused stories.",
      "Reusable production steps that make the next video faster to assemble and check.",
    ],
    limitations:
      "The tool assists production; scripts, claims, visuals, and platform publishing still require human review.",
    gallery: [
      {
        src: "/assets/projects/youtube-automation/pipeline-frame.webp",
        alt: "A finished vertical scene produced by the short-video workflow",
        caption: "A real exported scene from the local production pipeline.",
      },
    ],
  },
  {
    slug: "property-data-operations",
    title: "Property Data Operations",
    shortTitle: "Property Data",
    subtitle: "Source discovery, collection, validation, and enrichment",
    summary:
      "A data-operations workflow for researching county sources, tracking field completeness, cleaning records, deduplicating leads, and producing auditable exports.",
    category: "Data engineering",
    role: "Data automation developer",
    year: "2026",
    status: "Private data workflow",
    featured: true,
    accent: "blue",
    hero: "/assets/projects/property-data/source-audit.webp",
    heroAlt: "Public-safe property data source audit derived from the working project files",
    stack: ["Python", "CSV/XLSX", "Data audit", "Web research", "Deduplication", "Google Apps Script"],
    links: [],
    metrics: [
      { value: "101", label: "county sources researched" },
      { value: "15", label: "states covered" },
      { value: "96", label: "free sources identified" },
    ],
    challenge:
      "County and state sources expose different fields, formats, access patterns, and historical depth. A downloaded file is not useful unless its provenance and completeness are known.",
    approach: [
      "Built source manifests and difficulty classifications before collecting records.",
      "Added checks for missing fields, placeholder addresses, historical sale coverage, and source-specific gaps.",
      "Created enrichment, deduplication, progress logging, and CRM-ready export steps for related lead datasets.",
    ],
    outcome: [
      "A repeatable source-to-audit process instead of an untracked folder of downloads.",
      "Clear separation between full delinquent rolls, auction subsets, and unavailable data.",
      "Sanitized reporting that communicates coverage without publishing owner or client records.",
    ],
    limitations:
      "Raw property-owner records, client spreadsheets, internal notes, credentials, and paid-source artifacts are intentionally excluded from this public case study.",
  },
  {
    slug: "cagayan-absa",
    title: "Cagayan Tourism & Food ABSA",
    shortTitle: "Cagayan ABSA",
    subtitle: "Consent-gated aspect-based sentiment analysis pipeline",
    summary:
      "A multilingual NLP workflow for organizing review data, extracting aspects, preparing leakage-safe splits, and auditing a tourism and food research dataset.",
    category: "NLP and data science",
    role: "NLP and data pipeline developer",
    year: "2026",
    status: "Evaluated research pipeline",
    featured: true,
    accent: "rose",
    hero: "/assets/projects/cagayan-absa/training-curves.webp",
    heroAlt: "Actual Version 8 ABSA training and validation curves",
    stack: ["Python", "ABSA", "BERTopic", "MiniLM", "XLM-RoBERTa", "Kaggle"],
    links: [],
    metrics: [
      { value: "82.08%", label: "fresh-holdout accuracy" },
      { value: "81.79%", label: "fresh-holdout macro F1" },
      { value: "240", label: "balanced holdout instances" },
    ],
    challenge:
      "Public-facing review text needs consent, provenance, privacy, duplicate control, and domain-balanced evaluation before it can support a credible sentiment study.",
    approach: [
      "Added consent and provenance gates before data enters the release pipeline.",
      "Prepared food and tourism instances for multilingual embeddings, topic discovery, and aspect-level modeling.",
      "Audited PII, duplicates, and split leakage before sealing evaluation data.",
    ],
    outcome: [
      "Version 8 performed best in the apples-to-apples comparison on the same 240-item fresh holdout.",
      "The honest generalization result is 82.08% accuracy and 81.79% macro F1.",
      "The audit explains why easier validation or silver-test scores should not replace the harder holdout result.",
    ],
    limitations:
      "The hardest remaining cases are ambiguous negative-versus-neutral reviews, tourism reviews, and Taglish examples.",
    gallery: [
      {
        src: "/assets/projects/cagayan-absa/confusion-matrix.webp",
        alt: "Actual Version 8 silver-test confusion matrix",
        caption: "Silver-test confusion matrix shown as supporting evidence; the headline metrics use the harder fresh holdout.",
      },
    ],
  },
  {
    slug: "openclaw-automation-system",
    title: "OpenClaw Automation System",
    shortTitle: "OpenClaw",
    subtitle: "Local agent routing, tools, and scheduled workflows",
    summary:
      "A privacy-conscious local agent setup with Telegram access, controlled tools, fallback routing, runtime checks, and reusable operational workflows.",
    category: "AI automation",
    role: "Agent systems builder",
    year: "2026",
    status: "Private local system",
    featured: true,
    accent: "amber",
    hero: "/assets/projects/openclaw/live-overview.webp",
    heroAlt: "Live OpenClaw gateway overview showing an online loopback-only instance",
    stack: ["OpenClaw", "Telegram", "Agent routing", "Tool policies", "Windows automation"],
    links: [],
    challenge:
      "A useful personal agent needs more than a chat response: it needs controlled tools, reliable routing, safe external-action boundaries, and a way to verify which execution path actually ran.",
    approach: [
      "Configured explicit primary and fallback paths with runtime evidence checks.",
      "Reduced the Telegram tool surface to relevant skills and protected credentials with environment-backed secret references.",
      "Added health checks and reusable workflows for research, media, and local operations.",
    ],
    outcome: [
      "A working loopback-only gateway with validated configuration and controlled Telegram access, verified live on September 1, 2026.",
      "Smaller tool schemas and clearer boundaries around external actions.",
      "Operational checks that distinguish the requested provider path from a fallback response.",
    ],
    limitations:
      "Accounts, prompts, conversations, provider credentials, host details, and private media are not published. A recommended service-environment cleanup remains open.",
  },
  {
    slug: "n8n-ai-outreach-prototype",
    title: "n8n AI Outreach Prototype",
    shortTitle: "n8n Outreach",
    subtitle: "Preview-first accommodation outreach workflow",
    summary:
      "A self-hosted workflow that turns a test lead into a structured draft, sends it to Telegram for review, and keeps SMS behind an explicit gate.",
    category: "Workflow automation",
    role: "Automation builder",
    year: "2026",
    status: "AWS-hosted prototype",
    featured: true,
    accent: "blue",
    hero: "/assets/projects/n8n-outreach/live-workflow.webp",
    heroAlt: "Live AWS-hosted n8n editor showing the actual preview-first outreach workflow",
    stack: ["n8n", "Docker", "AWS Lightsail", "Telegram", "Claude-assisted build"],
    links: [],
    metrics: [
      { value: "11", label: "actual workflow nodes" },
      { value: "9", label: "actual connections" },
      { value: "preview-first", label: "default delivery path" },
    ],
    challenge:
      "Outreach automation can create risk when generation and sending are connected too early. The workflow needed a useful preview path before any live delivery step.",
    approach: [
      "Built the workflow with Claude assistance, then hosted n8n in Docker on AWS Lightsail.",
      "Structured the live flow as trigger, settings, test lead, filter/build, limit, AI draft, parse, Telegram preview, gated SMS, and sent log.",
      "Kept preview as the default path and the workflow inactive while data sources and account connections were still being prepared.",
    ],
    outcome: [
      "Verified the running AWS container and exported the actual 11-node workflow over SSH.",
      "A reviewable Telegram preview before delivery.",
      "A clear next path for Sheets, email, and deduplication integrations.",
    ],
    limitations:
      "This is not a broadly activated campaign system. Credentials, server addresses, client leads, and private workflow exports are excluded.",
  },
  {
    slug: "zms-place",
    title: "ZM’s Place",
    shortTitle: "ZM’s Place",
    subtitle: "Resort and event discovery website",
    summary:
      "A responsive venue site that brings together discovery, amenities, event context, inquiry, and reservation organization.",
    category: "Web product",
    role: "Full-stack developer",
    year: "2026",
    status: "Live site",
    featured: true,
    accent: "sage",
    hero: "/assets/projects/zms-place/home.webp",
    heroAlt: "ZM's Place resort and event website",
    stack: ["React", "TypeScript", "Vite", "Responsive QA", "Vercel"],
    links: [
      { label: "Live site", href: "https://zms-place-resort.vercel.app/" },
    ],
    challenge:
      "Guests needed a fast way to understand the venue and start an inquiry without relying on a long social-media message thread.",
    approach: [
      "Organized venue details, amenities, events, and contact actions into a mobile-first path.",
      "Used source-tracked imagery and request-current-rates language where public pricing was unavailable.",
      "Ran responsive, image, console, and horizontal-overflow checks before deployment.",
    ],
    outcome: [
      "A live hospitality site with visible mobile calls to action.",
      "Clearer inquiry and booking intent without inventing availability or prices.",
      "A documented asset and QA trail for future updates.",
    ],
  },
  {
    slug: "tiktok-live-support-companion",
    title: "TikTok LIVE Support Companion",
    shortTitle: "LIVE Companion",
    subtitle: "Manual support utility for Windows",
    summary:
      "A .NET desktop companion for opening a pinned LIVE, timing a session, marking PK moments, showing reminders, and sharing a QR code—without automating engagement.",
    category: "Desktop utility",
    role: "Windows application developer",
    year: "2026",
    status: "Local desktop app",
    featured: true,
    accent: "rose",
    hero: "/assets/projects/tiktok-companion/app-window.webp",
    heroAlt: "Anonymized TikTok LIVE Support Companion desktop window",
    stack: ["C#", ".NET 9", "WPF", "QRCoder", "Local storage"],
    links: [],
    challenge:
      "The user needed a focused companion for a LIVE session while keeping support actions manual and avoiding browser injection or automated likes.",
    approach: [
      "Built a local session timer, manual PK markers, reminders, QR access, and pinned-link launcher.",
      "Restricted outbound URLs through an allowlist and kept data on the local machine.",
      "Designed the application around explicit Start and Stop controls with no background engagement automation.",
    ],
    outcome: [
      "A published Windows build with an automated test suite.",
      "Clear manual-only boundaries and local persistence.",
      "A small operational interface that supports a session without pretending to control TikTok.",
    ],
    limitations:
      "The public screenshot is anonymized. Account handles, session records, and private links are excluded.",
  },
  {
    slug: "hotplate",
    title: "Hotplate",
    shortTitle: "Hotplate",
    subtitle: "Flutter food ordering application",
    summary:
      "A mobile ordering prototype covering authentication, restaurant discovery, cart management, and account flows.",
    category: "Mobile",
    role: "Flutter developer",
    year: "2025",
    status: "Student project",
    featured: false,
    accent: "amber",
    hero: "/assets/hotplate.png",
    heroAlt: "Hotplate Flutter application screens",
    stack: ["Flutter", "Dart", "Firebase", "Firestore"],
    links: [
      { label: "Source", href: "https://github.com/GITLAGGUI/App_1" },
      { label: "Demo", href: "https://youtube.com/shorts/ASRBtukoAHc" },
    ],
    challenge: "Bring the core steps of a food ordering experience into one mobile prototype.",
    approach: ["Built authentication, browsing, cart, and account screens in Flutter.", "Used Firebase services for application data and identity."],
    outcome: ["Completed a navigable mobile prototype and recorded demonstration."],
  },
  {
    slug: "prostate-cancer-risk-dashboard",
    title: "Prostate Cancer Risk Analysis Dashboard",
    shortTitle: "Risk Dashboard",
    subtitle: "Exploratory health-data dashboard",
    summary:
      "A Streamlit dashboard for exploring a prostate cancer dataset through filters, charts, and model-oriented analysis views.",
    category: "Data application",
    role: "Data application developer",
    year: "2025",
    status: "Live demo",
    featured: false,
    accent: "blue",
    hero: "/assets/prostate-cancer-dashboard.png",
    heroAlt: "Prostate cancer risk analysis dashboard",
    stack: ["Python", "Streamlit", "Plotly", "pandas", "scikit-learn"],
    links: [
      { label: "Source", href: "https://github.com/GITLAGGUI/Prostate-Cancer-Analysis" },
      { label: "Live site", href: "https://prostate-cancer-risk-analysis.streamlit.app/" },
    ],
    challenge: "Make an analysis dataset easier to inspect without relying on notebook-only output.",
    approach: ["Built interactive filters and visual summaries in Streamlit.", "Separated exploratory views from model-oriented analysis."],
    outcome: ["Published a reviewable web dashboard for dataset exploration."],
    limitations: "This is an educational analysis tool, not a clinical decision system.",
  },
  {
    slug: "isu-lost-and-found",
    title: "ISU Lost & Found System",
    shortTitle: "Lost & Found",
    subtitle: "Campus item reporting and tracking system",
    summary:
      "A PHP and MySQL application for reporting, browsing, tracking, and claiming lost or found items on campus.",
    category: "Web application",
    role: "Full-stack developer",
    year: "2025",
    status: "Academic project",
    featured: false,
    accent: "sage",
    hero: "/assets/LostAndFound.png",
    heroAlt: "ISU Lost and Found system interface",
    stack: ["PHP", "MySQL", "JavaScript", "Bootstrap"],
    links: [
      { label: "Source", href: "https://github.com/GITLAGGUI/Lost-And-Found-ISUC" },
    ],
    challenge: "Replace scattered campus reports with a searchable status-based workflow.",
    approach: ["Built guided report and claim flows backed by a relational database.", "Added authentication, item browsing, messaging, and status updates."],
    outcome: ["Delivered a working campus-focused tracking application."],
  },
  {
    slug: "topshoppe",
    title: "TopShoppe E-commerce",
    shortTitle: "TopShoppe",
    subtitle: "Full-stack fashion commerce prototype",
    summary:
      "A commerce build covering customer shopping, seller operations, orders, shipping, and payment-oriented flows.",
    category: "Commerce",
    role: "Full-stack developer",
    year: "2025",
    status: "Recorded demo",
    featured: false,
    accent: "rose",
    hero: "/assets/Thumbnaill.png",
    heroAlt: "TopShoppe ecommerce application",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
    links: [{ label: "Demo", href: "https://youtu.be/ghtNTCpmVHA" }],
    challenge: "Connect buyer, seller, order, shipping, and payment concerns in one full-stack application.",
    approach: ["Created separate customer, seller, and admin journeys.", "Modeled catalog and order data with Prisma and PostgreSQL."],
    outcome: ["Completed and recorded the end-to-end commerce prototype."],
  },
  {
    slug: "pinoyai-cli",
    title: "PinoyAI CLI",
    shortTitle: "PinoyAI",
    subtitle: "Command-line pair programming assistant",
    summary:
      "A Python CLI experiment for asking coding questions and receiving streamed development help in the terminal.",
    category: "Developer tool",
    role: "Python developer",
    year: "2025",
    status: "Local prototype",
    featured: false,
    accent: "blue",
    hero: "/assets/PinoyAI_CLI.png",
    heroAlt: "PinoyAI command-line interface",
    stack: ["Python", "CLI", "API integration"],
    links: [],
    challenge: "Provide a lightweight coding assistant without requiring a full editor extension.",
    approach: ["Built a branded terminal interface and streaming response flow.", "Kept the interaction language-agnostic for debugging and explanation tasks."],
    outcome: ["Completed a working local CLI prototype."],
  },
  {
    slug: "maria-lourdes-mansion",
    title: "Maria Lourdes Mansion",
    shortTitle: "Maria Lourdes",
    subtitle: "Hospitality showcase website",
    summary: "A responsive front-end website created to present a hospitality property through a clear visual browsing experience.",
    category: "Web design",
    role: "Front-end developer",
    year: "2025",
    status: "Recorded demo",
    featured: false,
    accent: "sage",
    hero: "/assets/marialourdes.png",
    heroAlt: "Maria Lourdes Mansion website",
    stack: ["HTML", "CSS", "JavaScript", "Responsive design"],
    links: [
      { label: "Source", href: "https://github.com/GITLAGGUI/Maria-Lourdes-Mansion" },
      { label: "Demo", href: "https://youtu.be/TzNnfLbOnNA" },
    ],
    challenge: "Present the property clearly across desktop and mobile without a complex application backend.",
    approach: ["Created an image-led responsive layout with direct property information."],
    outcome: ["Published source code and a recorded walkthrough."],
  },
  {
    slug: "eskwelahan-ph",
    title: "Eskwelahan.ph",
    shortTitle: "Eskwelahan",
    subtitle: "School management mobile prototype",
    summary: "A Flutter mobile prototype exploring common school information and management flows.",
    category: "Mobile",
    role: "Flutter developer",
    year: "2025",
    status: "Student project",
    featured: false,
    accent: "amber",
    hero: "/assets/eskwelahanph.png",
    heroAlt: "Eskwelahan mobile application",
    stack: ["Flutter", "Dart", "Responsive mobile UI"],
    links: [],
    challenge: "Organize frequently used school flows in a single mobile concept.",
    approach: ["Designed and implemented a cross-platform Flutter interface."],
    outcome: ["Completed a navigable student project prototype."],
  },
  {
    slug: "power-bi-dashboard",
    title: "Interactive Power BI Dashboard",
    shortTitle: "Power BI Dashboard",
    subtitle: "Business-intelligence reporting project",
    summary: "An interactive reporting exercise that turns a structured dataset into filters, comparisons, and visual summaries.",
    category: "Data visualization",
    role: "Data analyst",
    year: "2025",
    status: "Portfolio project",
    featured: false,
    accent: "amber",
    hero: "/assets/powerbi-dashboard-screenshot.png",
    heroAlt: "Interactive Power BI dashboard",
    stack: ["Power BI", "Data modeling", "Data visualization"],
    links: [],
    challenge: "Turn a raw analysis table into a report that can be explored without editing the source data.",
    approach: ["Modeled the data and created interactive visual comparisons."],
    outcome: ["Produced a reusable dashboard view for presentation and exploration."],
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
export const archivedProjects = projects.filter((project) => !project.featured);

export const legacyProjectRoutes: Record<string, string> = {
  "0": "/projects/hotplate",
  "1": "/projects/eskwelahan-ph",
  "2": "/projects/power-bi-dashboard",
  "3": "/projects/maria-lourdes-mansion",
  "4": "/projects/prostate-cancer-risk-dashboard",
  "5": "/about#achievements",
  "6": "/about#achievements",
  "7": "/projects/isu-lost-and-found",
  "8": "/projects/topshoppe",
  "9": "/projects/pinoyai-cli",
};

export function getProjectBySlug(slug: string | undefined) {
  return projects.find((project) => project.slug === slug);
}
