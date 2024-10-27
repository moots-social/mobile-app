import { Titulo } from '../../components/geral/Texto'

import Contato from '../../components/chat/Contato'
import CabecalhoUsuario from '../../components/cabecalho/CabecalhoUsuario'
import {BotaoNovoChat} from '../../components/botao/BotaoMais'
import LinearGradientMoots from '../../components/geral/LinearGradientMoots'
import { RoundedTop } from '../../components/geral/Rounded'

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