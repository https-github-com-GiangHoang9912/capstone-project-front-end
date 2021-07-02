import { ReactNode } from "react";

export interface AccountContextProps {
  children: ReactNode
}


export interface Account {
  id: number,
  username: string,
  role: number,
  profile: Profile
}

export interface Profile {
  firstname?: string,
  lastname?: string,
  email?: string,
  phone?: string,
  dateofbirth?: string,
  avatar?: string,
  address?: string
}
