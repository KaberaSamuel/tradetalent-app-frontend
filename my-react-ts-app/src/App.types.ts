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

export interface TokenTypes {
  refresh: string;
  access: string;
}
