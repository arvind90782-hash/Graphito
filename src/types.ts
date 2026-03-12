export type UserRole = 'admin' | 'client';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: UserRole;
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'review' | 'completed' | 'cancelled';
  clientUid: string;
  budget?: string;
  deadline?: string;
  driveLinks?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProjectFile {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedBy: string;
  createdAt: string;
}

export interface Message {
  id: string;
  senderUid: string;
  content: string;
  timestamp: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  videoUrl?: string;
  description: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}
