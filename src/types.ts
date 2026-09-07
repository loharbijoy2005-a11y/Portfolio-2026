export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  deliverables: string[];
  techStack: string[];
  iconName: string;
  highlightText: string;
  baseEstimate: number;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  category: 'SaaS' | 'E-Commerce' | 'Dashboard' | 'Enterprise';
  summary: string;
  outcome: string;
  metrics: {
    label: string;
    value: string;
  }[];
  techStack: string[];
  architectureNotes: string;
  image: string;
  demoUrl?: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export interface ArchitectureLayer {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  techs: { name: string; desc: string; icon: string }[];
  codeSnippet: string;
  keyBenefits: string[];
}

export interface EstimateOptions {
  projectType: string;
  selectedModules: string[];
  timeline: string;
  includeGST: boolean;
  name: string;
  email: string;
  company: string;
  message: string;
}
