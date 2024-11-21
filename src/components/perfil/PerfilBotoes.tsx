import { Pressable, Image, Modal, ModalBackdrop, ModalContent, Box, Text, ActionsheetBackdrop, ActionsheetContent, ActionsheetItem, ActionsheetItemText, Actionsheet, ScrollView, FlatList, useToast} from "@gluestack-ui/themed"
import { useNavigation, useRoute } from "@react-navigation/native"
import { LinearGreenGradientMoots } from "../geral/LinearGradientMoots"
import { TextoNegrito } from "../geral/Texto"
import { useCallback, useEffect, useState } from "react"

import BotaoSecao from "../botao/BotaoSecao"
import CartaoUsuario from "./CartaoUsuario"
import { Alert } from "react-native"
import { getTokenStorage } from "../../utils/storageUtils"
import usuarioUtils, { pararDeSeguir, seguirUsuario } from "../../utils/usuarioUtils"
import { abrirToast } from "../geral/ToastMoots"
import { useDispatch, useSelector } from "react-redux"
import { setarUsuario } from "../../redux/useUsuario"
import { buscarUsuarioPorCurso } from "../../utils/searchUtils"

const seguirIcon = require('../../assets/SeguirIcon.png')
const listaIcon = require('../../assets/ListaIcon.png')
const editarIcon = require('../../assets/EditarIcon.png')

const desenvolvimentoIcon = require('../../assets/cursoIcons/DesenvolvimentoIcon.png')
const mecanicaIcon = require('../../assets/cursoIcons/MecanicaIcon.png')
const redesIcon = require('../../assets/cursoIcons/RedesIcon.png')
const qualidadeIcon = require('../../assets/cursoIcons/QualidadeIcon.png')
const ficIcon = require('../../assets/cursoIcons/FicIcon.png')

interface ICursoModalProps{
    curso: string
}

interface IBotaoSeguirProps{
    imgW?: number | string,
    imgH?: number | string,
    id1: number,
    id2: number,
    nomeCompleto: string
    usuarioLogado?: any
}

interface IBotaoConfigurarProps{
    imgW?: number,
    imgH?: number,
}

interface IBotaoListaSeguidores{
    imgW?: number,
    imgH?: number,
    getUsuario: any
}
export function BotaoSeguir({imgW=20, imgH=16, id1, id2, usuarioLogado, nomeCompleto, ...rest}: IBotaoSeguirProps){
    const [isSeguindo, setIsSeguindo] = useState<boolean>()
    
    const usuario = useSelector(state => state.usuario.user) || usuarioLogado
    const dispatch = useDispatch()
    const toast = useToast()

    const handlePararDeSeguir = async()=>{
        const resultado = await pararDeSeguir(id1, id2)
        if(resultado===200){
            setIsSeguindo(false)
            dispatch(setarUsuario({
                ...usuario,
                idSeguindo: usuario.idSeguindo.filter(id => id != id2)
            }))
            abrirToast(toast, 'success', `Você parou de seguir ${nomeCompleto}.`)
        } 
    }
    
    const handleSeguirUsuario = async()=>{
        const resultado = await seguirUsuario(id1, id2)
        if(resultado === 200){
            setIsSeguindo(true)
            dispatch(setarUsuario({...usuario, idSeguindo: [...(usuario.idSeguindo ?? []), id2]}))
            abrirToast(toast, 'success', `Agora você está seguindo ${nomeCompleto}.` )
        }
        else if(resultado === 403){
            Alert.alert(`Parar de seguir`, `Tem certeza que deseja parar de seguir ${nomeCompleto}?`, [
                {
                    text: 'Sim',
                    onPress: async() => await handlePararDeSeguir()
                },
                {
                    text: 'Não'
                }
            ])
        }
    }
    
    useEffect(() => {
        const handleIsSeguindo = async () => {
            const checkIsSeguindo = usuario.idSeguindo.some(dado => dado == id2);
            setIsSeguindo(checkIsSeguindo);
        };
    
        handleIsSeguindo();
    }, [usuario.idSeguindo])
    return(
        <Pressable bg={!isSeguindo ? "$lightTres" : '#FF5050'} onPress={handleSeguirUsuario}  borderColor="$black" justifyContent="center" alignItems="center" {...rest}>
            <Image source={seguirIcon} w={imgW} h={imgH} m={10} alt='seguir'/>
        </Pressable>
    )
}


