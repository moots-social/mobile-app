import { Box, RefreshControl, ScrollView, } from "@gluestack-ui/themed";
import LinearGradientMoots from "../../components/geral/LinearGradientMoots";
import CabecalhoPerfil from "../../components/cabecalho/CabecalhoPerfil";
import Notificacao from "../../components/notificacao/Notificacao";
import { useCallback, useEffect, useState } from "react";
import Loading from "../../components/geral/Loading";
import notificacaoUtils from "../../utils/notificacaoUtils";
import { useDispatch, useSelector } from "react-redux";
import { TextoNegrito } from "../../components/geral/Texto";

export default function Notificacoes(){
    const [isLoading, setIsLoading] = useState(true)
    const [notificacoes, setNotificacoes] = useState<any[]>()
    const [refreshing, setRefreshing] = useState<boolean>(false)

    const buscarNotificacoes = async()=>{
        const res = await notificacaoUtils.buscarNotificacoes()
        if(res.length>0) setNotificacoes(res.reverse())
        else setNotificacoes([])
    }
    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
          await buscarNotificacoes()
        } catch (err) {
          console.error(err);
        } finally {
          setRefreshing(false);
        }}, [])

    useEffect(()=>{

        buscarNotificacoes()
        setIsLoading(false)
    }, [])

    return (
            <LinearGradientMoots>
                <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
                    <CabecalhoPerfil titulo="Notificações" temBotaoVoltar={false}/>
                    {isLoading ? <Loading isOpen={isLoading}/> : (
                    <Box mb={20} mt={5} alignItems="center">
                        {notificacoes && notificacoes.length>0 ? notificacoes?.map((notificacao)=>(
                            <Notificacao mt={15} notificacao={notificacao} key={notificacao.notificationId}/>
                        )) : <TextoNegrito mt={15}>Nenhuma notificação recente.</TextoNegrito>}
                    </Box>
                )}
                </ScrollView>
            </LinearGradientMoots>
    )
}