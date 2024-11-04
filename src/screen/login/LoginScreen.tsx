import { Box, Image } from "@gluestack-ui/themed-native-base";
import { Titulo, TextoNegrito } from "../../components/geral/Texto";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import BotaoSecao from "../../components/botao/BotaoSecao";
import LinearGradientMoots from "../../components/geral/LinearGradientMoots";
import FormControlInput from "../../components/geral/FormControlInput";
import { useAuthContext } from "../../context/AuthContext";
import { login } from "../../utils/usuarioUtils";
import { getAnyItemStorage } from "../../utils/storageUtils";
import { ScrollView } from "@gluestack-ui/themed";

const image = require("../../assets/MootsIcon.png")

export default function Login({ navigation }) {
  const {setAuth} = useAuthContext()
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");

  const inputEmail = useRef(null)
  const inputSenha = useRef(null)
  const handleSubmit = async () => {
      await login(email, senha)
      setAuth(await getAnyItemStorage('auth'))
  };

  const handleNextInput = (nextRef) => {
    if (nextRef.current) {
      nextRef.current.focus();
    } else {
      handleSubmit();
    }
  };
  return (
    <LinearGradientMoots>
      <ScrollView>
        <StatusBar translucent={true}/>
          <Box flex={1} justifyContent="space-between">

            <Box display="flex" alignItems="center" h="40%" justifyContent="center">
              <Image source={image} alt='logo' w={200} h={200}/>
            </Box>
            <Box display="flex" bg='$white' h="60%" alignItems="center" mb={190} borderTopLeftRadius={50} borderTopRightRadius={50}>

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
                  <Box flexDirection="row" justifyContent="center" mt={2.5} mb='$20'>
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
        </Box>
      </ScrollView>
    </LinearGradientMoots >
)}