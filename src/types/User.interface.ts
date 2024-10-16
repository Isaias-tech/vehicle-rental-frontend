export interface AccountDetails {
  profile_picture?: string;
  drivers_licence?: string;
  passport?: string;
  identity_card?: string;
  phone_number?: string;
  city?: string;
  address?: string;
}

export interface UserAccount {
  role: string;
  email: string;
  first_name: string;
  last_name: string;
  password?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
}

export interface RegisterData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface PasswordChangeData {
  old_password: string;
  new_password: string;
  re_new_password: string;
}
