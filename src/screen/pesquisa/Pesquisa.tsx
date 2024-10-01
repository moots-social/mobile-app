import { Box } from '@gluestack-ui/themed'
import CartaoUsuario from '../../components/CartaoUsuario'
import LinearGradientMoots from '../../components/LinearGradientMoots'
import FiltrosModal from '../../components/FiltrosModal'
import BarraPesquisa from '../../components/BarraPesquisa'

export default function Pesquisa() {
  return (
    <LinearGradientMoots>
      <Box>
        <BarraPesquisa extended={true}/>
      </Box>
    </LinearGradientMoots>
  )
}