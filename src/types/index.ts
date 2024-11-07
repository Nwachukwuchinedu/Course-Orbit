export interface Course {
  id: string;
  title: string;
  headline: string;
  imageUrl: string;
  category: string;
  duration: string;
  rating: number;
  instructor: string;
  language: string;
  difficulty: string;
  hasCertificate: boolean;
  hasClosedCaptions: boolean;
  targetAudience: string[];
  learningOutcomes: string[];
  requirements: string[];
  description: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  enrolledCourses: string[];
  activePlan?: PricingPlan;
  planExpiryDate?: Date;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  duration: number;
  features: string[];
}

export type AuthStatus = 'authenticated' | 'unauthenticated' | 'loading';