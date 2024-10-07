import { Box,  FormControl,  Image,  Input,  Link,  Text,  VStack} from "@gluestack-ui/themed-native-base";
import { styled } from "@gluestack-style/react";
import { ButtonText, Button } from "@gluestack-ui/themed";
import { Titulo, TextoNegrito } from "../../components/Texto";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { usuarioLogin } from "../../api/apis";
import axios from "axios";


const StyledVStack = styled(VStack, {
  display: "flex",
  justifyContent: "flex-end",
  bg: "$darkCinco",
  width: "100%",
  height: "100%",
});

export default function Login({ navigation }) {
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [resp, setResp] = useState<string>("");
  
  const handleSubmit = async () => {
    try {
        const dado = await usuarioLogin.post("", {
            email : email,
            senha : senha
        });

        const res = await dado.data;
        
        if(res)
          setResp("login feito com sucesso" + res.token);
        else{
          setResp("deu certo nao boy")
        }
    } catch (error) {
      console.error("Erro no login:", error);
      setResp("Erro ao realizar login");
  }
};

  return (
    <StyledVStack>
      <Box bg="white" borderTopLeftRadius={50} borderTopRightRadius={50} width="100%" height="50%" alignItems="center">
        <Titulo mt={5} mg={5}> Realize o login e aproveite</Titulo>

        <Text>{resp}</Text>

        <Box alignItems="center" mb={30} w="80%">
          <FormControl w="100%">
            <Input  placeholder="Digite seu email"  borderRadius={30}  textAlign="center"  fontFamily="Poppins_500Medium" onChange={(text) => setEmail(text)}/>

            <Box flexDirection="row" mt={5} mb={5}>
              <TextoNegrito>Não tem uma conta? </TextoNegrito>
              <TouchableOpacity onPress={() => {navigation.navigate("cadastro")}}>
                <TextoNegrito color="#AF75BF">Realizar caddastro</TextoNegrito>
              </TouchableOpacity>
            </Box>

            <Input  placeholder="Digite sua senha"  borderRadius={30}  textAlign="center"  fontFamily="Poppins_500Medium" onChange={(text) => setSenha(text)}/>
            <Box flexDirection="row" mt={5} mb={5}>
              <TextoNegrito>Esqueceu sua senha?</TextoNegrito>
              <TouchableOpacity onPress={() => {navigation.navigate("cadastro")}}>
                <TextoNegrito color="#AF75BF">Redefinir senha</TextoNegrito>
              </TouchableOpacity>
            </Box>
          </FormControl>
        </Box>

        <Box alignItems="center" w="80%">
          
          <Button  w="100%" borderStyled="solid"  borderWidth={1}  borderColor="black"  bg="#AF75BFBA"  h={50}  borderRadius={40}
          onPress={() => handleSubmit()}>
            <ButtonText fontFamily="Poppins_700Bold">Iniciar Sessão</ButtonText>
          </Button>
        </Box>
      </Box>
    </StyledVStack>
  );
}
