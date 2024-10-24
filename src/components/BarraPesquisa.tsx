import { Box, Image, Input, InputField, InputIcon, InputSlot, Pressable,  styled } from "@gluestack-ui/themed";
import FiltrosModal from "./FiltrosModal";
import { TextoNegrito } from "./Texto";
import { useState } from "react";
import { StyledShadowBox } from "../screen/login/Cadastro";

import BotaoVoltar from "./BotaoVoltar";
import { useNavigation, useRoute } from "@react-navigation/native";
import { RoundedBottomSemSombra } from "./Rounded";

const botaoEnviar = require('../assets/EnviarIconRounded.png')
const pesquisaIcon = require('../assets/PesquisaIcon.png')

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

export default function BarraPesquisa({extended=true, valorParam=''}){
    const navigation = useNavigation()
    const [isExtended, setIsExtended] = useState<boolean>(extended)
    const [isInvalid, setIsInvalid] = useState<boolean>(false)
    const [valor, setValor] = useState<string>('')

    const handlePesquisar = ()=>{
        if(valor==='' && valorParam===''){
            setIsInvalid(true)
            return
        }
        setIsInvalid(false)
        navigation.navigate('pesquisaPalavraChave', {valor: valor})
    }

    return(
            <BottomRadiusShadowBox>
                <Box  flexDirection="row" justifyContent={!isExtended ? "space-around" : "space-between"} alignItems="center" py={10}>
                    {!isExtended && (
                        <Box>
                            <BotaoVoltar onPress={()=>{navigation.goBack(); setIsExtended(true); setValor('')}}/>
                        </Box>
                    )}

                    <Box w={!isExtended ? "70%" : "85%"}>
                        <Input variant="rounded" h={35} borderWidth={2} borderColor={isInvalid ? "#FF0000" : "$black"} isInvalid={isInvalid}>
                            <InputSlot>
                                <InputIcon w="100%" ml={10} bottom={2}><Image source={pesquisaIcon} w={20} h={20}/></InputIcon>
                            </InputSlot>
                            <InputField 
                                fontFamily="Poppins_500Medium" 
                                placeholder={valorParam!='' ? valorParam : "Pesquise algo..."} 
                                ml={-10} 
                                pt={5} 
                                onChangeText={(novoValor)=>setValor(novoValor)}
                            />
                            <InputSlot>
                                    <Pressable onPress={handlePesquisar}>
                                        <InputIcon w="100%" mr={5} bottom={2}>
                                            <Image source={botaoEnviar} w={20} h={20}/>
                                        </InputIcon>
                                    </Pressable>
                            </InputSlot>
                        </Input>
                    </Box>

                    <Box mr={isExtended ? 8 : 0}>
                        <FiltrosModal />
                    </Box>

                </Box>

                {isExtended && <Box flexDirection="row" gap={5}>
                    <TextoNegrito>Recentes:</TextoNegrito>
                    <TermoRecente termo='oi'/>
                    <TermoRecente termo='teste'/>
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
                        <InputIcon w="100%" ml={10} bottom={2}><Image source={pesquisaIcon} w={20} h={20}/></InputIcon>
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
                                <Image source={botaoEnviar} w={20} h={20}/>
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
    return(
        <Pressable bg= "$add1" alignItems= "center" rounded= {15} px={10} onPress={()=>navigation.navigate('pesquisaPalavraChave', {valor: termo})} onLongPress={()=>alert(termo)} {...rest}>
            <TextoNegrito color="$lightSeis">{termo}</TextoNegrito>
        </Pressable>
    )
}