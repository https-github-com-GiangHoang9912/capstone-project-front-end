import { createContext, useState } from 'react'
import { AccountContextProps, Account } from '../interface/acc'

const accountDefault: Account = {
  username: 'admin',
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
})

export const AccountContextProvider = ({ children }: AccountContextProps) => {
  const [account, setAccountLogin] = useState(accountDefault)
  const setInformation = (accountLogin: Account) => {
    setAccountLogin(accountLogin)
  }
  const accountContextData = account

  return (
    <AccountContext.Provider value={{ accountContextData, setInformation }}>
      {children}
    </AccountContext.Provider>
  )
}
