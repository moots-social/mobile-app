import {Box, FormControl, Image, Input, ScrollView, Text, VStack, useToast } from "@gluestack-ui/themed";
import { useRef, useState } from "react";
import { TextoNegrito, Titulo } from "../../components/geral/Texto";
import { styled } from "@gluestack-style/react";
import LinearGradientMoots from "../../components/geral/LinearGradientMoots";
import BotaoSecao from "../../components/botao/BotaoSecao";
import { buscarEmail } from "../../utils/usuarioUtils";
import { abrirToast } from "../../components/geral/ToastMoots";

const image = require("../../assets/MootsIcon.png");

export const StyledVStack = styled(VStack, {
  display: "flex",
  justifyContent: "flex-end",
  width: "100%",
  height: "100%",
});

export const StyledShadowBox = styled(Box, {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
  borderRadius: 30,
  overflow: "hidden",
});

export default function Cadastro({ navigation }) {
  const toast = useToast()
  const [sessao, setSessao] = useState({ email: "", senha: "" });
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const inputEmail = useRef(null)
  const inputSenha = useRef(null)
  const inputConfirmar = useRef(null)

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNextInput = (nextRef) => {
    if (nextRef.current) {
      nextRef.current.focus();
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    
    try {
      // Validação do email
      if (!validateEmail(sessao.email)) {
        abrirToast(toast, 'error', 'Insira um email válido.', '', 1000, false)
        return; // Para a execução se o email não for válido
      }

      if (sessao.email === "" || sessao.senha === "" || confirmarSenha === "") {
        abrirToast(toast, 'error', 'Todos os campos precisam ser preenchidos.', '', 1000, false)
      } else if (sessao.senha !== confirmarSenha) {
        abrirToast(toast, 'error', 'As senhas não correspondem.', '', 1000, false)
      } else if (sessao.senha.length < 8){
        abrirToast(toast, 'error', 'Sua senha deve ter, no mínimo, oito caracteres.', '', 1000, false)
      }else {

        const dado = await buscarEmail(sessao.email);
        if (dado != 409) {
          abrirToast(toast, 'error', 'Esse email já está sendo utilizado. Tente com outro email.', '', 1000, false)
          setSessao({ ...sessao, email: "" });
        } else{
          navigation.navigate("info", { sessao }); // Navega para a tela de info
        }
      }
    } catch (error) {
        abrirToast(toast, 'error', 'Não foi possível continuar com o cadastro. Tente novamente mais tarde.', '', 1000, false)
    }
  };

  return (
  <ScrollView>

    <Box flex={1}>
      <LinearGradientMoots>
        <StyledVStack>
          <Box display="flex" alignItems="center" $base-my={70} $md-my={120}>
            <Image source={image} $base-w={200} $md-w={400} $base-h={200} $md-h={400}/>
          </Box>

          <Box bg="white" borderTopLeftRadius={50} borderTopRightRadius={50} $md-h={600} $base-h={500} alignItems="center">
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
                    ref={inputEmail}
                    borderRadius={30}
                    fontFamily="Poppins_500Medium"
                    bg="#FFFFFF"
                    onSubmitEditing={() => handleNextInput(inputSenha)}
                    onChangeText={(text) => setSessao({ ...sessao, email: text })}
                    />
                </StyledShadowBox>

                <FormControl.Label ml={2} mt={3}>
                  <Text color="#7D7D7D" fontFamily="Poppins_600SemiBold">
                    Senha
                  </Text>
                </FormControl.Label>
                <StyledShadowBox>
                  <Input
                    ref={inputSenha}
                    borderRadius={30}
                    fontFamily="Poppins_500Medium"
                    bg="#FFFFFF"
                    onSubmitEditing={() => handleNextInput(inputConfirmar)}
                    secureTextEntry={true}
                    onChangeText={(text) => setSessao({ ...sessao, senha: text })}
                    />    
                </StyledShadowBox>

                <FormControl.Label ml={2} mt={3}>
                  <Text color="#7D7D7D" fontFamily="Poppins_600SemiBold">
                    Confirmar a senha
                  </Text>
                </FormControl.Label>
                <StyledShadowBox>
                  <Input
                    ref={inputConfirmar}
                    borderRadius={30}
                    fontFamily="Poppins_500Medium"
                    bg="#FFFFFF"
                    secureTextEntry={true}
                    onChangeText={(text) => setConfirmarSenha(text)}
                    onSubmitEditing={()=> handleSubmit()}
                    />
                </StyledShadowBox>
              </FormControl>
              
              <Box flexDirection="row" mt={2.5} mb={65}>
                <TextoNegrito>Já tem uma conta? </TextoNegrito>
                <TextoNegrito color="#468B51" onPress={() => navigation.navigate('login')}>Realizar login</TextoNegrito>
              </Box>
            </Box>

            <Box alignItems="center" w="100%" mb={160}>
              <BotaoSecao onPress={() => handleSubmit()}>
                Confirmar
              </BotaoSecao>
            </Box>
          </Box>
        </StyledVStack>
      </LinearGradientMoots>
    </Box>
  </ScrollView>
  );
}