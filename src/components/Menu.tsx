import { Image, Menu, MenuItem, MenuItemLabel, Pressable } from "@gluestack-ui/themed"
import { useNavigation } from "@react-navigation/native"

const menuIcon = require('../assets/MenuIcon.png')

export function MenuPost(){
    const navigation = useNavigation()
    return(
        <Menu trigger={({ ...triggerProps})=>{
            return(
                <Pressable {...triggerProps} bg="$white">
                    <Image source={menuIcon} size="2xs"/>
                </Pressable>
            )
            }}>
            <MenuItem key="VerPerfil" textValue="VerPerfil" onPress={()=>navigation.navigate('perfil')}>
                <MenuItemLabel>Visitar perfil</MenuItemLabel>
            </MenuItem>
            <MenuItem key="Pesquisar" textValue="Pesquisar">
                <MenuItemLabel>Denunciar publicação</MenuItemLabel>
            </MenuItem>
        </Menu>
    )
}