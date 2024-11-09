import { createContext, useContext, useState } from "react";

export const MiscContext = createContext()

export const ProviderMiscContext = ({children}: any)=>{
    const [termos, setTermos] = useState([])
    const [filtros, setFiltros] = useState({
        radio: 'tudo',
        usuario: 'qualquerUm',
        selectUsuario: 'Qualquer',
        checkPost: true
    })

    return(
        <MiscContext.Provider value={{termos, setTermos, filtros, setFiltros}}>
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