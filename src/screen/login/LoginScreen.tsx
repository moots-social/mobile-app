import { Box, Image } from "@gluestack-ui/themed-native-base";
import { Titulo, TextoNegrito } from "../../components/geral/Texto";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import BotaoSecao from "../../components/botao/BotaoSecao";
import LinearGradientMoots from "../../components/geral/LinearGradientMoots";
import FormControlInput from "../../components/geral/FormControlInput";
import { useAuthContext } from "../../context/AuthContext";
import { login } from "../../utils/usuarioUtils";
import { getAnyItemStorage } from "../../utils/storageUtils";
import { ScrollView, useToast } from "@gluestack-ui/themed";
import { abrirToast} from "../../components/geral/ToastMoots";
import { useDispatch, useSelector } from "react-redux";
import { autenticar } from "../../redux/useAutenticacao";
import * as NavigationBar from 'expo-navigation-bar'
const image = require("../../assets/MootsIcon.png")

export default function Login({ navigation }) {
  const toast = useToast()
  const dispatch = useDispatch()
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  
  const inputEmail = useRef(null)
  const inputSenha = useRef(null)
  const handleSubmit = async () => {
    if(email!=='' && senha !==''){
      const res = await login(email, senha)
      if(res!=='Autenticado com sucesso.'){
        abrirToast(toast, 'error', 'Email ou senha incorretos. Tente novamente.', '', 1500, false)
      }else{
        abrirToast(toast, 'success', 'Autenticado com sucesso. Entrando...', '', 800, false)
        dispatch(autenticar())
      }
    } else abrirToast(toast, 'error', 'Ambos os campos precisam ser preenchidos.', '', 1000, false)
  };

  const handleNextInput = (nextRef) => {
    if (nextRef.current) {
      nextRef.current.focus();
    } else {
      handleSubmit();
    }
  };
  useEffect(()=>{
    NavigationBar.setBackgroundColorAsync('white')
  }, [])
  return (
    <LinearGradientMoots>
      <ScrollView>
        <StatusBar translucent={true}/>
          <Box flex={1}>

            <Box display="flex" alignItems="center" justifyContent="center" $base-my={80} $md-my={120}>
              <Image source={image} alt='logo' $base-w={200} $md-w={400} $base-h={200} $md-h={400}/>
            </Box>
            <Box display="flex" bg='$white' $md-h={600} $base-h={500} alignItems="center" borderTopLeftRadius={50} borderTopRightRadius={50}>

              <Titulo mt={5} fontSize={20}>Comece a aproveitar.</Titulo>

              <Box alignItems="center" w="85%">
                  <FormControlInput inputRef={inputEmail} label="Email" loginOuCadastro={true} onChange={(text) => setEmail(text)} onSubmitEditing={()=>handleNextInput(inputSenha)}/>
                  <Box flexDirection="row" justifyContent="center" mt={2.5} mb={2.5}>
                    <TextoNegrito>Não tem uma conta? </TextoNegrito>
                    <TouchableOpacity onPress={() => {navigation.navigate("cadastro")}}>
                      <TextoNegrito color="$lightSete">Realizar cadastro</TextoNegrito>
                    </TouchableOpacity>
                  </Box>

                  <FormControlInput inputRef={inputSenha} label="Senha" loginOuCadastro={true} onChange={(text) => setSenha(text)} onSubmitEditing={()=>handleSubmit()} secureTextEntry={true}/>
                  <Box flexDirection="row" justifyContent="center" mt={2.5} $base-mb='$20' $md-mb='$48' >
                    <TextoNegrito>Esqueceu sua senha? </TextoNegrito>
                    <TouchableOpacity onPress={() => {navigation.navigate("cadastro")}}>
                      <TextoNegrito color="$lightSete">Redefinir senha</TextoNegrito>
                    </TouchableOpacity>
                  </Box>
              </Box>

                <BotaoSecao w="80%" $md-h={60} onPress={() => handleSubmit()}>
                    Confirmar
                </BotaoSecao>
          </Box>
        </Box>
      </ScrollView>
    </LinearGradientMoots >
)}