import { Box } from '@gluestack-ui/themed'
import LinearGradientMoots from '../../components/geral/LinearGradientMoots'
import BarraPesquisa, { BottomRadiusShadowBox } from '../../components/barra/BarraPesquisa'
import { TextoNegrito, Titulo } from '../../components/geral/Texto'

export default function Pesquisa() {
  
  return (
    <LinearGradientMoots>
      <Box zIndex={2}>
        <BarraPesquisa />
      </Box>
        <BottomRadiusShadowBox position="relative" alignItems="center" bottom={5} zIndex={1} pb={40}>
            <Titulo fontSize={18}>Perfis recomendados</Titulo>
            <TextoNegrito textAlign="center" fontSize={12}>Veja os principais perfis do Moots a seguir</TextoNegrito>
            <Box flexDirection='row'>
              {/* <CartaoUsuario /> */}
            </Box>
        </BottomRadiusShadowBox>
    </LinearGradientMoots>
  )
}