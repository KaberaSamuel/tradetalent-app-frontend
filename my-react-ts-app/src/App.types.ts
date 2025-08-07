export interface UserTypes {
  first_name: string;
  last_name: string;
  email: string;
}

export interface SignupFormTypes {
  fullname: string;
  email: string;
  password1: string;
  password2: string;
}

export interface LoginFormTypes {
  email: string;
  password: string;
  token?: string;
}

export interface TokenTypes {
  refresh: string;
  access: string;
}
