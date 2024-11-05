import { Box, FlatList, Image, Input, InputField, InputIcon, InputSlot, Pressable,  styled, useToast } from "@gluestack-ui/themed";
import { TextoNegrito } from "../geral/Texto";
import { useRef, useState } from "react";
import { StyledShadowBox } from "../../screen/login/CadastroScreen";

import BotaoVoltar from "../botao/BotaoVoltar";
import { useNavigation} from "@react-navigation/native";
import { RoundedBottomSemSombra } from "../geral/Rounded";
import { searchApi } from "../../api/apis";
import { getTokenStorage } from "../../utils/storageUtils";
import { Keyboard } from "react-native";
import { abrirToast } from "../geral/ToastMoots";
import FiltrosModal from "../modal/FiltrosModal";
const botaoEnviar = require('../../assets/EnviarIconRounded.png')
const pesquisaIcon = require('../../assets/PesquisaIcon.png')

interface ITermoProps{
    termo: string,
}

export const BottomRadiusShadowBox = styled(StyledShadowBox, {
    justifyContent: 'center',
    py: 10,
    px: 10,
    w: '100%',
    bg: '$white',
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
})


export default function BarraPesquisa({extended=true, valorParam='', ...rest}){
    const toast = useToast()
    const navigation = useNavigation()
    const input = useRef(null)
    const [isExtended, setIsExtended] = useState<boolean>(extended)
    const [isInvalid, setIsInvalid] = useState<boolean>(false)
    const [valor, setValor] = useState<string>('')
    const [termos, setTermos] = useState<Array<String>>([])

    const desfocarInput = () => {
        input.current.blur()
        Keyboard.dismiss()
    }

    const handlePesquisar = async()=>{
        if(valor==='' && valorParam===''){
            setIsInvalid(true)
            abrirToast(toast, 'error', 'Para pesquisar um usuário ou uma publicação, você deve digitar algo no campo de pesquisa.')
            desfocarInput()
        }
        else{
            setIsInvalid(false)
            try {
                const token = await getTokenStorage()
                const resultadoPerfil = await searchApi.get(`/user`, {
                    params: {
                        query: valor
                    },
                    headers: {
                        Authorization: token
                    }
                })
                if(resultadoPerfil){
                    navigation.navigate('pesquisaPalavraChave', {valor: valor, dataPerfil: resultadoPerfil.data || null, dataPost: null})
                    setTimeout(()=>{
                        setTermos([...termos, valor])
                    }, 100)
                    setValor('')
                }
            } catch (error) {
                alert(String(error))
            }
        }
    }

    return(
            <BottomRadiusShadowBox {...rest}>
                <Box  flexDirection="row" justifyContent={!isExtended ? "space-around" : "space-between"} alignItems="center" py={10}>
                    {!isExtended && (
                        <Box>
                            <BotaoVoltar onPress={()=>{navigation.goBack(); setIsExtended(true); setValor('')}}/>
                        </Box>
                    )}

                    <Box w={!isExtended ? "70%" : "85%"}>
                        <Input ref={input} onBlur={desfocarInput} variant="rounded" h={35} borderWidth={2} borderColor={isInvalid ? "#FF0000" : "$black"} isInvalid={isInvalid} onSubmitEditing={handlePesquisar}>
                            <InputSlot>
                                <InputIcon w="100%" ml={10} bottom={2}><Image source={pesquisaIcon} w={20} h={20} alt='pesquisa'/></InputIcon>
                            </InputSlot>
                            <InputField 
                                fontFamily="Poppins_500Medium" 
                                placeholder={valorParam!='' ? valorParam : "Pesquise algo..."} 
                                ml={-10} 
                                pt={5} 
                                value={valor}
                                onChangeText={(novoValor)=>setValor(novoValor)}
                            />
                            <InputSlot>
                                    <Pressable onPress={handlePesquisar}>
                                        <InputIcon w="100%" mr={5} bottom={2}>
                                            <Image source={botaoEnviar} w={20} h={20} alt='enviar'/>
                                        </InputIcon>
                                    </Pressable>
                            </InputSlot>
                        </Input>
                    </Box>

                    <Box mr={isExtended ? 8 : 0}>
                        <FiltrosModal />
                    </Box>

                </Box>

                {isExtended && <Box flexDirection="row" display="flex">
                    <TextoNegrito mr={2.5} display="flex">Recentes:</TextoNegrito>
                    {termos[0] ? <FlatList data={termos} renderItem={({item})=>(
                        <TermoRecente termo={item}/>
                    )} contentContainerStyle={{flexDirection: 'row', gap: 5, flexWrap: 'wrap', maxHeight: 80}}/> : <TextoNegrito>Nenhuma pesquisa recente.</TextoNegrito>}
                </Box>}
                
            </BottomRadiusShadowBox>
    )
}

export function BarraPesquisaChat(){
    return(
        <RoundedBottomSemSombra justifyContent="center" p={10}>
            <Box flexDirection="row" justifyContent="space-between" >
                <Input variant="rounded" h={35} w="100%" borderWidth={2} borderColor="$black">
                    <InputSlot>
                        <InputIcon w="100%" ml={10} bottom={2}><Image source={pesquisaIcon} w={20} h={20} alt='pesquisa'/></InputIcon>
                    </InputSlot>
                    <InputField 
                        fontFamily="Poppins_500Medium" 
                        placeholder="Procure alguém..."
                        ml={-10} 
                        pt={5}
                    />
                    <InputSlot>
                        <Pressable>
                            <InputIcon w="100%" mr={5} bottom={2}>
                                <Image source={botaoEnviar} w={20} h={20} alt='enviar'/>
                            </InputIcon>
                        </Pressable>
                    </InputSlot>
                </Input>
            </Box>
        </RoundedBottomSemSombra>
    )
}

export function TermoRecente({termo, ...rest}: ITermoProps){
    const navigation = useNavigation()
    const handlePress = async()=>{
        try {
            const token = await getTokenStorage()
            const resultado = await searchApi.get('/user', {
                params:{
                    query: termo
                },
                headers: {Authorization: token}
            })
            if(resultado.data){
                navigation.navigate('pesquisaPalavraChave', {valor: termo, dataPerfil: resultado.data || null})
            }
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <Pressable bg="$add1" alignItems= "center" rounded= {15} px={10} onPress={handlePress} onLongPress={()=>alert(termo)} {...rest}>
            <TextoNegrito color="$lightSeis">{termo}</TextoNegrito>
        </Pressable>
    )
}