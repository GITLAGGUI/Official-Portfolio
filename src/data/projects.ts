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
    slug: "riceguardai",
    title: "RiceGuardAI",
    shortTitle: "RiceGuardAI",
    subtitle: "Native-resolution rice disease segmentation pipeline",
    summary:
      "A computer-vision research system for tiled 4K inference, annotation review, dataset gating, and cloud-ready processing of drone imagery.",
    category: "Computer vision",
    role: "AI and data pipeline developer",
    year: "2025–2026",
    status: "Research pipeline",
    featured: true,
    accent: "sage",
    hero: "/assets/projects/riceguardai/video3-selection.webp",
    heroAlt: "Contact sheet of training-only Video3 drone frame candidates",
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
  },
  {
    slug: "youtube-automation-pipeline",
    title: "YouTube Short-Video Automation Pipeline",
    shortTitle: "YouTube Pipeline",
    subtitle: "Script-to-video production tooling for vertical content",
    summary:
      "A local Python and FFmpeg pipeline that turns structured scene plans into timed voice, captions, transitions, sound design, and platform-ready vertical videos.",
    category: "AI automation",
    role: "Automation builder",
    year: "2026",
    status: "Local production tool",
    featured: true,
    accent: "amber",
    hero: "/assets/projects/youtube-automation/pipeline-frame.webp",
    heroAlt: "An authentic generated scene from the vertical video pipeline",
    stack: ["Python", "FFmpeg", "Structured JSON", "Timed TTS", "Media automation"],
    links: [],
    metrics: [
      { value: "9:16", label: "vertical output" },
      { value: "word-level", label: "caption timing" },
      { value: "multi-output", label: "YouTube and Facebook" },
    ],
    challenge:
      "Producing short videos manually meant repeating scene timing, voice alignment, caption placement, audio ducking, transitions, and exports for every concept.",
    approach: [
      "Defined each video as a scene specification with narration, caption, image direction, and optional motion clips.",
      "Built voice timing, karaoke-style captions, Ken Burns motion, crossfades, music ducking, and sound-effect placement into reusable scripts.",
      "Generated separate platform outputs while preserving the same source timeline.",
    ],
    outcome: [
      "A repeatable pipeline that converts approved scene plans into finished short-form video assets.",
      "Consistent timing and sound treatment across multiple story variants.",
      "Original synthesized music support to reduce dependence on third-party tracks.",
    ],
    limitations:
      "The tool assists production; scripts, claims, visuals, and platform publishing still require human review.",
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
    hero: "/assets/projects/property-data/pipeline-visual.webp",
    heroAlt: "Sanitized visual of the property data collection and audit pipeline",
    stack: ["Python", "CSV/XLSX", "Data audit", "Web research", "Deduplication", "Google Apps Script"],
    links: [],
    metrics: [
      { value: "101", label: "county sources researched" },
      { value: "15", label: "states covered" },
      { value: "13", label: "target property fields" },
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
    status: "Research dataset ready",
    featured: true,
    accent: "rose",
    hero: "/assets/projects/cagayan-absa/release-audit.webp",
    heroAlt: "Sanitized release audit visual for the Cagayan ABSA dataset",
    stack: ["Python", "ABSA", "BERTopic", "MiniLM", "XLM-RoBERTa", "Kaggle"],
    links: [],
    metrics: [
      { value: "11,751", label: "audited instances" },
      { value: "0", label: "PII and split leaks found" },
      { value: "2", label: "research domains" },
    ],
    challenge:
      "Public-facing review text needs consent, provenance, privacy, duplicate control, and domain-balanced evaluation before it can support a credible sentiment study.",
    approach: [
      "Added consent and provenance gates before data enters the release pipeline.",
      "Prepared food and tourism instances for multilingual embeddings, topic discovery, and aspect-level modeling.",
      "Audited PII, duplicates, and split leakage before sealing evaluation data.",
    ],
    outcome: [
      "A release audit covering 11,751 instances across food and tourism.",
      "No PII, duplicate, or split-leakage findings in the audited release.",
      "A documented model path without rewriting research conclusions ahead of final metrics.",
    ],
    limitations:
      "Final unseen model macro-F1 has not been verified, so this case study describes data and evaluation readiness rather than claiming model performance.",
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
    hero: "/assets/projects/openclaw/agent-operations.webp",
    heroAlt: "Sanitized OpenClaw agent operations visual",
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
      "A working loopback-only gateway with validated configuration and controlled Telegram access.",
      "Smaller tool schemas and clearer boundaries around external actions.",
      "Operational checks that distinguish the requested provider path from a fallback response.",
    ],
    limitations:
      "Accounts, prompts, conversations, provider credentials, host details, and private media are not published.",
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
    status: "Private prototype",
    featured: true,
    accent: "blue",
    hero: "/assets/projects/n8n-outreach/workflow-visual.webp",
    heroAlt: "Sanitized n8n outreach workflow with a gated SMS branch",
    stack: ["n8n", "Docker", "AWS Lightsail", "Telegram", "Workflow design"],
    links: [],
    challenge:
      "Outreach automation can create risk when generation and sending are connected too early. The workflow needed a useful preview path before any live delivery step.",
    approach: [
      "Structured the flow as trigger, settings, test lead, filter/build, limit, draft generation, parse, Telegram preview, gated SMS, and sent log.",
      "Kept preview as the default path and the workflow inactive while data sources and account connections were still being prepared.",
      "Self-hosted the workflow with persistent storage for repeatable testing.",
    ],
    outcome: [
      "A complete accommodation-first prototype and a verified SMS test send.",
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
