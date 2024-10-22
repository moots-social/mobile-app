import { Pressable, Image, Modal, ModalBackdrop, ModalContent, Box, Text} from "@gluestack-ui/themed"
import { useNavigation } from "@react-navigation/native"
import { LinearGreenGradientMoots } from "./LinearGradientMoots"
import { TextoNegrito, Titulo } from "./Texto"
import BotaoSecao from "./BotaoSecao"
import { useEffect, useState } from "react"
import CartaoUsuario from "./CartaoUsuario"
import { RoundedBottom } from "./Rounded"
import { ScrollView } from "react-native-gesture-handler"

const seguirIcon = require('../assets/SeguirIcon.png')
const listaIcon = require('../assets/ListaIcon.png')
const editarIcon = require('../assets/EditarIcon.png')

const desenvolvimentoIcon = require('../assets/cursoIcons/DesenvolvimentoIcon.png')
const mecanicaIcon = require('../assets/cursoIcons/MecanicaIcon.png')
const redesIcon = require('../assets/cursoIcons/RedesIcon.png')
const qualidadeIcon = require('../assets/cursoIcons/QualidadeIcon.png')
const ficIcon = require('../assets/cursoIcons/FicIcon.png')

interface ICursoModalProps{
    curso: string
}

export function BotaoSeguir({imgW=20, imgH=16, ...rest}){
    return(
        <Pressable bg="$lightTres" borderWidth={1} borderColor="$black" justifyContent="center" alignItems="center" {...rest}>
            <Image source={seguirIcon} w={imgW} h={imgH} m={10}/>
        </Pressable>
    )
}
export function BotaoConfigurar({imgW=10, imgH=10, ...rest}){
    const navigation = useNavigation()
    return(
        <Pressable bg="$lightTres" borderWidth={1} borderColor="$black" rounded={20} justifyContent="center" alignItems="center" maxWidth={35} maxHeight={35} onPress={()=>navigation.navigate('editar')} {...rest}>
            <Image source={editarIcon} w={imgW} h={imgH} m={10}/>
        </Pressable>
    )
}
export function BotaoListaSeguidores({imgW=16, imgH=16, ...rest}){
    const [isModalVisivel, setModalVisivel] = useState<boolean>(false)
    const[botaoSelecionado, setBotaoSelecionado] = useState<string>('seguindo')

    const handleBotaoSeguindo = ()=>{
        setBotaoSelecionado('seguindo')
    }

    const handleBotaoSeguidores = () =>{
        setBotaoSelecionado('seguidores')
    }

    return(
        <Pressable bg="$lightDois" borderWidth={1} borderColor="$black" justifyContent="center" alignItems="center" maxWidth={35} maxHeight={35} onPress={()=>setModalVisivel(true)} {...rest}>
            <Image source={listaIcon} w={imgW} h={imgH} m={10}/>
            <Modal isOpen={isModalVisivel} onClose={()=>{setModalVisivel(false); setBotaoSelecionado('seguindo')}}>
                <ModalBackdrop/>
                <ModalContent  bg="$white" h="80%" w="90%">
                    <Box bg="$white" flexDirection="row" py={20}>
                        <Pressable w="50%" justifyContent="center" alignItems="center" onPress={handleBotaoSeguindo}>
                            <TextoNegrito textDecorationLine={botaoSelecionado==='seguindo' ? 'underline' : 'none'} color={botaoSelecionado==='seguindo' && '$lightSeis'}>Seguindo</TextoNegrito>
                        </Pressable>
                        <Pressable w="50%" justifyContent="center" alignItems="center" onPress={handleBotaoSeguidores}>
                            <TextoNegrito textDecorationLine={botaoSelecionado==='seguidores' ? 'underline' : 'none'} color={botaoSelecionado==='seguidores' && '$lightSeis'}>Seguidores</TextoNegrito>
                        </Pressable>
                    </Box>
                    <Box>

                    </Box>
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
        if(curso==='desenvolvimento') {
            setImagem(desenvolvimentoIcon)
            setCorCartao("$lightSeis")
            setCorFundoCartao("$lightSete")
            return
        }
        if(curso==='mecanica') {
            setImagem(mecanicaIcon)
            setCorCartao("#F82C2C")
            setCorFundoCartao("#923333")
            return
        }
        if(curso==='redes') {
            setImagem(redesIcon)
            setCorCartao("#78C8E1")
            setCorFundoCartao("#174A95")
            return
        }
        if(curso==='qualidade') {
            setImagem(qualidadeIcon)
            setCorCartao("#FFBE3D")
            setCorFundoCartao("#BB861C")
            return
        }
        if(curso==='fic') {
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
            <Image source={imagem} w={50} h={50}/>
            <Modal isOpen={isModalVisivel} onClose={handleFechar}>
                <ModalBackdrop />
                <ModalContent w={350} h={734}>
                    <LinearGreenGradientMoots>
                        <Box alignItems="center" h="100%" justifyContent="space-around" rounded={15} py={20}>
                            <Box alignItems="center" gap={10} w="90%">
                                <Image source={imagem} w={curso==='mecanica' ? 250 : 200} h={200}/>
                                <Text textAlign="center" fontSize={20} fontFamily="Poppins_600SemiBold" color="$black" >Essa pessoa realiza o curso de {`${curso.substring(0, 1).toUpperCase()}${curso.substring(1)}`}</Text>
                            </Box>
                            <Box alignItems="center" mb={100}>
                                <TextoNegrito fontSize={12} fontFamily="Poppins_600SemiBold">Encontre mais pessoas realizando esse curso:</TextoNegrito>
                                <Box flexDirection="row" justifyContent="space-between" w="100%" bg={corFundoCartao} py={15} px={20} rounded={15}>
                                    <CartaoUsuario cor={corCartao} corSecundaria={corFundoCartao}/>
                                    <CartaoUsuario cor={corCartao} corSecundaria={corFundoCartao}/>
                                    <CartaoUsuario cor={corCartao} corSecundaria={corFundoCartao}/>
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