import { Box } from '@gluestack-ui/themed'
import LinearGradientMoots from '../../components/LinearGradientMoots'
import BarraPesquisa, { BottomRadiusShadowBox } from '../../components/BarraPesquisa'
import { TextoNegrito, Titulo } from '../../components/Texto'
import { StatusBar } from 'expo-status-bar'

export default function Pesquisa() {

  const isExtended = true
  
  return (
    <LinearGradientMoots>
      <StatusBar translucent={false} />
      <Box zIndex={2}>
        <BarraPesquisa />
      </Box>
      {isExtended && (
        <BottomRadiusShadowBox position="relative" bottom={5} zIndex={1} px={44} pb={40}>
          <Box alignItems="center">
            <Titulo fontSize={18}>Perfis visitados recentemente</Titulo>
          </Box>
          <Box>
            <TextoNegrito textAlign="center">Você ainda não visitou o perfil de alguém. Vamos explorar?</TextoNegrito>
          </Box>
        </BottomRadiusShadowBox>
      )}
    </LinearGradientMoots>
  )
}