export function BotaoConfigurar({imgW=10, imgH=10, ...rest}: IBotaoConfigurarProps){
    const navigation = useNavigation()
    return(
        <Pressable bg="$lightTres" rounded={20} justifyContent="center" alignItems="center" maxWidth={35} maxHeight={35} onPress={()=>navigation.navigate('editar')} {...rest}>
            <Image source={editarIcon} w={imgW} h={imgH} m={10} alt='editar'/>
        </Pressable>
    )
}
export function BotaoListaSeguidores({imgW=16, imgH=16, getUsuario, ...rest}: IBotaoListaSeguidores){
    const usuario = useSelector((state)=> state.usuario.user)

    const navigation = useNavigation()
    const [isModalVisivel, setModalVisivel] = useState<boolean>(false)
    const[botaoSelecionado, setBotaoSelecionado] = useState<string>('seguindo')

    const [seguindo, setSeguindo] = useState([])
    const [seguidores, setSeguidores] = useState([])

    const handleBotaoSeguindo = ()=>{
        setBotaoSelecionado('seguindo')
    }

    const handleBotaoSeguidores = () =>{
        setBotaoSelecionado('seguidores')
    }

    const getSeguindo = async()=>{
        try {
            const resultado = await usuarioUtils.buscarQuemSegue(getUsuario.userId)
            if(resultado){
                setSeguindo(resultado)
            }
        } catch (error) {
            setSeguindo([])
        }
    }
    const getSeguidores = async()=>{
        try {
            
            const resultado = await usuarioUtils.buscarSeguidores(getUsuario.userId)
            if(resultado){
                setSeguidores(resultado)
            }
            
        } catch (error) {
            setSeguidores([])
        }
    }
    
    useEffect(()=>{
        if(botaoSelecionado==='seguindo'){
            getSeguindo()
        } 
        else if (botaoSelecionado==='seguidores'){
            getSeguidores()
        }
    }, [isModalVisivel, botaoSelecionado])
    
    return(
        <Pressable bg="$lightDois" borderColor="$black" justifyContent="center" alignItems="center" maxWidth={35} maxHeight={35} onPress={()=>setModalVisivel(true)} {...rest}>
            <Image source={listaIcon} w={imgW} h={imgH} m={10} alt='lista'/>
            <Modal isOpen={isModalVisivel} onClose={()=>{setModalVisivel(false); setBotaoSelecionado('seguindo')}}>
                <ModalBackdrop/>
                <ModalContent  bg="$white" h="80%" w="80%">
                    <Box bg="$white" flexDirection="row" py={20}>
                        <Pressable w="50%" justifyContent="center" alignItems="center" onPress={handleBotaoSeguindo}>
                            <TextoNegrito textDecorationLine={botaoSelecionado==='seguindo' ? 'underline' : 'none'} color={botaoSelecionado==='seguindo' && '$lightSeis'}>Seguindo</TextoNegrito>
                        </Pressable>
                        <Pressable w="50%" justifyContent="center" alignItems="center" onPress={handleBotaoSeguidores}>
                            <TextoNegrito textDecorationLine={botaoSelecionado==='seguidores' ? 'underline' : 'none'} color={botaoSelecionado==='seguidores' && '$lightSeis'}>Seguidores</TextoNegrito>
                        </Pressable>
                    </Box>
                        {botaoSelecionado==='seguindo' && seguindo ? (
                         <FlatList $base-px={20} $md-px={75} data={seguindo} renderItem={({item})=> 
                            <CartaoUsuario mb={20} usuario={usuario} usuarioRenderizadoNoCartao={item} navigation={navigation} vemDeLista={true} onPress={()=>{navigation.navigate('outro-perfil', {userId: item.userId}); setModalVisivel(false); setBotaoSelecionado('seguindo')}}/>
                            } contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}/>   
                        )
                          : ''}
                        {botaoSelecionado==='seguidores' && seguidores ? (
                            <FlatList $base-px={20} $md-px={75} data={seguidores} renderItem={({item})=> 
                            <CartaoUsuario mb={20} usuario={usuario} usuarioRenderizadoNoCartao={item} vemDeLista={true} onPress={()=>{navigation.navigate('outro-perfil', {userId: item.userId}); setModalVisivel(false); setBotaoSelecionado('seguindo')}}/>
                        } contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}/>) : ''}
                </ModalContent>
            </Modal>
        </Pressable>
    )
}
export function BotaoCurso({curso, ...rest}: ICursoModalProps){
    const usuario = useSelector(state => state.usuario.user)
    const [isModalVisivel, setModalVisivel] = useState<boolean>(false)
    const [botaoVisivel, setBotaoVisivel] = useState<boolean>(false)
    const [textoBotaoAcao, setTextoBotaoAcao] = useState<string>()

    const [imagem, setImagem] = useState<any>('')
    const [usuarios, setUsuarios] = useState<any[]>()
    const [corFundoCartao, setCorFundoCartao] = useState<string>()
    const [corCartao, setCorCartao] = useState<string>()

    const handleAbrir = ()=>{
        setModalVisivel(true)
        setTextoBotaoAcao('Carregando...')
        setTimeout(()=>{
            setBotaoVisivel(true)
        }, 300)
    }

    const handleFechar = ()=>{
        setTextoBotaoAcao('Fechando...')
        setBotaoVisivel(false)
        setTimeout(()=>{
            setModalVisivel(false)
        }, 300)
    }

    const handleImagemCor = () =>{
        if(curso==='desenvolvimento'.toUpperCase()) {
            setImagem(desenvolvimentoIcon)
            setCorCartao("$lightSeis")
            setCorFundoCartao("$lightSete")
            return
        }
        if(curso==='mecanica'.toUpperCase()) {
            setImagem(mecanicaIcon)
            setCorCartao("#F82C2C")
            setCorFundoCartao("#923333")
            return
        }
        if(curso==='redes'.toUpperCase()) {
            setImagem(redesIcon)
            setCorCartao("#78C8E1")
            setCorFundoCartao("#174A95")
            return
        }
        if(curso==='qualidade'.toUpperCase()) {
            setImagem(qualidadeIcon)
            setCorCartao("#FFBE3D")
            setCorFundoCartao("#BB861C")
            return
        }
        if(curso==='fic'.toUpperCase()) {
            setImagem(ficIcon)
            setCorCartao("#FD9BF9")
            setCorFundoCartao("#C50ABD")
            return
        }
    }

    useEffect(()=>{
        const buscarUsuarios = async()=>{
            
                const resultado = await buscarUsuarioPorCurso(curso)
                if (resultado!==0){
                    if(resultado.length<3){
                        setUsuarios(resultado)
                    }
                    else{
                        // const indices = {
                        //     index1: Math.floor(Math.random() * resultado.length),
                        //     index2: Math.floor(Math.random() * resultado.length) ,
                        //     index3: Math.floor(Math.random() * resultado.length),
                        // }
                        // setUsuarios([resultado[indices.index1], resultado[indices.index2], resultado[indices.index3]])
                        // console.log(usuarios)
                        setUsuarios([resultado[0], resultado[1]])
                    }
                }
            

        }
        buscarUsuarios()
        handleImagemCor()
    }, [isModalVisivel])

    return(
        <Pressable onPress={handleAbrir}>
            <Image source={imagem || ''}  w={50} h={50} alt='curso'/>
            <Modal isOpen={isModalVisivel} onClose={handleFechar}>
                <ModalBackdrop />
                <ModalContent w='95%' h='90%'>
                    <LinearGreenGradientMoots>
                        <Box alignItems="center" h="100%" justifyContent="space-around" rounded={15} py={20}>
                            <Box alignItems="center" gap={10} w="90%">
                                <Image source={imagem || ''} w={curso==='mecanica' ? 250 : 200} h={200} alt='icone do curso'/>
                                <Text textAlign="center" fontSize={20} fontFamily="Poppins_600SemiBold" color="$black" >Essa pessoa realiza o curso de {`${curso.substring(0, 1).toUpperCase()}${curso.substring(1).toLowerCase()}`}</Text>
                            </Box>
                            {usuarios && (
                                <Box alignItems="center" mb={100} w='100%'>
                                    <TextoNegrito fontSize={12} fontFamily="Poppins_600SemiBold">Encontre mais pessoas realizando esse curso:</TextoNegrito>
                                    <Box flexDirection="row" justifyContent={usuarios.length===1 ? 'center' : "space-between"} w="100%" bg={corFundoCartao} py={15} px={20} rounded={15}>
                                        {usuarios && usuarios.length>0 ? usuarios.map((usuarioRenderizado)=> (
                                            <CartaoUsuario cor={corCartao} corSecundaria={corFundoCartao} usuario={usuario} usuarioRenderizadoNoCartao={usuarioRenderizado} vemDeLista={true}/>
                                        )): ''}
                                    </Box>
                                </Box>
                            )}
                            {botaoVisivel ? (
                                <BotaoSecao onPress={handleFechar} w={140} bg={corFundoCartao}>
                                    Fechar
                                </BotaoSecao>
                            ): <TextoNegrito color={corFundoCartao}>{textoBotaoAcao}</TextoNegrito> }
                            
                        </Box>
                    </LinearGreenGradientMoots>
                </ModalContent>
            </Modal>
        </Pressable>
    )
}


