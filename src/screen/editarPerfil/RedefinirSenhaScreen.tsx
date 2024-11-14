import { Box, Pressable, Text, useToast } from "@gluestack-ui/themed";
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
import { abrirToast } from "../../components/geral/ToastMoots";

export default function RedefinirSenha({navigation}){
    const toast = useToast()
    
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
            if(senhaAntiga==='' || novaSenha==='' || confirmaNovaSenha ==='') throw new Error('Todos os campos devem ser preenchidos.', {cause: 'badrequest'})
            if(novaSenha.length<8) throw new Error('Sua senha deve conter 8 caracteres ou mais.', {cause: 'less8'})
            if(novaSenha!==confirmaNovaSenha) throw new Error('As senhas não coincidem. Tente novamente.', {cause: 'matchpass'})

            const resultado = await redefinirSenha(senhaAntiga, novaSenha)
            if(resultado!==409){
                dispatch(setarUsuario(resultado))
                abrirToast(toast, 'success', 'Senha alterada com sucesso.', '', 1500, false)
                navigation.goBack()
            } else throw new Error('Sua senha está incorreta. Tente novamente com a senha correta.')
        }catch(error: any){
            abrirToast(toast, 'error', String(error), '', 1000, false)
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