import { Box, FormControl, Input, Text, VStack } from "@gluestack-ui/themed-native-base";
import React from "react";
import { styled } from "@gluestack-style/react";
import { ButtonText, Button } from "@gluestack-ui/themed";
import { Titulo, Texto, TextoNegrito } from "../../components/Texto";

const StyledVStack = styled(VStack, {
  display: "flex",
  justifyContent: "flex-end",
  bg: "$darkCinco",
  width: '100%',
  height: "100%"
}); 

const Input1 = styled(Input, {
  borderTopLeftRadius: ({borderRadius})=> borderRadius || 50,
  borderTopRightRadius: ({borderRadius}) => borderRadius || 50,
  borderBottomLeftRadius: ({borderRadius}) => borderRadius || 50,
  borderBottomRightRadius: ({borderRadius}) => borderRadius || 50,
});

export default function Login() {
  
  return (
    <StyledVStack>
      <Box bg="white" borderTopLeftRadius={50} borderTopRightRadius={50} width="100%" height="50%" alignItems="center">
        <Titulo mt={5} mg={5}>Realize o login e aproveite</Titulo>

        <FormControl w="80%">
          <Input1 placeholder="Digite seu email" borderRadius={30} textAlign="center"/>

          <TextoNegrito mt={5} mb={5}>Não tem uma conta? <Text color='#AF75BF'>Cadastre-se</Text> </TextoNegrito >

          <Input1 placeholder="Digite sua senha" borderRadius={30} textAlign="center" p={5}/>

          <TextoNegrito mt={5} mb={5}>Esqueceu sua senha? <Text color='#AF75BF'>Clique aqui</Text> </TextoNegrito>
        </FormControl>

        <Button>
          <ButtonText>Iniciar Sessão</ButtonText>
        </Button>

      </Box>
    </StyledVStack>
  );
}
