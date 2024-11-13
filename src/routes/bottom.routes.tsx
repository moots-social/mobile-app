import Feed from "../screen/feed/FeedScreen"
import Pesquisa from "../screen/pesquisa/PesquisaScreen"
import PerfilUsuario from "../screen/perfil/PerfilScreen"
import Notificacoes from "../screen/notificacoes/NotificacoesScreen"
import Colecao from "../screen/colecao/ColecaoScreen"

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import { Box, Image } from "@gluestack-ui/themed"
import { useEffect } from "react"
import { logoutUser } from "../utils/storageUtils"
import { buscar } from "../utils/usuarioUtils"
import { useDispatch, useSelector } from "react-redux"
import { setarUsuario } from "../redux/useUsuario"
import { autenticar } from "../redux/useAutenticacao"

const homeIcon = require('../assets/HomeIcon.png')
const salvarIcon = require('../assets/SalvarIcon.png')
const notificacaoIcon = require('../assets/NotificacaoIcon.png')
const pesquisaIcon = require('../assets/PesquisaIcon.png')
const perfilIcon = require('../assets/UsuarioIcon.png')

const {Screen, Navigator} = createBottomTabNavigator()

function IconePersonalizado({tab, focused}: any){
    return  <Box h="100%" justifyContent="center" px={10} rounded={30} bgColor={focused ? '#EDEDED' : '$white'}>
                <Image source={tab.icon} w={30} h={30} opacity={focused ? 1 : 0.5} rounded={tab.id === 4 ? 30 : 0}/>
            </Box>
   
}

export default function Bottom(){
    const dispatch = useDispatch()
    const usuario = useSelector((state: any)=> state.usuario.user)
    const tabs = [
        {
            id: 0,
            name: 'feed',
            component: Feed,
            icon: homeIcon
        },
        {
            id: 1,
            name: 'colecao',
            component: Colecao,
            icon: salvarIcon
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
            icon: usuario.fotoPerfil || perfilIcon
        }
    ]

    
    useEffect(()=>{
        const getUser = async()=>{
            const getUsuario = await buscar()
            if(getUsuario){
                dispatch(setarUsuario(getUsuario))
                dispatch(autenticar())
            } else {
                await logoutUser()
                console.log('deslogando usuário por não ter dados relacionados.')
            }
        }
        
        getUser()
        
    }, [])
    return(
        <Navigator>
            
            {tabs.map((tab) => (
              <Screen key={tab.id} name={tab.name} component={tab.component} options={{
                
                headerShown: false, 
                tabBarIcon: ({focused}) => (
                    <IconePersonalizado tab={tab} focused={focused}/>
                ),
                tabBarShowLabel: false,
                tabBarHideOnKeyboard: true
                }}
               />  
 
            ))
            }
        </Navigator>
    )
}