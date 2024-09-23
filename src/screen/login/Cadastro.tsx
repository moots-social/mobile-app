import { Box, FormControl, Image, Input, ScrollView, Text, VStack,} from "@gluestack-ui/themed-native-base";
import { styled } from "@gluestack-style/react";
import { LinearGradient as ExpoLinearGradient } from "expo-linear-gradient";
import { TextoNegrito, Titulo } from "../../components/Texto";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ButtonText, Button } from "@gluestack-ui/themed";

const image = require("../../assets/vectorizedGreenAttempt.png");

const StyledVStack = styled(VStack, {
  display: "flex",
  justifyContent: "flex-end",
  width: "100%",
  height: "100%",
});

const StyledShadowBox = styled(Box, {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25, // 40% de opacidade
    shadowRadius: 4,
    elevation: 5, // Para Android
    borderRadius: 30, // Para manter a borda arredondada
    overflow: "hidden", // Para que o Input fique dentro da borda arredondada
});

export default function Cadastro() {
  return (
    <Box flex={1}>
      <ExpoLinearGradient
        colors={["#FFFABB", "#E0F5FF", "#F4E5FF", "#E2FCFF"]}
        locations={[0, 0.3856, 0.6845, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }} // ajuste conforme necessário
        style={{ flex: 1 }}
      >
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
            <Titulo mt={5} mg={5}>
              Faça parte agora.
            </Titulo>
            <Box alignItems="center" w="80%">
              <FormControl w="100%">
                <FormControl.Label ml={2} mt={3}>
                  <Text color="#7D7D7D" fontFamily="Poppins_600SemiBold">
                    Email
                  </Text>
                </FormControl.Label>
                <StyledShadowBox>

                <Input
                  borderRadius={30}
                  fontFamily="Poppins_500Medium"
                  bg="#FFFFFF"
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
                />
                </StyledShadowBox>
              </FormControl>
              
              <Box flexDirection="row" mt="5" mb="5">
                <TextoNegrito>Já tem uma conta?</TextoNegrito>
                <TextoNegrito color="#468B51"> Realizar login</TextoNegrito>
              </Box>
            </Box>

            <Box alignItems="center" w="100%">
              <Button
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                  elevation: 5,
                }}
                w="80%"
                h={50}
                borderStyled="solid"
                borderWidth={3}
                borderColor="#fff"
                bg="#468B51"
                borderRadius={15}
                >
                <ButtonText fontFamily="Poppins_700Bold">Confirmar</ButtonText>
              </Button>
            </Box>
          </Box>
        </StyledVStack>
      </ExpoLinearGradient>
    </Box>
  );
}
