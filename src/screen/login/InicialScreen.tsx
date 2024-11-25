import { Box, Image } from "@gluestack-ui/themed";
import { TextoNegrito } from "../../components/geral/Texto";
import LinearGradientMoots from "../../components/geral/LinearGradientMoots";
import BotaoSecao from "../../components/botao/BotaoSecao";
import { StatusBar } from "expo-status-bar";

const MootsIcon = require('../../assets/MootsIcon.png')
const MootsLogo = require('../../assets/MootsTypo.png')

export default function Inicial({navigation}){
    const irParaLogin = () => navigation.navigate('login')
    const irParaCadastro = () => navigation.navigate('cadastro')
    return(
        <LinearGradientMoots>
                <StatusBar translucent/>
            <Box flex={1} justifyContent="space-between">
                <Box alignSelf='center' alignItems='center'>
                    <Image source={MootsIcon} mt='$12' mb='$6' $md-size={150}/>
                    <Image source={MootsLogo} $base-w={182} $base-h={35} $md-w={210} $md-h={50}/>
                </Box>
                <Box alignSelf='center' alignItems='center' w='100%' my={30}>
                    <TextoNegrito fontSize={20}>O que deseja fazer?</TextoNegrito>
                    <BotaoSecao bg='white' brw={2} brc='$black' color='black' w='80%' my={20} onPress={irParaLogin}>
                        Login
                    </BotaoSecao>
                    <BotaoSecao onPress={irParaCadastro}>
                        Cadastro
                    </BotaoSecao>
                </Box>
            </Box>
        </LinearGradientMoots>
    )
}