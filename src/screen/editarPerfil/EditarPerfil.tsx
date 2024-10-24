import * as ImagePicker from 'expo-image-picker'
import { Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetItem, ActionsheetItemText, Box, Image, Pressable, ScrollView, Text } from "@gluestack-ui/themed";
import CabecalhoPerfil from "../../components/CabecalhoPerfil";
import { TextoNegrito } from "../../components/Texto";
import InputPerfil, { MultiLinhaInputPerfil } from "../../components/InputPerfil";
import { useUsuarioContext } from '../../context/UsuarioContext';
import { ActionCurso } from '../../components/BotoesPerfil';
import SyncStorage from '@react-native-async-storage/async-storage';
import { usuarioApi } from '../../api/apis';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const UsuarioIcon = require('../../assets/UsuarioIcon.png')

export default function EditarPerfil(){
    const navigation = useNavigation()
    const {usuario, setUsuario} = useUsuarioContext()
    const [isOpcoesVisivel, setOpcoesVisivel] = useState<boolean>(false)

    const [usuarioAtualizado, setUsuarioAtualizado] = useState({nomeCompleto: '', descricao: '', curso: ''})

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
                if(opcao==='fotoPerfil'){
                    setFotoPerfil(resultado.assets[0])
                    return
                }
                setFotoCapa(resultado.assets[0])
                return
            }
            return
        }, 300)
    }

      const handleSubmit = async()=>{
          try{
            if(usuarioAtualizado.nomeCompleto === '' && usuarioAtualizado.descricao === '' && usuarioAtualizado.curso==='') throw new Error('Não há alterações a serem salvas.')
            const token = await SyncStorage.getItem('token')

            const resultado = await usuarioApi.put(`/atualizar/${usuario.id}`, {
                nomeCompleto: usuarioAtualizado.nomeCompleto || usuario.nomeCompleto, descricao: usuarioAtualizado.descricao || usuario.descricao,
                curso: usuarioAtualizado.curso || usuario.curso
            }, {headers: {Authorization: token}})

            if(resultado.data){
                setUsuario({...usuario, nomeCompleto: usuarioAtualizado.nomeCompleto || usuario.nomeCompleto, descricao: usuarioAtualizado.descricao || usuario.descricao,
                    curso: usuarioAtualizado.curso || usuario.curso
                })
                setUsuarioAtualizado({nomeCompleto: '', descricao: '', curso: ''})
                alert('Usuário atualizado com sucesso.')
            }else{
                alert('Não foi possível atualizar o usuário. Tente novamente.')
            }

        }catch(error: any){
            console.warn(error)
        }
      }

      useEffect(()=>{
        setUsuarioAtualizado({...usuarioAtualizado, curso: usuario.novoCurso})
      },[usuario.novoCurso])
    return(
        <ScrollView w="100%" bg="$white" h="100%">
            <CabecalhoPerfil titulo="Editar perfil"/>
            <Box gap={20}>
                <Box alignItems="center" mt={10}>
                    <Text fontFamily="Poppins_600SemiBold" fontSize={24} color="$black">Perfil</Text>
                    <Box flexDirection="row" justifyContent="space-between" gap={20}>
                        <Image source={UsuarioIcon}/>
                        <ActionCurso curso={usuario.curso} />
                    </Box>
                    <Pressable onPress={()=>setOpcoesVisivel(true)}>
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
                <Box alignItems="center">
                        <InputPerfil titulo="Nome completo" w="90%" placeholder={usuario.nomeCompleto} onChange={(text: string)=>setUsuarioAtualizado({...usuarioAtualizado, nomeCompleto: text})}/>
                        <Box w="100%" mt={20}>
                            <MultiLinhaInputPerfil titulo="Descrição" w="90%" placeholder={usuario.descricao} onChange={(text: string)=>setUsuarioAtualizado({...usuarioAtualizado, descricao: text})}/>
                        </Box>
                </Box>
                <Box alignItems="center">
                    <Text fontFamily="Poppins_600SemiBold" fontSize={24} color="$black">Avançado</Text>
                        <Pressable alignItems="center" onPress={()=>navigation.navigate('redefinir')}>
                            <TextoNegrito fontFamily="Poppins_600SemiBold" fontSize={16} color="$lightSete" mt={3}>Redefinir senha</TextoNegrito>
                        </Pressable>
                        <Pressable alignItems="center" onPress={()=>navigation.navigate('colecao')}>
                            <TextoNegrito fontFamily="Poppins_600SemiBold" fontSize={16} color="$lightSete" mt={3}>Acessar sua coleção de posts</TextoNegrito>
                        </Pressable>
                        <Pressable alignItems="center" onPress={()=>navigation.navigate('excluir')}>
                            <TextoNegrito fontFamily="Poppins_600SemiBold" fontSize={16} color="$lightSete" mt={3}>Excluir conta</TextoNegrito>
                        </Pressable>
                        <Pressable alignItems="center" onPress={handleSubmit}>
                            <TextoNegrito fontFamily="Poppins_600SemiBold" fontSize={16} color="$lightSete" mt={3}>Salvar alterações</TextoNegrito>
                        </Pressable>
                </Box>
                <Pressable alignItems="center">
                    <Text fontFamily="Poppins_600SemiBold" fontSize={24} color="#FF2626">Sair</Text>
                </Pressable>
            </Box>
        </ScrollView>
    )
}