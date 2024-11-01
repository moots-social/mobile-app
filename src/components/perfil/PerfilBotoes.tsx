import { Pressable, Image, Modal, ModalBackdrop, ModalContent, Box, Text, ActionsheetBackdrop, ActionsheetContent, ActionsheetItem, ActionsheetItemText, Actionsheet, ScrollView, FlatList} from "@gluestack-ui/themed"
import { useNavigation } from "@react-navigation/native"
import { LinearGreenGradientMoots } from "../geral/LinearGradientMoots"
import { TextoNegrito } from "../geral/Texto"
import { useEffect, useState } from "react"
import { useUsuarioContext } from "../../context/UsuarioContext"
import { usuarioApi } from "../../api/apis"

import BotaoSecao from "../botao/BotaoSecao"
import CartaoUsuario from "./CartaoUsuario"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Alert } from "react-native"
import { getTokenStorage } from "../../utils/storageUtils"
import { pararDeSeguir, seguirUsuario } from "../../utils/usuarioUtils"

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
export function BotaoSeguir({imgW=20, imgH=16, id1, id2, nomeCompleto, ...rest}: IBotaoSeguirProps){
    const [isSeguindo, setIsSeguindo] = useState<boolean>()

    const handlePararDeSeguir = async()=>{
        const resultado = await pararDeSeguir(nomeCompleto, id1, id2)
        if(resultado===`Você parou de seguir ${nomeCompleto}.`) setIsSeguindo(false)
        Alert.alert(`Resultado`, resultado)
    }

    const handleSeguirUsuario = async()=>{
        const resultado = await seguirUsuario(nomeCompleto, id1, id2)
        if(resultado === `Agora você está seguindo ${nomeCompleto}.`){
            setIsSeguindo(true)
            Alert.alert('Seguir usuário', resultado)
        }
        else if(resultado === 'Acesso negado. Você não tem permissão para acessar este recurso.'){
            Alert.alert(`Parar de seguir`, `Tem certeza que deseja parar de seguir ${nomeCompleto}?`, [
                {
                    text: 'Sim',
                    onPress: async()=>await handlePararDeSeguir()
                },
                {
                    text: 'Não'
                }
            ])
        }
    }
    
    useEffect(() => {
        const handleIsSeguindo = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const resultado = await usuarioApi.get(`/buscar-quem-segue/${id1}`, {
                    headers: { Authorization: token },
                });
    
                if (resultado.data) {
                    const checkIsSeguindo = resultado.data.some(dado => dado.id === id2);
                    setIsSeguindo(checkIsSeguindo);
                }
            } catch (error: any) {
                console.error(error.response?.data?.error || error);
            }
        };
    
        handleIsSeguindo();
    }, [id1, id2])
    return(
        <Pressable bg={!isSeguindo ? "$lightTres" : '#FF5050'} onPress={handleSeguirUsuario} borderWidth={1} borderColor="$black" justifyContent="center" alignItems="center" {...rest}>
            <Image source={seguirIcon} w={imgW} h={imgH} m={10} alt='seguir'/>
        </Pressable>
    )
}


