import { Box, FormControl, Image, Input, ScrollView, Text, VStack,} from "@gluestack-ui/themed-native-base";
import { styled } from "@gluestack-style/react";
import { LinearGradient } from "expo-linear-gradient";
import { TextoNegrito, Titulo } from "../../components/Texto";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ButtonText, Button } from "@gluestack-ui/themed";
import LinearGradientMoots from "../../components/LinearGradientMoots";
import BotaoSecao from "../../components/BotaoSecao";
import { useState } from "react";
import { usuarioApi } from "../../api/apis";

const image = require("../../assets/vectorizedGreenAttempt.png");

export const StyledVStack = styled(VStack, {
  display: "flex",
  justifyContent: "flex-end",
  width: "100%",
  height: "100%",
});

export const StyledShadowBox = styled(Box, {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25, // 40% de opacidade
    shadowRadius: 4,
    elevation: 5, // Para Android
    borderRadius: 30, // Para manter a borda arredondada
    overflow: "hidden", // Para que o Input fique dentro da borda arredondada
});

export default function Cadastro({ navigation }) {
  const [sessao, setSessao] = useState({email: "", senha: ""});
  const [confirmarSenha, setConfirmarSenha] = useState("");
  
  const handleSubmit = async () => {
    if (sessao.email === "" || sessao.senha === "" || confirmarSenha === "") {
      alert("por favor, preencha todos os campos");
    } else if (sessao.senha !== confirmarSenha) {
      alert("senha está incorreta");
    } else {
      try {
        const dado = await usuarioApi.get(`/buscarEmail?email=${sessao.email}`);
        const res = dado.data;
  
        if (res) {
          console.log(res)
          alert("este email já está em uso");
          setSessao({...sessao, email: ""})
        }
      } catch (error: any) {
        alert(error.response.data.error);
        navigation.navigate("info", { sessao }); // Navega para a tela de info
      }
    }
  };
  

  return (
    <Box flex={1}>
      <LinearGradientMoots>
        <StyledVStack>
         <Box display="flex" alignItems="center" h="40%" justifyContent="center">
         <Image source={image} h={200} w={200}/>
         </Box>

          <Box
            bg="white"
            borderTopLeftRadius={50}
            borderTopRightRadius={50}
            width="100%"
            height="60%"
            alignItems="center"
          >
            <Titulo mt={5} fontSize={20}>
              Faça parte agora.
            </Titulo>
            
            <Box alignItems="center" w="85%">
              <FormControl w="100%">
                <FormControl.Label>
                  <Text color="#7D7D7D" fontFamily="Poppins_600SemiBold">
                    Email
                  </Text>
                </FormControl.Label>
                <StyledShadowBox>

                <Input
                  borderRadius={30}
                  fontFamily="Poppins_500Medium"
                  bg="#FFFFFF"
                  onChange = {(text) => setSessao({...sessao, email: text})}
                />
                </StyledShadowBox>

                <FormControl.Label ml={2} mt={3}>
                  <Text color="#7D7D7D" fontFamily="Poppins_600SemiBold">
                    Senha
                  </Text>
                </FormControl.Label>
                <StyledShadowBox>
                  <Input
                    borderRadius={30}
                    fontFamily="Poppins_500Medium"
                    bg="#FFFFFF"
                    secureTextEntry={true}
                    onChange = {(text) => setSessao({...sessao, senha: text})}
                  />    
                </StyledShadowBox>

                <FormControl.Label ml={2} mt={3}>
                  <Text color="#7D7D7D" fontFamily="Poppins_600SemiBold">
                    Confirmar a senha
                  </Text>
                </FormControl.Label>
                <StyledShadowBox>

                <Input
                  borderRadius={30}
                  fontFamily="Poppins_500Medium"
                  bg="#FFFFFF"
                  secureTextEntry={true}
                  onChange = {(text) => setConfirmarSenha(text)}
                />
                </StyledShadowBox>
              </FormControl>
              
              <Box flexDirection="row" mt={2.5} mb={65}>
                <TextoNegrito>Já tem uma conta? </TextoNegrito>
                <TextoNegrito color="#468B51" onPress={()=>navigation.navigate('login')}>Realizar login</TextoNegrito>
              </Box>
            </Box>

            <Box alignItems="center" w="100%">
              <BotaoSecao onPress={() => handleSubmit()}>
                Confirmar
              </BotaoSecao>
            </Box>
          </Box>
        </StyledVStack>
      </LinearGradientMoots>
    </Box>
  );
}
