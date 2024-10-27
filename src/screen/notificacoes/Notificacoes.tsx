import { Box, Text } from "@gluestack-ui/themed";
import LinearGradientMoots from "../../components/LinearGradientMoots";
import CabecalhoPerfil from "../../components/CabecalhoPerfil";
import Notificacao from "../../components/Notificacao";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";

export default function Notificacoes(){
    const [isLoading, setIsLoading] = useState(true)
    useEffect(()=>{
        setTimeout(()=>{
        setIsLoading(false)
        }, 150)
    }, [])
    return (
            <LinearGradientMoots>
                <CabecalhoPerfil titulo="Notificações" temBotaoVoltar={false}/>
            {isLoading ? <Loading isOpen={isLoading}/> : (
                <Box mt={35} alignItems="center">
                    <Notificacao />
                </Box>
            )}
            </LinearGradientMoots>
    )
}