import { Box, Image, Text, ScrollView} from '@gluestack-ui/themed'
import LinearGradientMoots from '../../components/LinearGradientMoots'
import { Titulo } from '../../components/Texto'
import { BotaoConfigurar, BotaoCurso, BotaoListaSeguidores, BotaoSeguir } from '../../components/BotoesPerfil'
import { useUsuarioContext } from '../../context/UsuarioContext'
import { useEffect, useState } from 'react'
import { usuarioApi } from '../../api/apis'

const usuarioIcon = require('../../assets/UsuarioIcon.png')
const coverIcon = require('../../assets/CoverIcon.png')

export default function PerfilUsuario({route}) {
  const {usuario} = useUsuarioContext()
  
  // const [outroUsuario, setOutroUsuario] = useState<any>({})
  // const [usuarioTemId, setUsuarioTemId] = useState<boolean>()
  
  // const temId = async()=>{
  //   try{
  //     const {id} = route.params
  //     // setUsuarioTemId(true)
  //     // const resultado = await usuarioApi.get(`/buscar/perfil/${id}`)
  //     // setOutroUsuario(resultado.data)
  //   }catch(error){
  //     console.error(error)
  //   }
  // }

  // useEffect(()=>{
  //   temId()
  // },[])

  return (
    <LinearGradientMoots>
      <ScrollView w="100%" display="flex">
        <Box display="flex" justifyContent="flex-end">
          <Image source={usuario.fotoCapa || coverIcon} w="100%" h={220} borderBottomLeftRadius={10} borderBottomRightRadius={10} bg={usuario.fotoCapa==='' && '$lightSete'} position="relative" zIndex={0}/>
          <Image source={usuario.fotoPerfil || usuarioIcon} w={100} h={100} rounded={60} alignSelf="center" zIndex={1} position="absolute" top={170} />
        </Box>
          <Box mt={60} alignItems="center" alignSelf="center" >
            <Text fontFamily='Poppins_600SemiBold' fontSize={26} color='$black' textAlign='center'>{usuario.nomeCompleto}</Text>
            <Text fontFamily='Poppins_500Medium' fontSize={18} color='#B6B3B3' textAlign='center'>{usuario.tag}</Text>
            {usuario.descricao!=='' && <Text fontFamily='Poppins_500Medium' fontSize={18} color='#737373' textAlign='center'>{usuario.descricao}</Text>}
          </Box>
        <Box flexDirection='row' alignItems="center" justifyContent="space-between" alignSelf="center" w={180} my={10}>
          <BotaoConfigurar w={35} imgW={15} imgH={15} />
          <BotaoCurso curso={usuario.curso}/>
          <BotaoListaSeguidores rounded={20} w={35} imgW={12} imgH={12}/> 
        </Box>
        <Box alignItems="center">
          <Titulo>Publicações</Titulo>
        </Box>
      </ScrollView>
    </LinearGradientMoots>
  )
}