import { Box, Text, Image, Menu, Button, MenuItem, MenuItemLabel } from "@gluestack-ui/themed"
import BotaoVoltar from "./BotaoVoltar"
import { RoundedBottom } from "./Rounded"
import { useNavigation } from "@react-navigation/native"
import { useUsuarioContext } from "../context/UsuarioContext"

const usuarioIcon = require('../assets/UsuarioIcon.png')
const menuIcon = require('../assets/MenuIcon.png')

type ICabecalhoUsuarioProps = {
    nome?: string,
    paginaContatos?: boolean
}

export default function CabecalhoUsuario({nome='Você', paginaContatos=true}: ICabecalhoUsuarioProps) {
    const navigation = useNavigation()
    const {usuario, setUsuario} = useUsuarioContext()
  return <RoundedBottom bg="$white" flexDirection="row"  w="100%" h={110} roundedTop={0}>
            <Box w="33.3%" justifyContent="center" pl={20}>
                {!paginaContatos && (
                    <BotaoVoltar />
                )}
            </Box>
            <Box w="33.3%" justifyContent="center" alignItems="center">
                <Image source={usuario.fotoPerfil || usuarioIcon} size="xs" rounded={usuario.fotoPerfil && 30}/>
                <Text fontFamily="Poppins_500Medium" mt={10} textAlign="center">{nome}</Text>
            </Box>
            <Box  w="33.3%" justifyContent="center" alignItems="flex-end">
            {!paginaContatos && (
                    
                    <Menu placement="bottom" trigger={({ ...triggerProps})=>{
                        return(
                            <Button {...triggerProps} bg="$white">
                                <Image source={menuIcon} size="2xs"/>
                            </Button>
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
                )}
            </Box>
        </RoundedBottom>
}