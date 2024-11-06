import { createContext, useContext, useState } from "react";

export const MiscContext = createContext()

export const ProviderMiscContext = ({children}: any)=>{
    const [termos, setTermos] = useState([])

    return(
        <MiscContext.Provider value={{termos, setTermos}}>
            {children}
        </MiscContext.Provider>
    )
}

export const useMiscContext = ()=>{
    try {
        const context = useContext(MiscContext)
        if(!context){
            console.error('Contexto não encontrado.')
            return
        }
        return context
    } catch (e) {
        console.error('Erro ao utilizar contexto: ' + e)
    }
}