import { Box, Text, Image, Menu, Button, MenuItem, MenuItemLabel } from "@gluestack-ui/themed"
import { Pressable } from "react-native"

const IconePerfil = require('../assets/userDefault.png')
const BotaoVoltar =  require('../assets/backButton.png')
const BotaoMaisOpcoes = require('../assets/BotaoMaisOpcoes.png')

type props = {
    nome?: string,
    paginaContatos?: boolean,
    navigation?: any
}

export default function CabecalhoUsuario({nome='Você', paginaContatos=true, navigation}: props) {
  return <Box bg="$white" flexDirection="row"  w="100%" h={110}>
            <Box w="33.3%" justifyContent="center" pl={20}>
                {!paginaContatos && (
                    <Pressable onPress={()=>navigation.navigate('tabs')}>
                        <Image source={BotaoVoltar} size="2xs"/>
                    </Pressable>
                )}
            </Box>
            <Box w="33.3%" justifyContent="center" alignItems="center">
                <Image source={IconePerfil} size="xs"/>
                <Text fontFamily="Poppins_500Medium" mt={10} textAlign="center">{nome}</Text>
            </Box>
            <Box  w="33.3%" justifyContent="center" alignItems="flex-end">
            {!paginaContatos && (
                    
                    <Menu placement="bottom" trigger={({ ...triggerProps})=>{
                        return(
                            <Button {...triggerProps} bg="$white">
                                <Image source={BotaoMaisOpcoes} size="2xs"/>
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
        </Box>
}