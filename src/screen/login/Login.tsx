import { usuarioLogin, usuarioApi } from "../../api/apis";
import SyncStorage from '@react-native-async-storage/async-storage';
import { Box, Image,} from "@gluestack-ui/themed";
import { Titulo, TextoNegrito } from "../../components/Texto";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import BotaoSecao from "../../components/BotaoSecao";
import LinearGradientMoots from "../../components/LinearGradientMoots";
import FormControlInput from "../../components/FormControlInput";
import { useUsuarioContext } from "../../context/UsuarioContext";
import { Alert } from "react-native";

const fecharIcon = require('../../assets/FecharIcon.png')
const image = require("../../assets/MootsIcon.png")

export default function Login({ navigation }) {
  const { usuario, setUsuario } = useUsuarioContext()

  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
    
  const handleSubmit = async () => {
      try {
        const dado = await usuarioLogin.post("", {
            email : email,
            senha : senha
        });
        const res = dado.data;
        
        if(res){
          try{
            const buscarUsuario = await usuarioApi.get(`/buscar/${res.id}`, {
              headers: {
                Authorization: res.token
              }
            })
            setUsuario(buscarUsuario.data)
            SyncStorage.setItem('token', res.token);
            navigation.navigate("tabs")
            setEmail('')
            setSenha('')
          }catch(error: any){ 
            Alert.alert('Erro no servidor', 'Não foi possível concluir a autenticação. Tente novamente mais tarde.')
          }
        }
      } catch (error: any) {
        Alert.alert('Autenticação inválida', error.response.data.error,)
    }
  };

  return (
    <LinearGradientMoots display="flex" justifyContent="flex-end" w="100%" h="100%">
              
      <StatusBar translucent={true}/>
      <Box display="flex" alignItems="center" h="40%" justifyContent="center">
        <Image source={image} alt='logo' w={200} h={200}/>
      </Box>
      <Box bg="white" borderTopLeftRadius={50} borderTopRightRadius={50} width="100%" height="50%" alignItems="center">
        <Titulo mt={5} fontSize={20}>Comece a aproveitar.</Titulo>

        <Box alignItems="center" w="85%">
            <FormControlInput label="Email" loginOuCadastro={true} value={email} onChange={(text) => setEmail(text)}/>
            <Box flexDirection="row" justifyContent="center" mt={2.5} mb={2.5}>
              <TextoNegrito>Não tem uma conta? </TextoNegrito>
              <TouchableOpacity onPress={() => {navigation.navigate("cadastro")}}>
                <TextoNegrito color="$lightSete">Realizar cadastro</TextoNegrito>
              </TouchableOpacity>
            </Box>

            <FormControlInput label="Senha" loginOuCadastro={true} value={senha} onChange={(text) => setSenha(text)}/>
            <Box flexDirection="row" justifyContent="center" mt={2.5} mb={30}>
              <TextoNegrito>Esqueceu sua senha? </TextoNegrito>
              <TouchableOpacity onPress={() => {navigation.navigate("cadastro")}}>
                <TextoNegrito color="$lightSete">Redefinir senha</TextoNegrito>
              </TouchableOpacity>
            </Box>
        </Box>

        <Box alignItems="center" w="80%">
          <BotaoSecao w="100%" onPress={() => handleSubmit()}>
              Confirmar
          </BotaoSecao>
        </Box>
      </Box>
    </LinearGradientMoots >
)}