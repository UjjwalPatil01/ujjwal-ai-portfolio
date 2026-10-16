export type DiagramType = 'moodmate' | 'docuchat' | 'codenova';

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface ProfileIdentity {
  name: string;
  monogram: string;
  brand: string;
  title: string;
  headline: string;
  heroSummary: string;
  location: string;
  email: string;
  phone: string;
  linkedinUrl: string;
  githubUrl: string;
  huggingfaceUrl: string;
  resumePath: string;
  careerObjective: string;
  aboutParagraphs: string[];
  aboutHighlights: {
    label: string;
    value: string;
    detail: string;
  }[];
}

export interface TechProofItem {
  name: string;
  category: string;
  tag: string;
}

export interface WorkflowStep {
  step: string;
  title: string;
  description: string;
  tech: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  featured: boolean;
  isTeamProject: boolean;
  roleLabel: string;
  accentColor: 'cyan' | 'blue' | 'violet';
  diagramType?: DiagramType;
  summary: string;
  problemStatement: string;
  whatItDoes: string;
  technicalApproach: string;
  myContribution: string[];
  engineeringDecisions: string[];
  workflowSteps: WorkflowStep[];
  verifiedStack: string[];
  liveUrl: string | null;
  liveStatusNote?: string;
  githubUrl: string | null;
  architectureNote?: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  skills: {
    name: string;
    context: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  certificateUrl: string;
  summary: string;
  achievements: string[];
  technologies: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  cgpa: string;
  highlights: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  badgeText: string;
  description: string;
  metrics?: string[];
  credentialUrl: string;
  actionLabel: string;
}

export interface ResearchPublication {
  title: string;
  venue: string;
  venueDocumentedHeader: string;
  publicationDate: string;
  volumeIssue: string;
  pages: string;
  eissn: string;
  doiPrefix: string;
  authors: string;
  correspondingAuthor: string;
  paperUrl: string;
  certificateUrl: string;
  abstractSummary: string;
  methodologyHighlights: string[];
  keywords: string[];
}
