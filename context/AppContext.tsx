import { createContext } from 'react'

type ImageUrlType = {
  url?: string,
  raw?: string
}

export interface UserDataContext {
  addres?: string,
  banned?: string,
  bannedUntil?: null,
  createdAt?: string,
  createdBy?: string | null,
  deletedAt?: string | null,
  deletedBy?: string | null,
  email?: string,
  emailVerified?: boolean,
  gender?: string | number,
  id?: number,
  image?: ImageUrlType,
  lastLogin?: string,
  name?: string,
  phone?: string,
  phoneVerified?: boolean,
  provider?: string | null,
  provider_id?: string | null,
  roleId?: number,
  status?: string,
  updatedAt?: string,
  updatedBy?: number,
  username?: string,
}

export interface AppContextType {
  isAuthenticated?: boolean,
  token?: string | null,
  user?: UserDataContext,
  logout?: () => void
}

const initialData = {
  isAuthenticated: false,
  token: null,
  user: {},
  logout: () => {}
}
const AppContext = createContext<AppContextType>(initialData)

export default AppContext