import { Box, Pressable, Text } from "@gluestack-ui/themed";
import CabecalhoPerfil from "../../components/CabecalhoPerfil.tsx";
import InputPerfil from "../../components/InputPerfil";
import LinearGradientMoots from "../../components/LinearGradientMoots";
import { RoundedBottom } from "../../components/Rounded";
import { TextoNegrito } from "../../components/Texto";
import { useState } from "react";

import SyncStorage from '@react-native-async-storage/async-storage';
import { usuarioApi } from "../../api/apis";
import { useUsuarioContext } from "../../context/UsuarioContext";

export default function RedefinirSenha({navigation}){
    const {usuario, setUsuario} = useUsuarioContext()
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
            const token = await SyncStorage.getItem('token')
            const resultado = await usuarioApi.patch(`/redefinir-senha/${usuario.id}`, {
                senhaAntiga: senhaAntiga, senhaNova: novaSenha
            }, {headers: {Authorization: token}})
            setUsuario(resultado.data)
            alert('Senha alterada com sucesso.')
            navigation.goBack()
        }catch(error){
            console.error(error)
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