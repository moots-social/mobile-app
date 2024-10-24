import { Titulo } from '../../components/Texto'

import Contato from '../../components/Contato'
import CabecalhoUsuario from '../../components/CabecalhoUsuario'
import {BotaoNovoChat} from '../../components/BotaoMais'
import LinearGradientMoots from '../../components/LinearGradientMoots'
import { RoundedTop } from '../../components/Rounded'

const users = 
  {
    id: '1',
    nome: "Gabriel",
    conteudo: "Bom dia!",
    timestamp: "10:54"
  }


export default function Contatos() {
  return(
  <LinearGradientMoots >
      <CabecalhoUsuario />
      <RoundedTop bg="$white" mt={20} w="100%" h="100%" alignItems="center">
          <Titulo my={3}>Seus contatos</Titulo>
          <Contato nome={users.nome} conteudo={users.conteudo} timestamp={users.timestamp} mb={10}/>
      </RoundedTop>
      <BotaoNovoChat position="absolute" top="85%" right="5%" />
  </LinearGradientMoots>
  ) 
}