// Portfolio Data Service - Analyzes actual portfolio files for accurate AI responses
import { aboutMe, technicalSkills, certifications } from "../../public/data/about";
import { contactInfo } from "../../public/data/contact";
import { homeData } from "../../public/data/home";
import { projects } from "../../public/data/projects";

export interface PortfolioData {
  about: typeof aboutMe;
  skills: typeof technicalSkills;
  certifications: typeof certifications;
  contact: typeof contactInfo;
  home: typeof homeData;
  projects: typeof projects;
}

export class PortfolioDataService {
  private static instance: PortfolioDataService;
  private portfolioData: PortfolioData;

  private constructor() {
    this.portfolioData = {
      about: aboutMe,
      skills: technicalSkills,
      certifications: certifications,
      contact: contactInfo,
      home: homeData,
      projects: projects
    };
  }

  public static getInstance(): PortfolioDataService {
    if (!PortfolioDataService.instance) {
      PortfolioDataService.instance = new PortfolioDataService();
    }
    return PortfolioDataService.instance;
  }

  // Get accurate skills information from About.tsx data
  public getSkillsInfo(): string {
    const skillCategories = Object.keys(this.portfolioData.skills);
    const skillsList = skillCategories.map(category => {
      const skills = this.portfolioData.skills[category];
      return `**${category}**: ${skills.join(", ")}`;
    }).join("\n\n");

    return `Joel's technical expertise includes:\n\n${skillsList}`;
  }

  // Get accurate contact information from Contact.tsx data
  public getContactInfo(): string {
    const email = "jlaggui47@gmail.com";
    const phone = "+63 915 368 3496";
    const github = "github.com/GITLAGGUI";
    const linkedin = "linkedin.com/in/joel-laggui-801104369";

    return `**Contact Joel:**\n\n**Email**: ${email}\n**Phone**: ${phone}\n**GitHub**: ${github}\n**LinkedIn**: ${linkedin}\n\nJoel is available for freelance projects, full-time opportunities, and consulting work. He offers free initial consultations to discuss your project requirements.`;
  }

  // Get accurate about information
  public getAboutInfo(): string {
    const description = this.portfolioData.about.description.join("\n\n");
    return `**About Joel:**\n\n${description}`;
  }

  // Get accurate projects information
  public getProjectsInfo(): string {
    const projectsList = this.portfolioData.projects.map(project => {
      const technologies = project.Technologies.join(", ");
      return `**${project.Title}**: ${project.Description}\n*Technologies*: ${technologies}`;
    }).join("\n\n");

    return `**Joel's Featured Projects:**\n\n${projectsList}`;
  }

  // Get accurate certifications information
  public getCertificationsInfo(): string {
    const certsList = this.portfolioData.certifications.map(cert => {
      return `**${cert.title}** (${cert.date})\n*Issuer*: ${cert.issuer}\n*Description*: ${cert.description}`;
    }).join("\n\n");

    return `**Joel's Recent Certifications:**\n\n${certsList}`;
  }

  // Get education information
  public getEducationInfo(): string {
    const education = this.portfolioData.home.education.map(edu => edu.Label).join(" - ");
    return `**Education**: ${education}`;
  }

  // Get location information
  public getLocationInfo(): string {
    const location = this.portfolioData.home.contactInfo.find(info => info.Label === "Philippines");
    return `**Location**: ${location?.Label || "Philippines"} - Joel works with clients globally and offers remote development services.`;
  }

