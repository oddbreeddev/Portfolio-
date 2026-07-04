export interface Project {
  id: string;
  title: string;
  desc: string;
  longDesc: string;
  techContext: string;
  challenge: string;
  solution: string;
  image: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  links?: {
    demo?: string;
    github?: string;
  };
}

export interface ProjectData {
  [key: string]: Project;
}

export interface TerminalLog {
  id: string;
  type: 'input' | 'output' | 'error' | 'success' | 'system';
  text: string;
}

export type SkillCategory = 'embedded' | 'backend' | 'frontend' | 'methods';

export interface Skill {
  name: string;
  level: number; // 0-100
  category: SkillCategory;
  description: string;
}
