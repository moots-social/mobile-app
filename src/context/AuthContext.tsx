import { createContext, useContext, useState } from "react";

export const AuthContext = createContext()

export const ProviderAuthContext = ({children}: any)=>{
    const [autentication, setAutentication] = useState('')

    return(
        <AuthContext.Provider value={{autentication, setAutentication}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = ()=>{
    try {
        const context = useContext(AuthContext)
        if(!context){
            console.error('Contexto não encontrado.')
            return
        }
        return context
    } catch (e) {
        console.error('Erro ao utilizar contexto: ' + e)
    }
}