  // Analyze user query and return accurate response based on actual portfolio data
  public analyzeQuery(query: string): string {
    const lowerQuery = query.toLowerCase();

    // Skills-related queries
    if (lowerQuery.includes('skill') || lowerQuery.includes('technology') || lowerQuery.includes('tech') || 
        lowerQuery.includes('programming') || lowerQuery.includes('language') || lowerQuery.includes('framework') ||
        lowerQuery.includes('react') || lowerQuery.includes('node') || lowerQuery.includes('python') ||
        lowerQuery.includes('javascript') || lowerQuery.includes('typescript') || lowerQuery.includes('frontend') ||
        lowerQuery.includes('backend') || lowerQuery.includes('mobile') || lowerQuery.includes('data')) {
      return this.getSkillsInfo();
    }

    // Contact-related queries
    if (lowerQuery.includes('contact') || lowerQuery.includes('email') || lowerQuery.includes('phone') || 
        lowerQuery.includes('reach') || lowerQuery.includes('hire') || lowerQuery.includes('github') || 
        lowerQuery.includes('linkedin') || lowerQuery.includes('available') || lowerQuery.includes('whatsapp')) {
      return this.getContactInfo();
    }

    // Projects-related queries
    if (lowerQuery.includes('project') || lowerQuery.includes('portfolio') || lowerQuery.includes('app') || 
        lowerQuery.includes('website') || lowerQuery.includes('application') || lowerQuery.includes('build') ||
        lowerQuery.includes('work') || lowerQuery.includes('example') || lowerQuery.includes('demo')) {
      return this.getProjectsInfo();
    }

    // About/Experience queries
    if (lowerQuery.includes('about') || lowerQuery.includes('experience') || lowerQuery.includes('background') || 
        lowerQuery.includes('who') || lowerQuery.includes('developer') || lowerQuery.includes('analyst')) {
      return this.getAboutInfo();
    }

    // Certification queries
    if (lowerQuery.includes('certification') || lowerQuery.includes('certificate') || lowerQuery.includes('qualification') ||
        lowerQuery.includes('education') || lowerQuery.includes('degree') || lowerQuery.includes('university')) {
      return this.getCertificationsInfo() + "\n\n" + this.getEducationInfo();
    }

    // Location queries
    if (lowerQuery.includes('location') || lowerQuery.includes('where') || lowerQuery.includes('philippines') ||
        lowerQuery.includes('remote') || lowerQuery.includes('timezone')) {
      return this.getLocationInfo();
    }

    // Services queries
    if (lowerQuery.includes('service') || lowerQuery.includes('help') || lowerQuery.includes('develop') || 
        lowerQuery.includes('create') || lowerQuery.includes('offer') || lowerQuery.includes('cost') || 
        lowerQuery.includes('price') || lowerQuery.includes('rate')) {
      return this.getServicesInfo();
    }

    // Default comprehensive response
    return this.getDefaultResponse();
  }

  private getServicesInfo(): string {
    return `**Joel's Development Services:**

**Full-Stack Web Development**: Modern React/Next.js applications with Node.js backends
**Mobile App Development**: Cross-platform apps using React Native and Flutter
**Data Analysis & Visualization**: Python analytics, Power BI dashboards, and business intelligence
**API Development**: RESTful APIs, database design, and cloud deployment
**E-commerce Solutions**: Complete online store development with payment integration
**Custom Software Development**: Tailored solutions for specific business needs

**Engagement Models**: Freelance projects, full-time opportunities, consulting work
**Rates**: Competitive pricing with flexible payment terms
**Free Consultation**: Initial project discussion and technical recommendations

Contact Joel at **jlaggui47@gmail.com** to discuss your project requirements.`;
  }

  private getDefaultResponse(): string {
    return `**Joel Laggui Jr** is a **Full-Stack Developer** and **Data Analyst** with expertise in modern web technologies, mobile development, and data science.

**Quick Facts:**
• **Location**: Philippines (serves global clients)
• **Specialties**: React/Next.js, Node.js, Python, Mobile Apps, Data Analytics
• **Recent Projects**: Eskwelahan.ph (Educational App), Interactive Power BI Dashboard, Maria Lourdes Mansion Website
• **Contact**: jlaggui47@gmail.com | +63 915 368 3496

What specific area would you like to know more about? (Skills, Projects, Contact, Services)`;
  }
}

export default PortfolioDataService;