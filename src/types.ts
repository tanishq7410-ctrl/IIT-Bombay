export interface TelemetryStat {
  id: string;
  metricCode: string;
  value: number;
  suffix: string;
  label: string;
  description: string;
  percentage: number;
  color: 'cyan' | 'secondary' | 'dim' | 'white';
}

export interface TechDomain {
  id: string;
  code: string;
  title: string;
  description: string;
  iconName: string;
  protocol: string;
  statusMetric: string;
  colorScheme: 'cyan' | 'violet' | 'blue';
  keyTechnologies: string[];
  featuredExhibits: string[];
}

export interface Competition {
  id: string;
  serial: string;
  number: string;
  name: string;
  category: 'robotics' | 'ai' | 'aerospace' | 'quantum';
  prizePool: string;
  deadline: string;
  phase: string;
  description: string;
  tags: string[];
  teamSize: string;
  eligibility: string;
  venue: string;
  rulesOverview: string[];
}

export interface Speaker {
  id: string;
  name: string;
  title: string;
  organization: string;
  topic: string;
  date: string;
  time: string;
  venue: string;
  frequency: string;
  image: string;
  accent: 'cyan' | 'violet' | 'blue';
  bio: string;
  papersPublished?: string;
}

export interface ExperienceItem {
  id: string;
  code: string;
  title: string;
  category: string;
  description: string;
  scheduleOrLocation: string;
  badge: string;
  accent: 'cyan' | 'violet' | 'blue';
  colSpan?: string;
}

export interface PassTicket {
  ticketId: string;
  fullName: string;
  email: string;
  institution: string;
  category: string;
  domain: string;
  issueDate: string;
  clearanceLevel: string;
  gateLocation: string;
}
