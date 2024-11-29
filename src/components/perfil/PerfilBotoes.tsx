import { Pressable, Image, Modal, ModalBackdrop, ModalContent, Box, Text, ActionsheetBackdrop, ActionsheetContent, ActionsheetItem, ActionsheetItemText, Actionsheet, ScrollView, FlatList, useToast} from "@gluestack-ui/themed"
import { useNavigation, useRoute } from "@react-navigation/native"
import { LinearGreenGradientMoots } from "../geral/LinearGradientMoots"
import { TextoNegrito } from "../geral/Texto"
import { useEffect, useState } from "react"

import BotaoSecao from "../botao/BotaoSecao"
import CartaoUsuario from "./CartaoUsuario"
import { Alert } from "react-native"
import usuarioUtils, { pararDeSeguir, seguirUsuario } from "../../utils/usuarioUtils"
import { abrirToast } from "../geral/ToastMoots"
import { useDispatch, useSelector } from "react-redux"
import { setarUsuario } from "../../redux/useUsuario"
import { LazyIcon } from "../geral/LazyImage"
import { BareLoading } from "../geral/Loading"

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
    const [clicouBotao, setClicouBotao] = useState<boolean>(false)
    const usuario = useSelector(state => state.usuario.user) || usuarioLogado
    const dispatch = useDispatch()
    const toast = useToast()

    const handlePararDeSeguir = async()=>{
        setClicouBotao(true)
        const resultado = await pararDeSeguir(id1, id2)
        if(resultado===200){
            setIsSeguindo(false)
            dispatch(setarUsuario({
                ...usuario,
                idSeguindo: usuario.idSeguindo.filter(id => id != id2)
            }))
            abrirToast(toast, 'success', `Você parou de seguir ${nomeCompleto}.`)
        }
        setClicouBotao(false) 
    }
    
    const handleSeguirUsuario = async()=>{
        setClicouBotao(true)
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
                    text: 'Não',
                    // onPress: () =>setClicouBotao(false)
                }
            ])
        }
        setClicouBotao(false)
    }
    
    useEffect(() => {
        const handleIsSeguindo = async() => {
            const checkIsSeguindo = await usuario.idSeguindo.some(dado => dado == id2);
            setIsSeguindo(checkIsSeguindo);
        };
    
        handleIsSeguindo();
    }, [usuario.idSeguindo])
    return(
        <Pressable bg={!isSeguindo ? "$lightTres" : '#FF5050'} onPress={handleSeguirUsuario}  borderColor="$black" justifyContent="center" alignItems="center" {...rest}>
            {!clicouBotao ? <LazyIcon imagem={seguirIcon} style={{width: imgW, height: imgH, margin: 10}} /> : <BareLoading color='$black' m={7}/>}
        </Pressable>
    )
}


export function BotaoConfigurar({imgW=10, imgH=10, ...rest}: IBotaoConfigurarProps){
    const navigation = useNavigation()
    return(
        <Pressable bg="$lightTres" rounded={20} justifyContent="center" alignItems="center" maxWidth={35} maxHeight={35} onPress={()=>navigation.navigate('editar')} {...rest}>
            <LazyIcon imagem={editarIcon} style={{width: imgW, height: imgH, margin: 10}} />
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
            } else setSeguindo([])
        } catch (error) {
            setSeguindo([])
        }
    }
    const getSeguidores = async()=>{
        try {
            
            const resultado = await usuarioUtils.buscarSeguidores(getUsuario.userId)
            if(resultado){
                setSeguidores(resultado)
            } else setSeguidores([])
            
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
    }, [getUsuario.userId, isModalVisivel, botaoSelecionado])
    
    return(
        <Pressable bg="$lightDois" borderColor="$black" justifyContent="center" alignItems="center" maxWidth={35} maxHeight={35} onPress={()=>setModalVisivel(true)} {...rest}>
            <LazyIcon imagem={listaIcon} style={{width: imgW, height: imgH, margin: 10}} />
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
                         <FlatList $base-px={20} $md-px={75} data={seguindo} numColumns={2} $md-numColumns={3} renderItem={({item})=> 
                            <CartaoUsuario mb={20} usuario={usuario} usuarioRenderizadoNoCartao={item} navigation={navigation} vemDeLista={true} onPress={()=>{navigation.navigate('outro-perfil', {userId: item.userId}); setModalVisivel(false); setBotaoSelecionado('seguindo')}}/>
                            } contentContainerStyle={{flexDirection: 'row', justifyContent: 'space-between'}}/>   
                        )
                          : ''}
                        {botaoSelecionado==='seguidores' && seguidores ? (
                            <FlatList $base-px={20} $md-px={75} data={seguidores} numColumns={2} $md-numColumns={3} renderItem={({item})=> 
                            <CartaoUsuario mb={20} usuario={usuario} usuarioRenderizadoNoCartao={item} vemDeLista={true} onPress={()=>{navigation.navigate('outro-perfil', {userId: item.userId}); setModalVisivel(false); setBotaoSelecionado('seguindo')}}/>
                        } contentContainerStyle={{flexDirection: 'row', justifyContent: 'space-between'}}/>) : ''}
                </ModalContent>
            </Modal>
        </Pressable>
    )
}
export function BotaoCurso({curso}: ICursoModalProps){
    const [isModalVisivel, setModalVisivel] = useState<boolean>(false)
    const [botaoVisivel, setBotaoVisivel] = useState<boolean>(false)
    const [textoBotaoAcao, setTextoBotaoAcao] = useState<string>()

    const [imagem, setImagem] = useState<any>('')
    const [corFundo, setCorFundo] = useState<string>()

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
            setCorFundo("$lightSete")
            return
        }
        if(curso==='mecanica'.toUpperCase()) {
            setImagem(mecanicaIcon)
            setCorFundo("#923333")
            return
        }
        if(curso==='redes'.toUpperCase()) {
            setImagem(redesIcon)
            setCorFundo("#174A95")
            return
        }
        if(curso==='qualidade'.toUpperCase()) {
            setImagem(qualidadeIcon)
            setCorFundo("#BB861C")
            return
        }
        if(curso==='fic'.toUpperCase()) {
            setImagem(ficIcon)
            setCorFundo("#C50ABD")
            return
        }
    }

    
    useEffect(()=>{
        handleImagemCor()
    }, [curso])

    return(
        <Pressable onPress={handleAbrir}>
            <LazyIcon imagem={imagem || ''} style={{width: 50, height: 50}}/>
            <Modal isOpen={isModalVisivel} onClose={handleFechar}>
                <ModalBackdrop />
                <ModalContent w='95%' h='90%'>
                    <LinearGreenGradientMoots>
                        <Box alignItems="center" h="100%" justifyContent="space-around" rounded={15} py={20}>
                            <Box alignItems="center" gap={10} w="90%" mb={100}>
                                <LazyIcon imagem={imagem || ''} style={{width: curso==='mecanica' ? 250 : 200, height: 200}}/>
                                <Text textAlign="center" fontSize={20} fontFamily="Poppins_600SemiBold" color="$black" >Essa pessoa realiza o curso de {`${curso.substring(0, 1).toUpperCase()}${curso.substring(1).toLowerCase()}`}</Text>
                            </Box>
                            {botaoVisivel ? (
                                <BotaoSecao onPress={handleFechar} w={140} bg={corFundo}>
                                    Fechar
                                </BotaoSecao>
                            ): <TextoNegrito color={corFundo}>{textoBotaoAcao}</TextoNegrito> }
                            
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