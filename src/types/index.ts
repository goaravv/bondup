export interface User {
  name: string;
  partnerName: string;
  avatar?: string;
  partnerAvatar?: string;
  relationshipStartDate: string;
}

export interface Task {
  id: number;
  title: string;
  prompt: string;
  category: 'Sweet' | 'Flirty' | 'Intimate' | 'Wild';
  emoji: string;
  verificationRule: string;
  milestone?: string;
}

export interface UserProgress {
  completedTasks: number[];
  currentTask: number;
  unlockedMilestones: string[];
  paidUpTo: number;
}

export interface Milestone {
  id: string;
  name: string;
  description: string;
  tasksRequired: number;
  price?: number;
  emoji: string;
}