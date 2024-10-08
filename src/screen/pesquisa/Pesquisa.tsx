import { Box } from '@gluestack-ui/themed'
import LinearGradientMoots from '../../components/LinearGradientMoots'
import BarraPesquisa, { BottomRadiusShadowBox } from '../../components/BarraPesquisa'
import { useEffect, useState } from 'react'
import { TextoNegrito, Titulo } from '../../components/Texto'

export default function Pesquisa() {
  const [extended, setExtended] = useState(true)

  useEffect(()=>{
    setExtended(true)
  }, [])


  return (
    <LinearGradientMoots>
      <Box zIndex={2}>
        <BarraPesquisa extended={extended}/>
      </Box>
      {extended && (
        <BottomRadiusShadowBox position="relative" bottom={5} zIndex={1} px={44} pb={40}>
          <Box alignItems="center">
            <Titulo fontSize={18}>Perfis visitados recentemente</Titulo>
          </Box>
          <Box>
            <TextoNegrito textAlign="center">Você ainda não entrou no perfil de ninguém. Vamos explorar?</TextoNegrito>
          </Box>
        </BottomRadiusShadowBox>
      )}
    </LinearGradientMoots>
  )
}