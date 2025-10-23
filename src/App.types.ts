export interface UserTypes {
  name: string;
  slug: string;
  first_name?: string;
  name_initials?: string;
  email: string;
  location: string;
  about: string;
  services_offered: string;
  services_needed: string;
  profile_image?: null | string;
  my_listings_count: number;
}

export interface ListingTypes {
  id: number;
  title: string;
  slug: string;
  type: string;
  work_mode: string;
  location: string;
  description: string;
  skills: string;
  user: UserTypes;
  delta_time: string;
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

export interface MessageTypes {
  id: string;
  room: string;
  from_user: UserTypes;
  to_user: UserTypes;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface ConversationTypes {
  id: string;
  name: string;
  last_message: MessageTypes | null;
  other_user: UserTypes;
}
