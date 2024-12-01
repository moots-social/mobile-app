import Feed from "../screen/feed/FeedScreen"
import Pesquisa from "../screen/pesquisa/PesquisaScreen"
import PerfilUsuario from "../screen/perfil/PerfilScreen"
import Notificacoes from "../screen/notificacoes/NotificacoesScreen"
import Colecao from "../screen/colecao/ColecaoScreen"

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import { LazyIcon } from "../components/geral/LazyImage"
import { Box } from "@gluestack-ui/themed"
import { useEffect } from "react"
import { logoutUser } from "../utils/storageUtils"
import { buscar, buscarColecao, buscarPostsCurtidos, buscarQuemSegue } from "../utils/usuarioUtils"
import { useDispatch, useSelector } from "react-redux"
import { setarUsuario } from "../redux/useUsuario"
import { autenticar } from "../redux/useAutenticacao"

const homeIcon = require('../assets/HomeIcon.png')
const salvarIcon = require('../assets/SalvarIcon.png')
const notificacaoIcon = require('../assets/NotificacaoIcon.png')
const pesquisaIcon = require('../assets/PesquisaIcon.png')
const perfilIcon = require('../assets/UsuarioIcon.png')

const {Screen, Navigator} = createBottomTabNavigator()

//botão de rota com cores e ícones personalizados 
function IconePersonalizado({tab, focused}: any){
    return  <Box h="100%" w="$12" justifyContent="center" px={10} rounded='$lg' bgColor={focused ? '#EDEDED' : '$white'}>
                <LazyIcon imagem={tab.icon} style={{width: 30, height: 30, opacity: focused ? 0.8 : 0.3, borderRadius: tab.id===4 ? 30 : 0}}/>
            </Box>
   
}

export default function Bottom(){
    const dispatch = useDispatch()
    const usuario = useSelector((state: any)=> state.usuario.user)

    //rotas a serem renderizadas quando o usuário estiver autenticado
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
        //método para buscar os dados relevantes do usuário
        const getUser = async()=>{
            dispatch(autenticar())
            try{
                const getUsuario = await buscar()
                if(getUsuario){
                    let getSeguindo = await buscarQuemSegue()
                    if(getSeguindo.length>0){
                        const arrayIdSeguindo = getSeguindo.map(usuario => usuario.userId)
                        getSeguindo = arrayIdSeguindo
                    }
                    let getColecao = await buscarColecao()
                    let getPostsCurtidos = await buscarPostsCurtidos()
                    if(getPostsCurtidos==0){
                        getPostsCurtidos = []
                    }
                    dispatch(setarUsuario({...getUsuario, idSeguindo: getSeguindo, colecaoSalvos: getColecao, idPostsCurtidos: getPostsCurtidos}))
                }
            }catch (error){
                await logoutUser()
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
                tabBarHideOnKeyboard: true,
                lazy: true,
                freezeOnBlur: true
                }}
               />  
 
            ))
            }
        </Navigator>
    )
}