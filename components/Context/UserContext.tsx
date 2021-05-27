import React from 'react'
import { } from 'next/app'

type Props = {
  children?: JSX.Element | JSX.Element[] | string | string[],
  user?: any
}

interface AppContextInterface {
  user?: any
}

const Context = React.createContext<AppContextInterface | null>(null)

export function useUserContext() {
  return React.useContext(Context)
}

const UserContext = ({
  children,
  user
}: Props) => {
  return (
    <Context.Provider value={{user}}>
      {children}
    </Context.Provider>
  )
}

export default UserContext
