import { Box, Image, ScrollView, Text, Textarea, TextareaInput } from "@gluestack-ui/themed";
import LinearGradientMoots from "../../components/LinearGradientMoots";
import CabecalhoPerfil from "../../components/CabecalhoPerfil";
import { RoundedBottom } from "../../components/Rounded";
import { TextoNegrito } from "../../components/Texto";
import { BotaoCamera, BotaoEnviarNovoPost, BotaoGaleria, TesteContext } from "../../components/BotoesPostComentario";
import { useContext, useEffect, useState } from "react";
import { ImagemContext } from "../../context/PostContext";

const usuarioIcon = require('../../assets/UsuarioIcon.png')

export default function NovoPost(){

    return(
            <LinearGradientMoots>
                <ScrollView>
                    <CabecalhoPerfil titulo="Nova publicação" zIndex={1}/>
                    <RoundedBottom zIndex={0} minHeight={500} bg="$white" bottom={5} mb={10}>
                        <Box p={20} display="flex" justifyContent="space-between" minHeight={500}>
                            <Box display="flex">
                                <Box flexDirection="row" alignItems="center">
                                    <Image source={usuarioIcon} w={40} h={40}/>
                                    <TextoNegrito ml={2}>Usuário</TextoNegrito>
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