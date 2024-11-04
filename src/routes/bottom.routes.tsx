import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import Contatos from "../screen/contatos/ContatosScreen"
import Pesquisa from "../screen/pesquisa/PesquisaScreen"
import { Image } from "@gluestack-ui/themed"
import Feed from "../screen/feed/FeedScreen"
import PerfilUsuario from "../screen/perfil/PerfilScreen"
import Notificacoes from "../screen/notificacoes/NotificacoesScreen"
import { useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useUsuarioContext } from "../context/UsuarioContext"
import { usuarioApi } from "../api/apis"
import { Alert } from "react-native"
import { useAuthContext } from "../context/AuthContext"
import { invalidToken, logoutUser } from "../utils/storageUtils"
import { buscar } from "../utils/usuarioUtils"

const homeIcon = require('../assets/HomeIcon.png')
const contatoIcon = require('../assets/ChatIcon.png')
const notificacaoIcon = require('../assets/NotificacaoIcon.png')
const pesquisaIcon = require('../assets/PesquisaIcon.png')
const perfilIcon = require('../assets/UsuarioIcon.png')

const {Screen, Navigator} = createBottomTabNavigator()

export default function Bottom(){
    const {auth, setAuth} = useAuthContext()
    const {usuario, setUsuario} = useUsuarioContext()
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
            icon: usuario.fotoPerfil || perfilIcon
        }
    ]

    //to-do: arrumar sessão expirada
    const getUser = async()=>{
        try{
            const getUsuario = await buscar()
            if(getUsuario.nomeCompleto){
                setUsuario(getUsuario)
            } else throw new Error(getUsuario)
        }catch(error: any){
            if(error == 'Token inválido ou expirado.') {
                Alert.alert('Sessão expirada', 'Sua sessão expirou. Faça login novamente para continuar aproveitando.')
                logoutUser(setAuth, setUsuario)
            }
            else alert(String(error))
        }
    }
    
    useEffect(()=>{
        
        getUser()
    }, [])
    return(
        <Navigator>
            
            {tabs.map((tab) => (
              <Screen key={tab.id} name={tab.name} component={tab.component} options={{
                headerShown: false, 
                tabBarIcon: () => (
                <Image source={tab.icon} w={30} h={30} rounded={tab.icon==usuario.fotoPerfil ? 30 : 0}/>
                ),
                tabBarShowLabel: false,
                tabBarHideOnKeyboard: true,
                }}
               />  
 
            ))
            }
        </Navigator>
    )
}