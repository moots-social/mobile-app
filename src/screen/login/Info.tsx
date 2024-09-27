import { VStack, Text, Box } from "@gluestack-ui/themed-native-base";
import { LinearGradient } from "expo-linear-gradient";
import { StyledVStack } from "./Cadastro";
import { Button, ButtonText } from "@gluestack-ui/themed";
import { useState } from "react";
import { TextoNegrito } from "../../components/Texto";

const secoes = [
  {
    id: 1,
    title: "Vamos começar.",
    subTitle: "Como as pessoas vão te chamar?",
    label: "",
    labelTwo: "",
    describe: ""
  },
  {
    id: 2,
    title: "Vai uma foto aí?",
    subTitle: "Você pode pular essa parte se desejar.", 
    image: "",
    buttonText: "",
    pular: ""
  },  
  {
    id: 3,
    title: "O que você estuda?",
    subTitle: "Só mais um pouquinho.", 
    image: "",
    describe: "",
    picking: {
      dev: "desenvolvimento",
      qual: "qualidade",
      fic: "fic",
      mec: "mecanica"
    }
  }
]

export default function Info({navigation}){
    const imagem = require("../../assets/userDefault.png");
    const [numSecao, setNumSecao] = useState(0);

    function avancarSecao() {
      if (numSecao < secoes.length - 1) 
        setNumSecao(numSecao + 1);
    }

    function voltarSecao() {
      if (numSecao > 0) setNumSecao(numSecao - 1);
    }

    return (
      <Box flex={1}>
        <LinearGradient
          colors={["#FFFABB", "#E0F5FF", "#F4E5FF", "#E2FCFF"]}
          locations={[0, 0.3856, 0.6845, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }} // ajuste conforme necessário
          style={{ flex: 1 }}
        >
          <Box borderColor="black" borderWidth={2} h="30%" alignItems="center">
            <TextoNegrito fontSize={32} paddingVertical={5} mt={4}>
              {secoes[numSecao].title}
            </TextoNegrito>

            <TextoNegrito fontSize={20}>
              {secoes[numSecao].subTitle}
            </TextoNegrito>
          </Box>

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
                  onPress={() => avancarSecao()}
                >
                  <ButtonText fontFamily="Poppins_700Bold">
                    Confirmar
                  </ButtonText>
                </Button>
              </Box>
              
            </Box>''
          </VStack>
        </LinearGradient>
      </Box>
    );
}