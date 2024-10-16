import { Box,  FormControl,  Image,  Input,  Link,  Text,  VStack} from "@gluestack-ui/themed-native-base";
import { styled } from "@gluestack-style/react";
import { ButtonText, Button } from "@gluestack-ui/themed";
import { Titulo, TextoNegrito } from "../../components/Texto";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import BotaoSecao from "../../components/BotaoSecao";
import LinearGradientMoots from "../../components/LinearGradientMoots";
import FormControlInput from "../../components/FormControlInput";
import { ActivityIndicator } from 'react-native'

const image = require("../../assets/MootsIcon.png")

export default function Login({ navigation }) {
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [resp, setResp] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = () =>{
    setIsLoading(true)
    setTimeout(()=>{
      navigation.navigate('tabs')
    }, 1000)
  }

  return (
    <LinearGradientMoots display="flex" justifyContent="flex-end" w="100%" h="100%">
      <StatusBar translucent={true}/>
      <Box display="flex" alignItems="center" h="40%" justifyContent="center">
        <Image source={image} w={200} h={200}/>
      </Box>
      <Box bg="white" borderTopLeftRadius={50} borderTopRightRadius={50} width="100%" height="50%" alignItems="center">
        <Titulo mt={5} fontSize={20}> Comece a aproveitar.</Titulo>

        <Box alignItems="center" w="85%">
            <FormControlInput label="Email" loginOuCadastro={true}/>
            <Box flexDirection="row" justifyContent="center" mt={2.5} mb={2.5}>
              <TextoNegrito>Não tem uma conta? </TextoNegrito>
              <TouchableOpacity onPress={() => {navigation.navigate("cadastro")}}>
                <TextoNegrito color="$lightSete">Realizar cadastro</TextoNegrito>
              </TouchableOpacity>
            </Box>

            <FormControlInput label="Senha" loginOuCadastro={true}/>
            <Box flexDirection="row" justifyContent="center" mt={2.5} mb={30}>
              <TextoNegrito>Esqueceu sua senha? </TextoNegrito>
              <TouchableOpacity onPress={() => {navigation.navigate("cadastro")}}>
                <TextoNegrito color="$lightSete">Redefinir senha</TextoNegrito>
              </TouchableOpacity>
            </Box>
        </Box>

        <Box alignItems="center" w="80%">
          {!isLoading ?(<BotaoSecao w="100%" onPress={handleSubmit}>
              Confirmar
          </BotaoSecao>) : <ActivityIndicator color="#468B51"/>}
        </Box>
      </Box>
    </LinearGradientMoots >
  );
}