export function BotaoConfigurar({imgW=10, imgH=10, ...rest}: IBotaoConfigurarProps){
    const navigation = useNavigation()
    return(
        <Pressable bg="$lightTres" borderWidth={1} borderColor="$black" rounded={20} justifyContent="center" alignItems="center" maxWidth={35} maxHeight={35} onPress={()=>navigation.navigate('editar')} {...rest}>
            <Image source={editarIcon} w={imgW} h={imgH} m={10} alt='editar'/>
        </Pressable>
    )
}
export function BotaoListaSeguidores({imgW=16, imgH=16, getUsuario, ...rest}: IBotaoListaSeguidores){
    const {usuario} = useUsuarioContext()
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
            const token = await AsyncStorage.getItem('token')
            const resultado = await usuarioApi.get(`/buscar-quem-segue/${getUsuario.userId}`, {headers:{Authorization: token}})
            if(resultado){
                setSeguindo(resultado.data)
            }
        } catch (error) {
            setSeguindo([])
            console.log(error)
        }
    }
    const getSeguidores = async()=>{
        try {
            
            const token = await AsyncStorage.getItem('token')
            const resultado = await usuarioApi.get(`/buscar-seguidores/${getUsuario.userId}`, {headers:{Authorization: token}})
            if(resultado){
                setSeguidores(resultado.data)
            }
            
        } catch (error) {
            setSeguidores([])
            console.log(error)
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
        <Pressable bg="$lightDois" borderWidth={1} borderColor="$black" justifyContent="center" alignItems="center" maxWidth={35} maxHeight={35} onPress={()=>setModalVisivel(true)} {...rest}>
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
                         <FlatList data={seguindo} renderItem={({item})=> 
                            <CartaoUsuario mb={20} usuario={usuario} usuarioRenderizadoNoCartao={item} navigation={navigation} vemDeLista={true} onPress={()=>{navigation.navigate('outro-perfil', {outroUsuario: item}); setModalVisivel(false); setBotaoSelecionado('seguindo')}}/>
                            } contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 20}}/>   
                        )
                          : ''}
                        {botaoSelecionado==='seguidores' && seguidores ? (
                            <FlatList data={seguidores} renderItem={({item})=> 
                            <CartaoUsuario mb={20} usuario={usuario} usuarioRenderizadoNoCartao={item} vemDeLista={true} onPress={()=>{navigation.navigate('outro-perfil', {outroUsuario: item}); setModalVisivel(false); setBotaoSelecionado('seguindo')}}/>
                        } contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 20}}/>) : ''}
                </ModalContent>
            </Modal>
        </Pressable>
    )
}
export function BotaoCurso({curso, ...rest}: ICursoModalProps){

    const [isModalVisivel, setModalVisivel] = useState<boolean>(false)
    const [botaoVisivel, setBotaoVisivel] = useState<boolean>(false)
    const [textoBotaoAcao, setTextoBotaoAcao] = useState<string>()

    const [imagem, setImagem] = useState<any>('')
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
        handleImagemCor()
    }, [curso])

    return(
        <Pressable onPress={handleAbrir}>
            <Image source={imagem || ''} w={50} h={50} alt='curso'/>
            <Modal isOpen={isModalVisivel} onClose={handleFechar}>
                <ModalBackdrop />
                <ModalContent w={350} h={734}>
                    <LinearGreenGradientMoots>
                        <Box alignItems="center" h="100%" justifyContent="space-around" rounded={15} py={20}>
                            <Box alignItems="center" gap={10} w="90%">
                                <Image source={imagem || ''} w={curso==='mecanica' ? 250 : 200} h={200} alt='icone do curso'/>
                                <Text textAlign="center" fontSize={20} fontFamily="Poppins_600SemiBold" color="$black" >Essa pessoa realiza o curso de {`${curso.substring(0, 1).toUpperCase()}${curso.substring(1).toLowerCase()}`}</Text>
                            </Box>
                            <Box alignItems="center" mb={100}>
                                <TextoNegrito fontSize={12} fontFamily="Poppins_600SemiBold">Encontre mais pessoas realizando esse curso:</TextoNegrito>
                                <Box flexDirection="row" justifyContent="space-between" w="100%" bg={corFundoCartao} py={15} px={20} rounded={15}>
                                    {/* <CartaoUsuario cor={corCartao} corSecundaria={corFundoCartao}/>
                                    <CartaoUsuario cor={corCartao} corSecundaria={corFundoCartao}/>
                                    <CartaoUsuario cor={corCartao} corSecundaria={corFundoCartao}/> */}
                                </Box>
                            </Box>
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
    const {usuario, setUsuario} = useUsuarioContext()
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
        setUsuario({...usuario, novoCurso: valor})
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