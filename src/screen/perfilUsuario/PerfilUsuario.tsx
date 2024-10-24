import { Box, Image, Text, ScrollView} from '@gluestack-ui/themed'
import LinearGradientMoots from '../../components/LinearGradientMoots'
import { Titulo } from '../../components/Texto'
import { BotaoConfigurar, BotaoCurso, BotaoListaSeguidores, BotaoSeguir } from '../../components/BotoesPerfil'

interface IPerfilUsuarioProps{
  curso?: string
}

export default function PerfilUsuario({curso}: IPerfilUsuarioProps) {
  let cursoTeste = 'desenvolvimento'
  return (
    <LinearGradientMoots>
      <ScrollView w="100%" display="flex">
        <Box display="flex" justifyContent="flex-end">
          <Image  source={''} w="100%" h={220} borderBottomLeftRadius={10} borderBottomRightRadius={10} brw={1} brc='#000' position="relative" zIndex={0}/>
          <Image source={''} w={100} h={100} rounded={60} brw={1} brc="$black" alignSelf="center" zIndex={1} position="absolute" top={170} />
        </Box>
          <Box mt={60} alignItems="center" alignSelf="center" >
            <Text fontFamily='Poppins_600SemiBold' fontSize={26} color='$black' textAlign='center'>Usuario</Text>
            <Text fontFamily='Poppins_500Medium' fontSize={18} color='#B6B3B3' textAlign='center'>usuario</Text>
            <Text fontFamily='Poppins_500Medium' fontSize={18} color='#737373' textAlign='center'>Seja bem vindo ao meu perfil!</Text>
          </Box>
        <Box flexDirection='row' alignItems="center" justifyContent="space-between" alignSelf="center" w={180} my={10}>
          <BotaoConfigurar w={35} imgW={15} imgH={15} curso={cursoTeste} />
          <BotaoCurso curso={cursoTeste}/>
          <BotaoListaSeguidores rounded={20} w={35} imgW={12} imgH={12}/> 
        </Box>
        <Box alignItems="center">
          <Titulo>Publicações</Titulo>
        </Box>
      </ScrollView>
    </LinearGradientMoots>
  )
}