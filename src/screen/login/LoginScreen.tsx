import { usuarioLogin } from "../../api/apis";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Box, Image } from "@gluestack-ui/themed-native-base";
import { Titulo, TextoNegrito } from "../../components/geral/Texto";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import BotaoSecao from "../../components/botao/BotaoSecao";
import LinearGradientMoots from "../../components/geral/LinearGradientMoots";
import FormControlInput from "../../components/geral/FormControlInput";
import { CommonActions } from '@react-navigation/native';
import { useAuthContext } from "../../context/AuthContext";
import { Alert } from "react-native";

const image = require("../../assets/MootsIcon.png")

export default function Login({ navigation }) {
  const {setAutentication} = useAuthContext()
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
    
  const handleSubmit = async () => {
      try {
          const dado = await usuarioLogin.post("", {
              email : email,
              senha : senha
          });
          const res = await dado.data;
          if(res){
            await AsyncStorage.setItem('token', res.token);
            await AsyncStorage.setItem('email', res.login);
            await AsyncStorage.setItem('id', String(res.id));
            const auth = await AsyncStorage.setItem('autentication', String(true));
            setAutentication(auth)
          }
          else throw new Error("Não foi possível realizar a autenticação. Tente novamente.")
      } catch (error: any) {
        Alert.alert('Erro', error.response.data.error)
    }
  };

  useEffect(()=>{
    async()=> alert(await AsyncStorage.getItem('autentication'))
  }, [])

  return (
    <LinearGradientMoots display="flex" justifyContent="flex-end" w="100%" h="100%">
      <StatusBar translucent={true}/>
      <Box display="flex" alignItems="center" h="40%" justifyContent="center">
        <Image source={image} alt='logo' w={200} h={200}/>
      </Box>
      <Box bg="white" borderTopLeftRadius={50} borderTopRightRadius={50} width="100%" height="50%" alignItems="center">
        <Titulo mt={5} fontSize={20}>Comece a aproveitar.</Titulo>

        <Box alignItems="center" w="85%">
            <FormControlInput label="Email" loginOuCadastro={true} onChange={(text) => setEmail(text)}/>
            <Box flexDirection="row" justifyContent="center" mt={2.5} mb={2.5}>
              <TextoNegrito>Não tem uma conta? </TextoNegrito>
              <TouchableOpacity onPress={() => {navigation.navigate("cadastro")}}>
                <TextoNegrito color="$lightSete">Realizar cadastro</TextoNegrito>
              </TouchableOpacity>
            </Box>

            <FormControlInput label="Senha" loginOuCadastro={true} onChange={(text) => setSenha(text)} secureTextEntry={true}/>
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