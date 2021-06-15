import React, { createContext, useState } from "react";


export const AccountContext = createContext({
    accountContextData: {},
    setInformation: (accountLogin: any) => {},
})

export const AccountContextProvider = ({children}: any) => {
    const [account, setAccountLogin] = useState({
        username: '',
        role: 0,
        profile: {}
    })

    const setInformation = (accountLogin: any) => {
        setAccountLogin(accountLogin)
    }

    const accountContextData = {
        account
    }

    return (
        <AccountContext.Provider value={{accountContextData, setInformation}}>
            {children}
        </AccountContext.Provider>
    )
}