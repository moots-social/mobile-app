import { Box, Button, Menu, MenuItem, MenuItemLabel, Pressable, Text } from "@gluestack-ui/themed";
import { Image } from "@gluestack-ui/themed-native-base";
import { FullRounded } from "../geral/Rounded";
import { TextoNegrito } from "../geral/Texto";
import { BotaoComentar, BotaoCurtirPost, BotaoDescurtirPost, BotaoSalvar } from "../botao/BotoesPostComentario";
import { useNavigation } from "@react-navigation/native";
import { MenuPost } from "./PostMenu";

const menuIcon = require('../../assets/MenuIcon.png')

//como esse componente vai ser renderizado antes e depois de ser clicado,
//passamos várias propriedades que verificarão onde o componente está sendo renderizado
interface IPostProps{
    descricaoPost?: string,
    imagemPost?: string,
    imagemPerfil?: string,
    userId?: number,
    menu?: boolean,
    botaoComentario?: boolean,
    expandivel?: boolean,
    nomeUsuario: string,
    tagUsuario: string
}

export default function Post({descricaoPost, imagemPost, imagemPerfil, userId, menu=true, botaoComentario=true, nomeUsuario, tagUsuario, ...rest}:IPostProps){
    const navigation = useNavigation()

    return(
        <Pressable onPress={()=> navigation.navigate('expandido')} {...rest}>
            <FullRounded bg="$white" w={menu ? "90%" : "100%"} py={20} px={10}>
                <Box flexDirection="row" w="100%">
                    <Box>
                        <Image source={imagemPerfil} w={40} h={40} alt='foto do usuário' size={60}/>
                    </Box>

                    <Box flexDirection="column" ml={5} justifyContent="center" w="80%" flexWrap="nowrap">
                        <Box>
                            <TextoNegrito>{nomeUsuario}</TextoNegrito>
                            <Text fontFamily="Poppins_500Medium" color="#b6b3b3" fontSize={14}>{tagUsuario}</Text>
                        </Box>
                        <Text fontFamily="Poppins_500Medium" fontSize={14}>{descricaoPost}</Text>
                        {imagemPost && <Image key={imagemPost} size={300} borderRadius={20} source={{ uri: imagemPost }} />}


                        <Box flexDirection="row" display="flex" mt={10}>
                            <Box flexDirection="row" w="95%" gap={10}>
                                <BotaoCurtirPost size="2xs"/>
                                <BotaoDescurtirPost size="2xs"/>
                                <BotaoSalvar size="2xs"/>
                            </Box>
                            <BotaoComentar justifyContent="flex-end" size="2xs" />
                        </Box>
                    </Box>
                    {menu && <MenuPost userId={userId}/>}
                </Box>
            </FullRounded>
        </Pressable>
    )
}