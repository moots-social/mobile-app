import { createContext, useContext, useState } from "react";

export const UsuarioContext = createContext()

export const ProviderUsuarioContext = ({children}: any)=>{
    const [usuario, setUsuario] = useState('')

    return(
        <UsuarioContext.Provider value={{usuario, setUsuario}}>
            {children}
        </UsuarioContext.Provider>
    )
}

export const useUsuarioContext = ()=>{
    try {
        const context = useContext(UsuarioContext)
        if(!context){
            console.error('Contexto não encontrado.')
            return
        }
        return context
    } catch (e) {
        console.error('Erro ao utilizar contexto: ' + e)
    }
}