export function ActionCurso({curso}: ICursoModalProps){
    const usuario = useSelector((state)=> state.usuario.user)
    const dispatch = useDispatch()
    const [imagem, setImagem] = useState<any>('')
    const [isOpcoesVisivel, setOpcoesVisivel] = useState<boolean>(false)

    const handleImagem = () =>{
        if(curso==='desenvolvimento'.toUpperCase()) setImagem(desenvolvimentoIcon)
        if(curso==='mecanica'.toUpperCase()) setImagem(mecanicaIcon)
        if(curso==='redes'.toUpperCase()) setImagem(redesIcon)
        if(curso==='qualidade'.toUpperCase()) setImagem(qualidadeIcon)
        if(curso==='fic'.toUpperCase()) setImagem(ficIcon)
    }

    const handleClick = (imagem: any, valor: string) =>{
        setImagem(imagem)
        dispatch(setarUsuario({...usuario, novoCurso: valor}))
        setOpcoesVisivel(false)
    }
    useEffect(()=>{
        handleImagem()
    }, [])
    return(
        <Pressable onPress={()=>setOpcoesVisivel(true)}>
            <Image source={imagem} alt='icone do curso'/>
            <Actionsheet isOpen={isOpcoesVisivel} onClose={()=>setOpcoesVisivel(false)}>
                <ActionsheetBackdrop/>
                <ActionsheetContent>
                    <ActionsheetItem onPress={()=>{handleClick(desenvolvimentoIcon, 'DESENVOLVIMENTO')}}>
                        <ActionsheetItemText>Desenvolvimento</ActionsheetItemText>
                    </ActionsheetItem>
                    <ActionsheetItem onPress={()=>{handleClick(mecanicaIcon, 'MECANICA')}}>
                        <ActionsheetItemText>Mecânica</ActionsheetItemText>
                    </ActionsheetItem>
                    <ActionsheetItem onPress={()=>{handleClick(redesIcon, 'REDES')}}>
                        <ActionsheetItemText>Redes</ActionsheetItemText>
                    </ActionsheetItem>
                    <ActionsheetItem onPress={()=>{handleClick(qualidadeIcon, 'QUALIDADE')}}>
                        <ActionsheetItemText>Qualidade</ActionsheetItemText>
                    </ActionsheetItem>
                    <ActionsheetItem onPress={()=>{handleClick(ficIcon, 'FIC')}}>
                        <ActionsheetItemText>FIC</ActionsheetItemText>
                    </ActionsheetItem>
                </ActionsheetContent>
            </Actionsheet>
        </Pressable>
    )
}