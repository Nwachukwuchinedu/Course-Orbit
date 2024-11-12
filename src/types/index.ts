export interface Course {
  id: string;
  title: string;
  headline: string;
  image: string;
  primary_category: string;
  content_info_short: string;
  rating: number;
  instructors: string[];
  language: string;
  instructional_level_simple: string;
  has_certificate: boolean;
  has_closed_caption: boolean;
  targetAudience: string[];
  what_you_will_learn_data: string[];
  requirements_data: string[];
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