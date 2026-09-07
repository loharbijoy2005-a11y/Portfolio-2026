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

export interface GitHubRepo {
  id: number | string;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  homepage?: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  category: 'Web Apps' | 'Backend & APIs' | 'Algorithms' | 'Tools';
  topics?: string[];
  updated_at?: string;
}

export interface PricingTier {
  id: string;
  name: string;
  priceRange: string;
  numericBasePrice: number;
  badge?: string;
  isPopular?: boolean;
  idealFor: string;
  features: string[];
  ctaText: string;
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

export interface EstimatorModule {
  id: string;
  name: string;
  cost: number;
  time: string;
  serviceIds: string[];
  description?: string;
}
