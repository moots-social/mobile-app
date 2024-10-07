import { Box, Image, Text } from '@gluestack-ui/themed'
import LinearGradientMoots from '../../components/LinearGradientMoots'
import { RoundedBottomSemSombra } from '../../components/Rounded'
import { Titulo } from '../../components/Texto'
import { BotaoListaSeguidores, BotaoSeguir } from '../../components/BotoesPerfil'

export default function PerfilUsuario() {
  return (
    <LinearGradientMoots>
      <Box brw={1}>
        <Box>
          <RoundedBottomSemSombra h={220} brw={1} brc="$black">
            <Image source={''} w="100%"/>
          </RoundedBottomSemSombra>
          <Image source={''} alignSelf="center" rounded={60} w={100} h={100} brw={1} brc="$black"/>
        </Box>
          <Box mt={5} alignSelf="center" >
            <Text fontFamily='Poppins_600SemiBold' fontSize={26} color='$black' textAlign='center'>Usuário</Text>
            <Text fontFamily='Poppins_500Medium' fontSize={18} color='#B6B3B3' textAlign='center'>@usuario</Text>
            <Text fontFamily='Poppins_500Medium' fontSize={18} color='#737373' textAlign='center'>Descrição</Text>
          </Box>
        <Box>
          <BotaoSeguir rounded={20} imgW={15} imgH={15}/>
          <BotaoListaSeguidores w={35} h={35} rounded={20} /> 
        </Box>
      </Box>
    </LinearGradientMoots>
  )
}