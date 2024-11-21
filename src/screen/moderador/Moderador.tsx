import { Box, RefreshControl, ScrollView, useToast } from "@gluestack-ui/themed";
import LinearGradientMoots from "../../components/geral/LinearGradientMoots";
import CabecalhoPerfil from "../../components/cabecalho/CabecalhoPerfil";
import { TextoNegrito } from "../../components/geral/Texto";
import { FullRounded } from "../../components/geral/Rounded";
import Denuncia from "../../components/denuncia/Denuncia";
import { useCallback, useEffect, useState } from "react";
import denunciaUtils from "../../utils/denunciaUtils";
import { abrirToast } from "../../components/geral/ToastMoots";

export default function Moderador(){
    const toast = useToast()
    const [loading, setLoading] = useState<boolean>()
    const [refreshing, setRefreshing] = useState<boolean>()
    const [denuncias, setDenuncias] = useState<any[]>()

    
    const buscarDenuncias = async()=>{
        const resultado = await denunciaUtils.buscarDenuncias()
        
        if(resultado!=0) setDenuncias(resultado)
            else setDenuncias([])
    }

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
          await buscarDenuncias()
        } catch (err) {
          console.error(err);
        } finally {
          setRefreshing(false);
    }}, [])

    const handleDenunciaExcluida = () => {
        if(denuncias) onRefresh()
    }

    useEffect(()=>{
        buscarDenuncias()
    }, [])

    return (
        <LinearGradientMoots>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
                <CabecalhoPerfil titulo="Moderador" mb={10}/>
                <FullRounded bg='$white' alignSelf='center' p='$2.5' w='95%' mb={10}>
                    <TextoNegrito>Total de denúncias realizadas: {denuncias ? String(denuncias.length) : String(0)}</TextoNegrito>
                </FullRounded>
                <Box alignItems='center'>
                    {denuncias && denuncias.length>0? denuncias.map((denuncia)=> (
                        <Denuncia mb={15} postId={denuncia.postId} motivo={denuncia.denuncia} denunciaId={denuncia.id} onDenunciaExcluida={handleDenunciaExcluida} onPostExcluido={handleDenunciaExcluida}/>
                    )) : <TextoNegrito>Nenhuma denúncia a exibir.</TextoNegrito>}
                </Box>
            </ScrollView>
        </LinearGradientMoots>
    )
}