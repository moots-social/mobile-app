import { Box, Button, Image, Menu, MenuItem, MenuItemLabel, Pressable, Text } from "@gluestack-ui/themed";
import { FullRounded } from "./Rounded";
import { TextoNegrito } from "./Texto";
import { BotaoComentar, BotaoCurtir, BotaoDescurtir, BotaoSalvar } from "./BotoesPostComentario";
import { useNavigation } from "@react-navigation/native";

const menuIcon = require('../assets/MenuIcon.png')
const usuarioIcon = require('../assets/UsuarioIcon.png')

export default function Post(){
    const navigation = useNavigation()

    return(
        <FullRounded bg="$white" w="90%" py={20} px={10} >
            <Box flexDirection="row" w="100%" brw={1}>
                <Box>
                    <Image source={usuarioIcon} w={40} h={40}/>
                </Box>

                <Box flexDirection="column" ml={5} justifyContent="center" w="80%" flexWrap="nowrap">
                    <Box>
                        <TextoNegrito>Usuario</TextoNegrito>
                        <Text fontFamily="Poppins_500Medium" color="#b6b3b3" fontSize={14}>usuario1</Text>
                    </Box>
                    <Text fontFamily="Poppins_500Medium" fontSize={14}>testedsadlçsdsadsadasddsadsadsadsdadsadsaadçkasjdlsahdkljashbgkdhbsakdiljdasldjhasljdhsaljhdjaskhdjksahdkh</Text>
                    <Box flexDirection="row" display="flex" mt={10}>
                        <Box flexDirection="row" w="95%" gap={10}>
                            <BotaoCurtir size="2xs"/>
                            <BotaoDescurtir  size="2xs"/>
                            <BotaoSalvar  size="2xs"/>
                        </Box>
                        <BotaoComentar justifyContent="flex-end" size="2xs"/>
                    </Box>
                </Box>
                <Menu placement="bottom" trigger={({ ...triggerProps})=>{
                        return(
                            <Pressable {...triggerProps} bg="$white">
                                <Image source={menuIcon} h={10} w={10}/>
                            </Pressable>
                        )
                    }}>
                        <MenuItem key="VerPerfil" textValue="VerPerfil" onPress={()=>navigation.navigate('perfil')}>
                            <MenuItemLabel>Visitar perfil</MenuItemLabel>
                        </MenuItem>
                        <MenuItem key="Pesquisar" textValue="Pesquisar">
                            <MenuItemLabel>Pesquisar</MenuItemLabel>
                        </MenuItem>
                        <MenuItem key="Bloquear" textValue="Bloquear">
                            <MenuItemLabel>Bloquear usuário</MenuItemLabel>
                        </MenuItem>
                </Menu>
            </Box>
        </FullRounded>
    )
}