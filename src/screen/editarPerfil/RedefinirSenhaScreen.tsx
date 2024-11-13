import { Box, Pressable, Text } from "@gluestack-ui/themed";
import CabecalhoPerfil from "../../components/cabecalho/CabecalhoPerfil";
import InputPerfil from "../../components/geral/InputPerfil";
import { TextoNegrito } from "../../components/geral/Texto";
import { useState } from "react";

import SyncStorage from '@react-native-async-storage/async-storage';
import { usuarioApi } from "../../api/apis";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { redefinirSenha } from "../../utils/usuarioUtils";
import { setarUsuario } from "../../redux/useUsuario";

export default function RedefinirSenha({navigation}){
    const usuario = useSelector((state)=> state.usuario.user)
    const dispatch = useDispatch()
    const [senhaAtualizada, setSenhaAtualizada] = useState({senhaAntiga: '', novaSenha: '', confirmaNovaSenha: ''})

    const handleSenhaAntigaChange = (texto: string)=>{
        setSenhaAtualizada({...senhaAtualizada, senhaAntiga: texto})
    }
    const handleNovaSenhaChange = (texto: string)=>{
        setSenhaAtualizada({...senhaAtualizada, novaSenha: texto})
    }
    const handleConfirmaNovaSenhaChange = (texto: string)=>{
        setSenhaAtualizada({...senhaAtualizada, confirmaNovaSenha: texto})
    }

    const handleSubmit = async()=>{
        const {senhaAntiga, novaSenha, confirmaNovaSenha} = senhaAtualizada
        try{
            if(senhaAntiga==='' || novaSenha==='' || confirmaNovaSenha ==='') throw new Error('Todos os campos devem ser preenchidos.')
            if(novaSenha.length<8) throw new Error('Sua senha deve conter 8 caracteres ou mais.')
            if(novaSenha!==confirmaNovaSenha) throw new Error('As senhas não coincidem. Tente novamente.')
            const resultado = await redefinirSenha(senhaAntiga, novaSenha)
            if(resultado){
                dispatch(setarUsuario(resultado))
                alert('Senha alterada com sucesso.')
                navigation.goBack()
            }
        }catch(error: any){
            Alert.alert('Senha incorreta', 'Sua senha está incorreta. Tente novamente com a senha correta.')
        }
    }
    return(
        <Box bg="$white" h="100%">
            <CabecalhoPerfil titulo='Redefinir senha' />
            <Box justifyContent="space-between" h="85%">
                <Box>
                    <Box alignItems="center" my={20} >
                        <InputPerfil type='password' titulo='Senha atual' w="90%" onChange={(text: string)=>handleSenhaAntigaChange(text)}/>
                        <Box flexDirection="row" mt={5}>
                            <TextoNegrito>Esqueceu sua senha? </TextoNegrito>
                            <Pressable>
                                <TextoNegrito color="$lightSete">Redefinir senha</TextoNegrito>
                            </Pressable>
                        </Box>
                    </Box>
                    <Box>
                        <InputPerfil type='password' titulo='Nova senha' w="90%" onChange={(text: string)=>handleNovaSenhaChange(text)}/>
                    </Box>
                    <Box my={20} >
                        <InputPerfil type='password' titulo='Repita a nova senha' w="90%" onChange={(text: string)=>handleConfirmaNovaSenhaChange(text)}/>
                    </Box>
                </Box>
                <Pressable alignItems="center" onPress={handleSubmit}>
                    <Text fontFamily="Poppins_600SemiBold" fontSize={24} color="$lightSete">Salvar alterações</Text>
                </Pressable>
            </Box>
        </Box>
    )
}