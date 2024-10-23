import { usuarioLogin } from "../../api/apis";
import SyncStorage from '@react-native-async-storage/async-storage';
import { Box,  FormControl,  Image,  Input,  Link,  Text,  VStack} from "@gluestack-ui/themed-native-base";
import { styled } from "@gluestack-style/react";
import { ButtonText, Button } from "@gluestack-ui/themed";
import { Titulo, TextoNegrito } from "../../components/Texto";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import BotaoSecao from "../../components/BotaoSecao";
import LinearGradientMoots from "../../components/LinearGradientMoots";
import FormControlInput from "../../components/FormControlInput";
import { ActivityIndicator } from 'react-native'
import { ModalConfirmar } from "../../components/AlertDialogMoots";

const image = require("../../assets/MootsIcon.png")

export default function Login({ navigation }) {
  const ref = useRef(null)

  const [errorDialog, setErrorDialog] = useState(false)

  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
    
  const handleSubmit = async () => {
      try {
          const dado = await usuarioLogin.post("", {
              email : email,
              senha : senha
          });
          const res = await dado.data;
          
          if(res.token){
            SyncStorage.setItem('token', res.token);
            navigation.navigate("tabs")
          }
          else{
            alert("deu certo nao boy")
          }

      } catch (error: any) {
        alert(error.response.data.error)
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
            <FormControlInput label="Email" loginOuCadastro={true} onChange={(text) => setEmail(text)}/>
            <Box flexDirection="row" justifyContent="center" mt={2.5} mb={2.5}>
              <TextoNegrito>Não tem uma conta? </TextoNegrito>
              <TouchableOpacity onPress={() => {navigation.navigate("cadastro")}}>
                <TextoNegrito color="$lightSete">Realizar cadastro</TextoNegrito>
              </TouchableOpacity>
            </Box>

            <FormControlInput label="Senha" loginOuCadastro={true} onChange={(text) => setSenha(text)}/>
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
      <ModalConfirmar titulo="Autenticação inválida" isOpen={errorDialog} onClose={()=>setErrorDialog(false)} finalFocusRef={ref}>
        Seu email ou senha estão incorretos. Tente novamente.
      </ModalConfirmar>
    </LinearGradientMoots >
)}