export interface UserTypes {
  first_name: string;
  last_name: string;
  password: string;
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

// redux tut
export interface User {
  id: string;
  name: string;
  email: string;
}
