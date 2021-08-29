import { createContext, useState } from 'react'
import { AccountContextProps, Account } from '../interface/acc'

const accountDefault: Account = {
  id: +(localStorage.getItem('id') ?? 0),
  username: '',
  role: 0,
  profile: {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    dateofbirth: '',
    avatar: '',
    address: '',
  },
}

export const AccountContext = createContext({
  accountContextData: accountDefault,
  setInformation: (accountLogin: Account) => {},
  isLoggedIn: false
})

export const AccountContextProvider = ({ children }: AccountContextProps) => {
  const [account, setAccountLogin] = useState(accountDefault)
  const setInformation = (accountLogin: Account) => {
    setAccountLogin(accountLogin)
  }
  const accountContextData = account
  const isLoggedIn = account.id !== 0
  console.info(isLoggedIn)

  return (
    <AccountContext.Provider value={{ accountContextData, setInformation, isLoggedIn }}>
      {children}
    </AccountContext.Provider>
  )
}
