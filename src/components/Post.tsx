import { Box, Button, Image, Menu, MenuItem, MenuItemLabel, Pressable, Text } from "@gluestack-ui/themed";
import { FullRounded } from "./Rounded";
import { TextoNegrito } from "./Texto";
import { BotaoComentar, BotaoCurtir, BotaoDescurtir, BotaoSalvar } from "./BotoesPostComentario";
import { useNavigation } from "@react-navigation/native";
import { MenuPost } from "./Menu";

const menuIcon = require('../assets/MenuIcon.png')
const usuarioIcon = require('../assets/UsuarioIcon.png')

//como esse componente vai ser renderizado antes e depois de ser clicado,
//passamos várias propriedades que verificarão onde o componente está sendo renderizado
interface IPostProps{
    conteudoUsuario: any,
    menu?: boolean,
    botaoComentario?: boolean,
    expandivel?: boolean,
}

export default function Post({conteudoUsuario, menu=true, botaoComentario=true,  ...rest}:IPostProps){
    const navigation = useNavigation()

    return(
        <Pressable onPress={()=> navigation.navigate('expandido')} {...rest}>
            <FullRounded bg="$white" w={menu ? "90%" : "100%"} py={20} px={10}>
                <Box flexDirection="row" w="100%">
                    <Box>
                        <Image source={usuarioIcon} w={40} h={40}/>
                    </Box>

                    <Box flexDirection="column" ml={5} justifyContent="center" w="80%" flexWrap="nowrap">
                        <Box>
                            <TextoNegrito>Usuario</TextoNegrito>
                            <Text fontFamily="Poppins_500Medium" color="#b6b3b3" fontSize={14}>usuario1</Text>
                        </Box>
                        <Text fontFamily="Poppins_500Medium" fontSize={14}>teste</Text>
                        <Box flexDirection="row" display="flex" mt={10}>
                            <Box flexDirection="row" w="95%" gap={10}>
                                <BotaoCurtir size="2xs"/>
                                <BotaoDescurtir size="2xs"/>
                                <BotaoSalvar size="2xs"/>
                            </Box>
                            <BotaoComentar justifyContent="flex-end" size="2xs" />
                        </Box>
                    </Box>
                    {menu && <MenuPost  />}
                </Box>
            </FullRounded>
        </Pressable>
    )
}