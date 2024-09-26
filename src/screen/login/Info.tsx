import { VStack, Text, Box } from "@gluestack-ui/themed-native-base";
import { LinearGradient } from "expo-linear-gradient";
import { StyledVStack } from "./Cadastro";
import { Button, ButtonText } from "@gluestack-ui/themed";

export default function Info(){
    return (
      <Box flex={1}>
        <LinearGradient
          colors={["#FFFABB", "#E0F5FF", "#F4E5FF", "#E2FCFF"]}
          locations={[0, 0.3856, 0.6845, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }} // ajuste conforme necessário
          style={{ flex: 1 }}
        >
          <Box borderColor="black" borderWidth={2} h="30%"></Box>

          <VStack borderColor="black" borderWidth={2} h="70%">
            <Box borderColor="blue" borderWidth={2} h="70%">
              <Text>oi</Text>
            </Box>

            <Box borderColor="blue" borderWidth={2} h="30%" justifyContent="center">
              <Box w="100%" alignItems="center">
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
                  onPress={() => navigation.navigate("info")}
                >
                  <ButtonText fontFamily="Poppins_700Bold">
                    Confirmar
                  </ButtonText>
                </Button>
              </Box>
              
            </Box>
          </VStack>
        </LinearGradient>
      </Box>
    );
}