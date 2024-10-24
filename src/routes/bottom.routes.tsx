import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import Contatos from "../screen/contatos/Contatos"
import Pesquisa from "../screen/pesquisa/Pesquisa"
import { Image } from "@gluestack-ui/themed"
import Feed from "../screen/feed/Feed"
import PerfilUsuario from "../screen/perfilUsuario/PerfilUsuario"
import Notificacoes from "../screen/notificacoes/Notificacoes"

const homeIcon = require('../assets/HomeIcon.png')
const contatoIcon = require('../assets/ChatIcon.png')
const notificacaoIcon = require('../assets/NotificacaoIcon.png')
const pesquisaIcon = require('../assets/PesquisaIcon.png')
const perfilIcon = require('../assets/UsuarioIcon.png')

const {Screen, Navigator} = createBottomTabNavigator()
const tabs = [
    {
        id: 0,
        name: 'feed',
        component: Feed,
        icon: homeIcon
    },
    {
        id: 1,
        name: 'contatos',
        component: Contatos,
        icon: contatoIcon
    },
    {
        id: 2,
        name: 'pesquisa',
        component: Pesquisa,
        icon: pesquisaIcon
    },
    {
        id: 3,
        name: 'notificacoes',
        component: Notificacoes,
        icon: notificacaoIcon
    },
    {
        id: 4,
        name: 'perfil',
        component: PerfilUsuario,
        icon: perfilIcon
    }
]

export default function Bottom(){
    return(
        <Navigator>
            
            {tabs.map((tab) => (
              <Screen key={tab.id} name={tab.name} component={tab.component} options={{
                headerShown: false, 
                tabBarIcon: () => (
                <Image source={tab.icon} w={30} h={30}/>
                ), 
                tabBarShowLabel: false,
                }}
               />  
 
            ))
            }
        </Navigator>
    )
}