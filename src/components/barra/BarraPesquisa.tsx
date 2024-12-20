import { Box, Input, InputField, InputSlot, Pressable, styled, useToast } from "@gluestack-ui/themed";
import { TextoNegrito } from "../geral/Texto";
import { useRef, useState } from "react";
import { StyledShadowBox } from "../../screen/login/CadastroScreen";

import BotaoVoltar from "../botao/BotaoVoltar";
import { useNavigation} from "@react-navigation/native";
import { Alert, Keyboard } from "react-native";
import { abrirToast } from "../geral/ToastMoots";
import FiltrosModal from "../modal/FiltrosModal";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import searchUtils from "../../utils/searchUtils";
import { novaListaTermo, novoTermo } from "../../redux/useUsuario";
import { BotaoEnviarNovoPost } from "../botao/BotoesPostComentario";
import { BareLoading } from "../geral/Loading";

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
    let novoPlaceholder = filtros.radioGeral!=='tudo' || filtros.radioUsuario!=='qualquerUm' || filtros.selectUsuario!=='Qualquer' || !filtros.checkPublicacoes ? extended ? "Pesquise algo... [FILTROS]" : '[FILTROS]' : 'Pesquise algo...'
    const [isInvalid, setIsInvalid] = useState<boolean>(false)
    const [valor, setValor] = useState<string>(valorParam || '')
    const [enviandoPesquisa, setEnviandoPesquisa] = useState<boolean>(false)
    
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
                setEnviandoPesquisa(true)
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

                if(filtros.radioGeral!=='publicacoes'){
                    if(filtros.radioUsuario==='quemSegue' && resultadoPerfil){
                        const getUsuariosSeguindo = resultadoPerfil.filter(perfil => usuario.idSeguindo.includes(Number(perfil.userId)))
                        resultadoPerfil = getUsuariosSeguindo
                    }
                    
                    if(filtros.selectUsuario!=='Qualquer' && resultadoPerfil.length>0){
                        const getUsuariosPorCurso = resultadoPerfil.filter((perfil)=> {return filtros.selectUsuario.toUpperCase() === perfil.curso})
                        resultadoPerfil = getUsuariosPorCurso
                    }
                }
                if(filtros.radioGeral!=='usuarios'){
                    if(filtros.checkPublicacoes==false && resultadoPost.length>0 && usuario.idSeguindo.length>0){
                        const getPostsQuemSegue = resultadoPost.filter(post => usuario.idSeguindo.includes(Number(post.userId)))
                        resultadoPost = getPostsQuemSegue
                    }

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
                abrirToast(toast, 'error', 'Não foi possível realizar a pesquisa. Tente novamente.')
            } finally {
                setEnviandoPesquisa(false)
            }
        }
    }

    return(
            <BottomRadiusShadowBox {...rest}>
                <Box  flexDirection="row" justifyContent={!extended ? "space-around" : "space-between"} alignItems="center" py={10} pt={30}>
                    {!extended && (
                        <Box>
                            <BotaoVoltar/>
                        </Box>
                    )}

                    <Box w={!extended ? "70%" : "85%"} $md-w={!extended ? '80%' : '90%'}>
                        <Input ref={input} onBlur={desfocarInput} variant="rounded" h={35} borderWidth={2} borderColor={isInvalid ? "#FF0000" : "$black"} isInvalid={isInvalid} onSubmitEditing={handlePesquisar}>
                            
                            <InputField 
                                fontFamily="Poppins_500Medium" 
                                placeholder={valor!='' ? valor : novoPlaceholder} 
                                pt={5} 
                                value={valor}
                                onChangeText={(novoValor)=>setValor(novoValor)}
                            />
                            <InputSlot>
                                {!enviandoPesquisa ? <BotaoEnviarNovoPost onPress={handlePesquisar} mr={10}/> : <BareLoading mr={10}/>}
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
        <Pressable $active-opacity={0.8} bg="$add1" alignItems="center" rounded= {15} px={10} onPress={handlePress} onLongPress={handleLongPress} {...rest}>
            <TextoNegrito color="$lightSeis">{termo}</TextoNegrito>
        </Pressable>
    )
}