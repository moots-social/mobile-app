import { Box, Image, Input, InputField, InputIcon, InputSlot, Pressable, styled, useToast } from "@gluestack-ui/themed";
import { TextoNegrito } from "../geral/Texto";
import { useRef, useState } from "react";
import { StyledShadowBox } from "../../screen/login/CadastroScreen";

import BotaoVoltar from "../botao/BotaoVoltar";
import { useNavigation} from "@react-navigation/native";
import { Alert, Keyboard } from "react-native";
import { abrirToast } from "../geral/ToastMoots";
import FiltrosModal from "../modal/FiltrosModal";
import { ScrollView } from "react-native-gesture-handler";
import { useMiscContext } from "../../context/MiscContext";
import { useDispatch, useSelector } from "react-redux";
import searchUtils from "../../utils/searchUtils";
import { novaListaTermo, novoTermo } from "../../redux/useUsuario";
const botaoEnviar = require('../../assets/EnviarIconRounded.png')
const pesquisaIcon = require('../../assets/PesquisaIcon.png')

interface ITermoProps{
    termo: string,
}

export const BottomRadiusShadowBox = styled(StyledShadowBox, {
    justifyContent: 'center',
    py: 10,
    px: 10,
    w: '100%',
    bg: '$white',
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
})


export default function BarraPesquisa({extended=true, valorParam='', ...rest}){
    const toast = useToast()
    const navigation = useNavigation()
    const input = useRef(null)
    const termos = useSelector(state => state.usuario.termos)
    const filtros = useSelector(state => state.usuario.filtros)
    const usuario = useSelector(state => state.usuario.user)
    const dispatch = useDispatch()

    const [isInvalid, setIsInvalid] = useState<boolean>(false)
    const [valor, setValor] = useState<string>(valorParam || '')

    const voltar = () =>{
        navigation.goBack()
    }
    
    const desfocarInput = () => {
        input.current.blur()
        Keyboard.dismiss()
    }

    const handlePesquisar = async()=>{
        if(valor==='' && valorParam===''){
            setIsInvalid(true)
            abrirToast(toast, 'error', 'Para pesquisar um usuário ou uma publicação, você deve digitar algo no campo de pesquisa.')
            desfocarInput()
        }
        else{
            setIsInvalid(false)
            try {
                let resultadoPerfil = null
                let resultadoPost = null
                if(filtros.radioGeral === 'tudo'){
                    resultadoPerfil = await searchUtils.buscarUsuario(valor)
                    resultadoPost = await searchUtils.buscarPost(valor)
                } else if (filtros.radioGeral === 'usuarios'){
                    resultadoPerfil = await searchUtils.buscarUsuario(valor)
                } else if (filtros.radioGeral === 'publicacoes'){
                    resultadoPost = await searchUtils.buscarPost(valor)
                } else console.log('por algum motivo, radioGeral é diferente de algum dos 3 valores')
                if(filtros.radioUsuario!=='qualquerUm' && resultadoPerfil.length>0 && usuario.seguindo.length>0){
                    const novoArrayUsuarioSeguindo = resultadoPerfil.filter((perfil, index)=> {return usuario.seguindo[index].id == perfil.userId})
                    resultadoPerfil = novoArrayUsuarioSeguindo
                }
                if(filtros.selectUsuario!=='Qualquer' && resultadoPerfil.length>0){
                    const novoArrayCurso = resultadoPerfil.filter((perfil)=> {return filtros.selectUsuario.toUpperCase() === perfil.curso})
                    resultadoPerfil = novoArrayCurso
                }

                if(resultadoPerfil || resultadoPost){
                    navigation.navigate('pesquisaPalavraChave', {valor: valor, dataPerfil: resultadoPerfil, dataPost: resultadoPost})
                    if(!termos.includes(valor)){
                        setTimeout(()=>{
                            dispatch(novoTermo(valor))
                        }, 100)
                    } 
                    setValor('')
                }
            } catch (error) {
                console.error(error)
            }
        }
    }

    return(
            <BottomRadiusShadowBox {...rest}>
                <Box  flexDirection="row" justifyContent={!extended ? "space-around" : "space-between"} alignItems="center" py={10} pt={30}>
                    {!extended && (
                        <Box>
                            <BotaoVoltar onPress={()=>voltar()}/>
                        </Box>
                    )}

                    <Box w={!extended ? "70%" : "85%"}>
                        <Input ref={input} onBlur={desfocarInput} variant="rounded" h={35} borderWidth={2} borderColor={isInvalid ? "#FF0000" : "$black"} isInvalid={isInvalid} onSubmitEditing={handlePesquisar}>
                            <InputSlot>
                                <InputIcon w="100%" ml={10} bottom={2}><Image source={pesquisaIcon} w={20} h={20} alt='pesquisa'/></InputIcon>
                            </InputSlot>
                            <InputField 
                                fontFamily="Poppins_500Medium" 
                                placeholder={valor!='' ? valor : "Pesquise algo..."} 
                                ml={-10} 
                                pt={5} 
                                value={valor}
                                onChangeText={(novoValor)=>setValor(novoValor)}
                            />
                            <InputSlot>
                                    <Pressable onPress={handlePesquisar}>
                                        <InputIcon w="100%" mr={5} bottom={2}>
                                            <Image source={botaoEnviar} w={20} h={20} alt='enviar'/>
                                        </InputIcon>
                                    </Pressable>
                            </InputSlot>
                        </Input>
                    </Box>

                    <Box mr={extended ? 8 : 0}>
                        <FiltrosModal />
                    </Box>

                </Box>

                {extended && <Box flexDirection="row" display="flex">
                    <TextoNegrito mr='$2.5' display="flex">Recentes:</TextoNegrito>
                    <ScrollView contentContainerStyle={{gap: 5}} showsHorizontalScrollIndicator={false} horizontal>
                    {termos.length> 0 ? termos.map((termo)=>{
                        return <TermoRecente termo={termo} key={termo}/>
                    }): <TextoNegrito>Nenhuma pesquisa recente.</TextoNegrito>}
                    </ScrollView>
                </Box>}
                
            </BottomRadiusShadowBox>
    )
}

export function TermoRecente({termo, ...rest}: ITermoProps){
    const navigation = useNavigation()
    const termos = useSelector(state => state.usuario.termos)
    const dispatch = useDispatch()

    const handlePress = async()=>{
        try {
            const resultado = await searchUtils.buscarUsuario(termo)
            const resultadoPost = await searchUtils.buscarPost(termo)

            if(resultado || resultadoPost){
                navigation.navigate('pesquisaPalavraChave', {valor: termo, dataPerfil: resultado || null, dataPost: resultadoPost || null})
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleLongPress = () =>{
        Alert.alert('Remover pesquisa', `Deseja remover a pesquisa recente "${termo}"?`, [
            {
                text: 'Sim',
                onPress: ()=>{
                    const index: number = termos.lastIndexOf(termo)
                    const novoArrayTermo = termos.slice(0, index).concat(termos.slice(index+1))
                    dispatch(novaListaTermo(novoArrayTermo))
                }
            },
            {
                text: 'Não',
            }
        ])
    }
    return(
        <Pressable bg="$add1" alignItems= "center" rounded= {15} px={10} onPress={handlePress} onLongPress={handleLongPress} {...rest}>
            <TextoNegrito color="$lightSeis">{termo}</TextoNegrito>
        </Pressable>
    )
}