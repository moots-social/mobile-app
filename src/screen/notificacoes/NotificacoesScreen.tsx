import { Box, Text } from "@gluestack-ui/themed";
import LinearGradientMoots from "../../components/geral/LinearGradientMoots";
import CabecalhoPerfil from "../../components/cabecalho/CabecalhoPerfil";
import Notificacao from "../../components/notificacao/Notificacao";
import { useEffect, useState } from "react";
import Loading from "../../components/geral/Loading";
import { useDispatch, useSelector } from "react-redux";
import { autenticar, desautenticar } from "../../redux/useAutenticacao";

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