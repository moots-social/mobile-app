import { Box, Image, Text, Menu, MenuItem, MenuItemLabel, Button, Pressable } from '@gluestack-ui/themed'
import LinearGradientMoots from '../../components/LinearGradientMoots'
import { Titulo } from '../../components/Texto'
import { BotaoListaSeguidores, BotaoSeguir } from '../../components/BotoesPerfil'

const MenuIcon = require('../../assets/MenuIcon.png')
const covertest = require('../../assets/covertest.png')

export default function PerfilUsuario({navigation}) {
  return (
    <LinearGradientMoots>
      <Box>
            <Image source={covertest} w="100%" h={220} borderBottomLeftRadius={10} borderBottomRightRadius={10}/>
            
            {/* <Image source={''} w={100} h={100} rounded={60} brw={1} brc="$black" alignSelf="center" top={90}/> */}
          <Box mt={5} alignItems="center" alignSelf="center" >
            <Box flexDirection="row" alignItems="center">
              <Text fontFamily='Poppins_600SemiBold' fontSize={26} color='$black' textAlign='center'>Usuario</Text>
              <Menu placement="bottom" trigger={({ ...triggerProps})=>{
                        return(
                            <Pressable {...triggerProps}>
                                <Image source={MenuIcon} w={13} h={13}/>
                            </Pressable>
                        )
                    }}>
                        <MenuItem key="VerPerfil" textValue="VerPerfil" onPress={()=>navigation.navigate('editar')}>
                            <MenuItemLabel>Editar perfil</MenuItemLabel>
                        </MenuItem>
                        <MenuItem key="Pesquisar" textValue="Pesquisar" onPress={()=>navigation.navigate('colecao')}>
                            <MenuItemLabel>Coleção</MenuItemLabel>
                        </MenuItem>
                    </Menu>
            </Box>
            <Text fontFamily='Poppins_500Medium' fontSize={18} color='#B6B3B3' textAlign='center'>@usuario</Text>
            <Text fontFamily='Poppins_500Medium' fontSize={18} color='#737373' textAlign='center'>Seja bem vindo ao meu perfil!</Text>
          </Box>
        <Box flexDirection='row' justifyContent="space-between" alignSelf="center" w={180} my={10}>
          <BotaoSeguir rounded={20} w={35} imgW={15} imgH={12}/>
          <Image source={''} w={35} h={35} brw={1} brc="$black"/>
          <BotaoListaSeguidores rounded={20} w={35} imgW={12} imgH={12}/> 
        </Box>
        <Box alignItems="center">
          <Titulo>Publicações</Titulo>
        </Box>
      </Box>
    </LinearGradientMoots>
  )
}