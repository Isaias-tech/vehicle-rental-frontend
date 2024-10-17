export enum Role {
  CLIENT = 'CLIENT',
  EMPLOYEE = 'EMPLOYEE',
  MANAGER = 'MANAGER',
  ADMINISTRATOR = 'ADMINISTRATOR',
}

export interface UserAccount {
  id?: number;
  role: Role;
  email: string;
  first_name: string;
  last_name: string;
  password?: string;
  date_joined?: string;
}

export interface UserProfile {
  user?: number | UserAccount;
  birth_date?: string;
  gender?: string;
  profile_picture?: File;
  passport?: File;
  drivers_license?: File;
  national_id?: File;
  phone_number?: string;
  country?: string;
  city?: string;
  address?: string;
}
