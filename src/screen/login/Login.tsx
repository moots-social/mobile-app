import { Box,  FormControl,  Image,  Input,  Link,  Text,  VStack} from "@gluestack-ui/themed-native-base";
import { styled } from "@gluestack-style/react";
import { ButtonText, Button } from "@gluestack-ui/themed";
import { Titulo, TextoNegrito } from "../../components/Texto";
import { TouchableOpacity } from "react-native-gesture-handler";

const StyledVStack = styled(VStack, {
  display: "flex",
  justifyContent: "flex-end",
  bg: "$darkCinco",
  width: "100%",
  height: "100%",
});

export default function Login({ navigation }) {
  return (
    <StyledVStack>
      <Box bg="white" borderTopLeftRadius={50} borderTopRightRadius={50} width="100%" height="50%" alignItems="center">
        <Titulo mt={5} mg={5}> Realize o login e aproveite</Titulo>

        <Box alignItems="center" mb={30} w="80%">
          <FormControl w="100%">
            <Input  placeholder="Digite seu email"  borderRadius={30}  textAlign="center"  fontFamily="Poppins_500Medium"/>

            <Box flexDirection="row" mt={5} mb={5}>
              <TextoNegrito>Não tem uma conta? </TextoNegrito>
              <TouchableOpacity onPress={() => {navigation.navigate("cadastro")}}>
                <TextoNegrito color="#AF75BF">Realizar cadastro</TextoNegrito>
              </TouchableOpacity>
            </Box>

            <Input  placeholder="Digite sua senha"  borderRadius={30}  textAlign="center"  fontFamily="Poppins_500Medium"/>

            <Box flexDirection="row" mt={5} mb={5}>
              <TextoNegrito>Esqueceu sua senha? </TextoNegrito>
              <TouchableOpacity onPress={() => {navigation.navigate("cadastro")}}>
                <TextoNegrito color="#AF75BF">Redefinir senha</TextoNegrito>
              </TouchableOpacity>
            </Box>
          </FormControl>
        </Box>

        <Box alignItems="center" w="80%">
          <Button  w="100%" borderStyled="solid"  borderWidth={1}  borderColor="black"  bg="#AF75BFBA"  h={50}  borderRadius={40}>
            <ButtonText fontFamily="Poppins_700Bold">Iniciar Sessão</ButtonText>
          </Button>
        </Box>
      </Box>
    </StyledVStack>
  );
}
