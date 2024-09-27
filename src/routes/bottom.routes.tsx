import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import Contatos from "../screen/contatos/Contatos"
import NovoPost from "../screen/novoPost/NovoPost"
import Pesquisa from "../screen/pesquisa/Pesquisa"
import { Image } from "@gluestack-ui/themed"
import Feed from "../screen/feed/Feed"
import PerfilUsuario from "../screen/perfilUsuario/PerfilUsuario"

const homeIcon = require('../assets/HomeIcon.png')
const contatoIcon = require('../assets/ChatIcon.png')
const novoPostIcon = require('../assets/NovoPostIcon.png')
const pesquisaIcon = require('../assets/PesquisaIcon.png')
const perfilIcon = require('../assets/userDefault.png')

const {Screen, Navigator} = createBottomTabNavigator()
const tabs = [
    {
        name: 'feed',
        component: Feed,
        icon: homeIcon
    },
    {
        name: 'contatos',
        component: Contatos,
        icon: contatoIcon
    },
    {
        name: 'novopost',
        component: NovoPost,
        icon: novoPostIcon
    },
    {
        name: 'pesquisa',
        component: Pesquisa,
        icon: pesquisaIcon
    },
    {
        name: 'perfil',
        component: PerfilUsuario,
        icon: perfilIcon
    }
]

export default function Bottom(){
    return(
        <Navigator>
            
            {tabs.map((tab) => (
              <Screen key={tab.name} name={tab.name} component={tab.component} options={{
                headerShown: false, 
                tabBarIcon: () => (
                <Image source={tab.icon} size="2xs"/>
                ), 
                tabBarShowLabel: false,
                
                }}
               />  
 
            ))
            }
        </Navigator>
    )
}