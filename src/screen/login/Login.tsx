import { usuarioLogin } from "../../api/apis";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Box, Image } from "@gluestack-ui/themed-native-base";
import { Titulo, TextoNegrito } from "../../components/Texto";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import BotaoSecao from "../../components/BotaoSecao";
import LinearGradientMoots from "../../components/LinearGradientMoots";
import FormControlInput from "../../components/FormControlInput";
import { ModalConfirmar } from "../../components/AlertDialogMoots";
import { CommonActions } from '@react-navigation/native';

const image = require("../../assets/MootsIcon.png")

export default function Login({ navigation }) {
  const ref = useRef(null)

  const [errorDialog, setErrorDialog] = useState(false)
  const [textoDialog, setTextoDialog] = useState('')
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
            AsyncStorage.setItem('token', res.token);
            AsyncStorage.setItem('email', res.login);
            AsyncStorage.setItem('autentication', String(true));

            // Use reset para limpar a pilha e ir para a tela de tabs
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'tabs' }],
              })
            );
          }
          else{
            setTextoDialog("Não foi possível realizar a autenticação. Tente novamente.")
            setErrorDialog(true)
          }

      } catch (error: any) {
        setTextoDialog(error.response.data.error)
        setErrorDialog(true)
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
      <ModalConfirmar titulo="Autenticação inválida" isOpen={errorDialog} onClose={()=>setErrorDialog(false)} finalFocusRef={ref}>
        {textoDialog}
      </ModalConfirmar>
    </LinearGradientMoots >
)}