export interface UserTypes {
  name: string;
  first_name?: string;
  name_initials?: string;
  email: string;
  location: string;
  about: string;
  services_offered: string;
  services_needed: string;
  profile_image?: null | string;
}

export interface ListingTypes {
  title: string;
  type: string;
  work_mode: string;
  location: string;
  description: string;
  skills: string;
}

export interface TokenTypes {
  refresh: string;
  access: string;
}

export interface ReviewTypes {
  id: string;
  user: UserTypes;
  revieweeEmail: string;
  date: string;
  message: string;
  rating: number;
}
