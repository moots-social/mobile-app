import { Box } from '@gluestack-ui/themed'
import CartaoUsuario from '../../components/CartaoUsuario'
import LinearGradientMoots from '../../components/LinearGradientMoots'
import FiltrosModal from '../../components/FiltrosModal'

export default function Pesquisa() {
  return (
    <LinearGradientMoots>
      <Box>
        <CartaoUsuario/>
        <FiltrosModal />
      </Box>
    </LinearGradientMoots>
  )
}