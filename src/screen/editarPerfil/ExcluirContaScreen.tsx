import { Box, Pressable, Text } from "@gluestack-ui/themed";
import CabecalhoPerfil from "../../components/cabecalho/CabecalhoPerfil";
import { TextoNegrito } from "../../components/geral/Texto";
import { useState } from "react";
import { Alert } from "react-native";
import { useUsuarioContext } from "../../context/UsuarioContext";
import SyncStorage from '@react-native-async-storage/async-storage';
import { usuarioApi } from "../../api/apis";
import Loading from "../../components/geral/Loading";
import { useAuthContext } from "../../context/AuthContext";
import { logoutUser } from "../../utils/storageUtils";

export default function ExcluirConta(){
    const {usuario, setUsuario} = useUsuarioContext()
    const {setAuth} = useAuthContext()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleExcluirConta = async()=>{
        try{
            const token = await SyncStorage.getItem('token')
            const resultado = await usuarioApi.delete(`/${usuario.id}`, {headers: {Authorization: token}})
            if(resultado!=undefined){
                Alert.alert('Conta excluída', 'Conta excluída com sucesso. Muito obrigado por ter feito parte do Moots!')
                setIsLoading(true)
                setTimeout(async()=>{
                    await logoutUser(setAuth, setUsuario)
                    setIsLoading(false)
                },2000)
            }
        }catch(error: any){
            Alert.alert('Erro', error.response.data.error)
        }
    }

    const handleSubmit = ()=>{
        try{
            Alert.alert('Excluir conta', 'Tem certeza que deseja excluir sua conta?', [
                {
                    text: 'Sim',
                    onPress: () => handleExcluirConta(),
                    style : 'default'
                },
                {
                    text: 'Não',
                    style: 'cancel'
                }
            ], )
        }catch(error){

        }
    }
    return(
        <Box w="100%" bg="$white" h="100%">
            <Loading isOpen={isLoading}/>
            <CabecalhoPerfil titulo='Excluir conta' />
            <Box w="100%" bg="$white" h="85%" justifyContent="space-between" alignItems="center">
                <Box w="90%" alignItems="center" mt={20} >
                    <TextoNegrito textAlign="center">Se você excluir sua conta, seu email ficará livre para a criação de outra conta. Além disso, você perderá suas publicações salvas, informações do perfil e suas conversas.</TextoNegrito>
                    <TextoNegrito mt={35}>Essa ação não pode ser revertida.</TextoNegrito>
                </Box>
                <Pressable justifyContent="flex-end" alignItems="center" onPress={handleSubmit}>
                    <Text fontFamily="Poppins_600SemiBold" fontSize={24} color="#FF2626">Excluir conta</Text>
                </Pressable>
            </Box>
        </Box>
    )
}