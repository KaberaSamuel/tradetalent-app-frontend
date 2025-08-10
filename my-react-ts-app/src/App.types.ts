export interface UserTypes {
  first_name: string;
  last_name: string;
  email: string;
  name_initials?: string;
  location?: string;
  about?: string;
  services_offered?: string;
  services_needed?: string;
  profile_image?: null | string;
}

export interface TokenTypes {
  refresh: string;
  access: string;
}
