import { Box, Image, Input, InputField, InputIcon, InputSlot, Pressable, styled } from "@gluestack-ui/themed";
import FiltrosModal from "./FiltrosModal";
import { TextoNegrito } from "./Texto";
import { useState } from "react";
import { StyledShadowBox } from "../screen/login/Cadastro";

import BotaoVoltar from "./BotaoVoltar";

const BotaoEnviar = require('../assets/EnviarIconRounded.png')
const IconePesquisa = require('../assets/PesquisaIcon.png')

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

const StyledTermoBox = styled(Box, {
    bg: "$add1",
    alignItems: "center",
    rounded: 15,
    px: 10
})

export default function BarraPesquisa(){
    
    const [isExtended, setIsExtended] = useState(true)

    return(
            <BottomRadiusShadowBox>

                <Box  flexDirection="row" justifyContent={!isExtended ? "space-around" : "space-between"} alignItems="center" py={10}>

                    {!isExtended && (
                        <Box>
                            <BotaoVoltar onPress={()=> setIsExtended(true)}/>
                        </Box>
                    )}

                    <Box w={!isExtended ? "70%" : "85%"}>
                        <Input variant="rounded" h={35} borderWidth={1} borderColor="$black">
                            <InputSlot>
                                <InputIcon w="100%" ml={10}><Image source={IconePesquisa} w={15} h={15}/></InputIcon>
                            </InputSlot>
                            <InputField fontFamily="Poppins_500Medium" placeholder="Pesquise algo..." ml={-10} pt={5}/>
                            <InputSlot>
                                    <Pressable onPress={() =>{
                                        setIsExtended(false)
                                        }}>
                                        <InputIcon w="100%" mr={5}>
                                            <Image source={BotaoEnviar} w={15} h={15}/>
                                        </InputIcon>
                                    </Pressable>
                            </InputSlot>
                        </Input>
                    </Box>

                    <Box mr={isExtended ? 8 : 0}>
                        <FiltrosModal />
                    </Box>

                </Box>

                {isExtended && <Box flexDirection="row">
                    <TextoNegrito>Recentes: </TextoNegrito>
                    <StyledTermoBox mx={2.5}>
                        <TextoNegrito color="$lightSeis">teste</TextoNegrito>
                    </StyledTermoBox>
                    <StyledTermoBox mx={2.5}>
                        <TextoNegrito color="$lightSeis">teste</TextoNegrito>
                    </StyledTermoBox>
                </Box>}
                
            </BottomRadiusShadowBox>
    )
}