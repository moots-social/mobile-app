import * as ImagePicker from 'expo-image-picker'
import { Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetItem, ActionsheetItemText, Box, Image, Pressable, ScrollView, Text, Checkbox, CheckboxIndicator, CheckboxIcon, CheckIcon, CheckboxLabel, useToast } from "@gluestack-ui/themed";
import { Alert } from 'react-native';
import CabecalhoPerfil from "../../components/cabecalho/CabecalhoPerfil";
import { TextoNegrito } from "../../components/geral/Texto";
import InputPerfil, { MultiLinhaInputPerfil } from "../../components/geral/InputPerfil";
import { ActionCurso } from '../../components/perfil/PerfilBotoes';
import { useEffect, useState } from 'react';
import Loading from '../../components/geral/Loading';
import { abrirToast} from '../../components/geral/ToastMoots';

import { logoutUser } from '../../utils/storageUtils';
import { useDispatch, useSelector } from 'react-redux';
import { setarUsuario } from '../../redux/useUsuario';

import usuarioUtils from '../../utils/usuarioUtils';

const UsuarioIcon = require('../../assets/UsuarioIcon.png')


export default function EditarPerfil({navigation}){
    const toast = useToast()
    const usuario = useSelector(state => state.usuario.user)
    
    const dispatch = useDispatch()
    const [isOpcoesVisivel, setOpcoesVisivel] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [usuarioAtualizado, setUsuarioAtualizado] = useState({nomeCompleto: '', descricao: usuario.descricao, curso: '', fotoPerfil: '', fotoCapa: ''})
    
    const [checkDescricao, setCheckDescricao] = useState<boolean>(false)
    const [disabledSalvar, setDisabledSalvar] = useState<boolean>(true)
    
    const handleOpcaoEscolhida = (opcao: string)=>{
        setOpcoesVisivel(false)
        setTimeout(async()=>{
            let resultado = await ImagePicker.launchImageLibraryAsync({
                allowsMultipleSelection: false,
                allowsEditing: true,
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                aspect: [4, 3],
                quality: 1, 
                
            })
            
            if(!resultado.canceled){
                if(opcao==='fotoPerfil') setUsuarioAtualizado({...usuarioAtualizado, fotoPerfil: resultado.assets[0].uri})
                    else setUsuarioAtualizado({...usuarioAtualizado, fotoCapa: resultado.assets[0].uri})
            }
        }, 300)
    }
    
    const handleLogout = ()=>{
        try {
            Alert.alert('Sair', 'Tem certeza que deseja sair?', [
                {
                    text: 'Sim',
                    onPress: async() => await logoutUser()
                },
                {
                    text: 'Não',
                    style: 'cancel'
                }
            ])
        } catch (error: any) {
            abrirToast(toast, 'error', `Não foi possível completar ação. ${error.response.data.error}`)
        }
    }


    const handleSubmit = async()=>{
        
        try{
            let imagem = ''
            let imagem2= ''
            if(usuarioAtualizado.fotoPerfil!=='') {
                imagem = await usuarioUtils.blobUsuario(usuarioAtualizado.fotoPerfil)
            }
            if(usuarioAtualizado.fotoCapa!==''){
                imagem2 = await usuarioUtils.blobUsuario(usuarioAtualizado.fotoCapa)
            }
            
        
            const resultado = await usuarioUtils.atualizarDados({
                nomeCompleto: usuarioAtualizado.nomeCompleto || usuario.nomeCompleto, descricao: usuarioAtualizado.descricao,
                curso: usuario.novoCurso || usuario.curso, fotoPerfil: imagem || usuario.fotoPerfil,
                fotoCapa: imagem2 || usuario.fotoCapa
            })
    
            if(resultado){
                dispatch(setarUsuario(
                    {...usuario, nomeCompleto: resultado.nomeCompleto || usuario.nomeCompleto, descricao: resultado.descricao,
                    curso: resultado.curso || usuario.curso, fotoPerfil: resultado.fotoPerfil || usuario.fotoPerfil,
                    fotoCapa: resultado.fotoCapa || usuario.fotoCapa, novoCurso: ''
                }
                ))
                setIsLoading(true)
                setTimeout(()=>{
                    setIsLoading(false)
                    setDisabledSalvar(true)
                    setCheckDescricao(false)
                    setUsuarioAtualizado({nomeCompleto: '', descricao: usuario.descricao, curso: '', fotoPerfil: '', fotoCapa: ''})
                    abrirToast(toast, 'success', 'Alterações realizadas com sucesso.', '', 800, false)
                },500)
           }else throw new Error('Não foi possível editar seu perfil. Tente novamente mais tarde.')
            
        }catch(error: any){
            abrirToast(toast, 'error', String(error))
        }
    }

    const handleCheckChange = () =>{
        setCheckDescricao(prevState => !prevState)
        
    }
    useEffect(()=>{
        setUsuarioAtualizado({...usuarioAtualizado, curso: usuario.novoCurso})
    }, [usuario.novoCurso])

    useEffect(()=>{
        if(checkDescricao===false){
            setUsuarioAtualizado({...usuarioAtualizado, descricao: usuario.descricao})
        }
    }, [checkDescricao])

    useEffect(()=>{
        const {nomeCompleto, descricao, curso, fotoPerfil, fotoCapa} = usuarioAtualizado
        if(nomeCompleto!=='' || (descricao!==usuario.descricao && checkDescricao) || checkDescricao || (curso!==usuario.curso && curso!=='')
        || (fotoPerfil!==usuario.fotoPerfil && fotoPerfil!=='') || (fotoCapa!==usuario.fotoCapa && fotoCapa!=='')
        ){
            setDisabledSalvar(false)
        }else{
            setDisabledSalvar(true)
        }
    }, [usuarioAtualizado.nomeCompleto, usuarioAtualizado.descricao, usuarioAtualizado.curso, usuarioAtualizado.fotoPerfil, usuarioAtualizado.fotoCapa])

    return(
        <ScrollView w="100%" bg="$white" h="100%">
            <Loading isOpen={isLoading}/>
            <CabecalhoPerfil titulo="Editar perfil"/>
            <Box gap="$2.5">
                <Box alignItems="center" py='$2'>
                    <Text fontFamily="Poppins_600SemiBold" fontSize={24} color="$black">Perfil</Text>
                    <Box flexDirection="row" justifyContent="space-between" gap={20}>
                        <Image source={usuarioAtualizado.fotoPerfil || usuario.fotoPerfil || UsuarioIcon} rounded={60}/>
                        <ActionCurso curso={usuario.curso} />
                    </Box>
                    <Pressable $active-opacity={0.6} onPress={()=>setOpcoesVisivel(true)}>
                        <TextoNegrito fontFamily="Poppins_600SemiBold" fontSize={16} color="$lightSete" mt={3}>Alterar foto de perfil ou capa</TextoNegrito>
                        <Actionsheet isOpen={isOpcoesVisivel} onClose={()=>setOpcoesVisivel(false)}>
                            <ActionsheetBackdrop/>
                            <ActionsheetContent>
                                <ActionsheetItem onPress={()=>handleOpcaoEscolhida('fotoPerfil')}>
                                    <ActionsheetItemText>Foto de perfil</ActionsheetItemText>
                                </ActionsheetItem>
                                <ActionsheetItem onPress={()=>handleOpcaoEscolhida('capa')}>
                                    <ActionsheetItemText>Capa</ActionsheetItemText>
                                </ActionsheetItem>
                            </ActionsheetContent>
                        </Actionsheet>
                    </Pressable>
                </Box>
                <Box alignItems="center" py='$2'>
                    <InputPerfil titulo="Nome completo" w="90%" placeholder={usuario.nomeCompleto} onChange={(text: string)=>setUsuarioAtualizado({...usuarioAtualizado, nomeCompleto: text})}/>
                    <Box w="100%" mt={20}>
                        <MultiLinhaInputPerfil titulo="Descrição" tituloColor={!checkDescricao ? '$grey' : '$black'} w="90%" placeholder={usuario.descricao==='' || !usuario.descricao ? 'Apresentação, hobbies, gostos...' : usuario.descricao} onChange={(text: string)=>setUsuarioAtualizado({...usuarioAtualizado, descricao: text})} isDisabled={!checkDescricao} value={usuarioAtualizado.descricao}/>
                    </Box>
                    <Checkbox size="sm" pt='$2' isChecked={checkDescricao} onChange={handleCheckChange} >
                        <CheckboxIndicator mr="$2" brc={checkDescricao ? '$black' : "$grey"}>
                            <CheckboxIcon as={CheckIcon} color="$lightSete" bg="$white" rounded={2} />
                        </CheckboxIndicator>
                        <CheckboxLabel fontFamily="Poppins_500Medium">Atualizar descrição</CheckboxLabel>
                    </Checkbox>
                </Box>
                <Box alignItems="center">
                    <Text fontFamily="Poppins_600SemiBold" fontSize={24} color="$black">Avançado</Text>
                        <Pressable alignItems="center" $active-opacity={0.6} onPress={()=>navigation.navigate('redefinir')}>
                            <TextoNegrito fontFamily="Poppins_600SemiBold" fontSize={16} color="$lightSete" mt={3}>Redefinir senha</TextoNegrito>
                        </Pressable>
                        <Pressable alignItems="center" $active-opacity={0.6} onPress={()=>navigation.navigate('excluir')}>
                            <TextoNegrito fontFamily="Poppins_600SemiBold" fontSize={16} color="$lightSete" mt={3}>Excluir conta</TextoNegrito>
                        </Pressable>
                        {usuario.roles && usuario.roles.includes('ADMIN') && (
                        <Pressable alignItems="center" $active-opacity={0.6} onPress={()=>navigation.navigate('moderador')}>
                            <TextoNegrito fontFamily="Poppins_600SemiBold" fontSize={16} color="$lightSete" mt={3}>Área do moderador</TextoNegrito>
                        </Pressable>
                        )}
                        {!disabledSalvar ? (<Pressable alignItems="center" $active-opacity={0.6} isDisabled={disabledSalvar} onPress={handleSubmit}>
                            <TextoNegrito fontFamily="Poppins_600SemiBold" fontSize={16} color="$lightSete" mt={3}>Salvar alterações</TextoNegrito> 
                        </Pressable>) : <TextoNegrito fontFamily="Poppins_600SemiBold" fontSize={16}></TextoNegrito>}
                <Pressable alignItems="center" $active-opacity={0.6} onPress={()=>handleLogout()} mt={20}>
                    <Text fontFamily="Poppins_600SemiBold" fontSize={24} color="#FF2626">Sair</Text>
                </Pressable>
                </Box>
            </Box>
        </ScrollView>
    )
}