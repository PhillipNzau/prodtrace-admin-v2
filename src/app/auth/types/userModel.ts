export interface LoginUserInterface {
  email: string,
  password: string
}

export interface SignUpUserInterface {
  first_name: string,
  last_name: string,
  phone_number: number,
  email: string,
  password: string,
  user_type_id?: number,
  confirm_password: string,
}

export interface UserInterface {
  id: number,
  first_name: string,
  last_name: string,
  email: string,
  phone_number: string,
  get_full_name: string,
  user_type_id: number,
  last_login: string,
}

export interface TokenInterface {
  expiry_time: any,
  lifetime: string,
  access: string,
  refresh: string,
}

export interface UserModelInterface {
  user: UserInterface,
  token: TokenInterface
}

export interface RefreshTokenInterface {
  access: string,
  refresh: string
}

export interface ListUsersInterface {
  count: string,
  next: number,
  previous: number,
  results: UserInterface[]
}

export interface RefreshTokenFailInterface {
  detail: string,
  code: string
}

export enum UserTypesEnum {
  REGULATOR = 1,
  FARMER = 2,
  END_USER = 3,
  ADMIN = 4
}
