import { Box, Image, ScrollView, Text, Textarea, TextareaInput } from "@gluestack-ui/themed";
import LinearGradientMoots from "../../components/geral/LinearGradientMoots";
import CabecalhoPerfil from "../../components/cabecalho/CabecalhoPerfil";
import { RoundedBottom } from "../../components/geral/Rounded";
import { TextoNegrito } from "../../components/geral/Texto";
import { BotaoCamera, BotaoEnviarNovoPost, BotaoGaleria, TesteContext } from "../../components/botao/BotoesPostComentario";
import { getIdStorage, getTokenStorage } from "../../utils/storageUtils";
import { usuarioApi } from "../../api/apis";
import { useEffect, useState } from "react";

const usuarioIcon = require('../../assets/UsuarioIcon.png')

export default function NovoPost(){
    const [user, setUser] = useState()

    const token = getTokenStorage();
    const id = getIdStorage();

    useEffect(() => {
        const reqUser = async() => {
            try{
                const user = await usuarioApi.get(`/buscar/${await id}`, {headers: {Authorization: await token}})

                const data = await user.data

                if(data){
                    setUser(data)
                    
                }
            }catch(e: any){
                alert(e.error.message.error)
            }
        }
        reqUser()

    }, [])

    return(
            <LinearGradientMoots>
                <ScrollView>
                    <CabecalhoPerfil titulo="Nova publicação" zIndex={1}/>
                    <RoundedBottom zIndex={0} minHeight={500} bg="$white" bottom={5} mb={10}>
                        <Box p={20} display="flex" justifyContent="space-between" minHeight={500}>
                            <Box display="flex">
                                <Box flexDirection="row" alignItems="center">
                                    <Image source={usuarioIcon} w={40} h={40}/>
                                    <TextoNegrito ml={2}>{user.nomeCompleto}</TextoNegrito>
                                </Box>
                                <Box justifyContent="center" >
                                    <Textarea ml={38} brw={0} w="85%" h={200} bottom={10}>
                                        <TextareaInput fontFamily="Poppins_500Medium" placeholder="No que você está pensando?"/>
                                    </Textarea>
                                </Box>
                            </Box>
                            <Box flexDirection="row" justifyContent="space-between">
                                <Box flexDirection="row">
                                    <BotaoGaleria/>
                                    <BotaoCamera />
                                </Box>
                                <BotaoEnviarNovoPost />
                            </Box>
                        </Box>
                    </RoundedBottom>
                </ScrollView>
            </LinearGradientMoots>
    )
}