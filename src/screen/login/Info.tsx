import { VStack, Text, Box, FormControl, Input } from "@gluestack-ui/themed-native-base";
import { LinearGradient } from "expo-linear-gradient";
import { StyledVStack } from "./Cadastro";
import { Button, ButtonText } from "@gluestack-ui/themed";
import { useState } from "react";
import { TextoNegrito } from "../../components/Texto";
import BotaoSecao from "../../components/BotaoSecao";
import LinearGradientMoots from "../../components/LinearGradientMoots";
import FormControlInput from "../../components/FormControlInput";

const imagemPerfil = require("../../assets/userDefault.png");
const imagemCurso = require("../../assets/vectorizedDesenvolvimento.png")

const secoes = [
  {
    id: 1,
    title: "Vamos começar.",
    subTitle: "Como as pessoas vão te chamar?",
    nameTag: [
      {
        label: "Nome de Exibição",
        labelTwo: "Tag de usuário",
        describe: "As pessoas também vão usar sua tag para te encontrar"
      }
    ]
  },
  {
    id: 2,
    title: "Vai uma foto aí?",
    subTitle: "Você pode pular essa parte se desejar.", 
    perfil: [
      {
        image: imagemPerfil,
        buttonText: "Adicionar foto"
      }
    ]
  },  
  {
    id: 3,
    title: "O que você estuda?",
    subTitle: "Só mais um pouquinho.", 
    curso:[
      {
        image: imagemCurso,
        describe: "Seu curso",
        picking: {
          dev: "desenvolvimento",
          qual: "qualidade",
          fic: "fic",
          mec: "mecanica"
        }
      }
    ]

  }
]

export default function Info({navigation}){
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
        <LinearGradientMoots>

          {/* primeiro bloco */}
          <Box  h="30%" alignItems="center" mt={5}>
            <TextoNegrito fontSize={32} paddingVertical={5} mt={4}>
              {secoes[numSecao].title}
            </TextoNegrito>

            <TextoNegrito fontSize={20} textAlign="center">
              {secoes[numSecao].subTitle}
            </TextoNegrito>
          </Box>

          <VStack h="70%">
            {/* segundo bloco */}

          <Box alignItems="center" h="70%">
            {secoes[numSecao]?.nameTag?.map((obj) => (
              <Box alignItems="center" justifyContent="center" h="100%" w="90%">
                  <FormControlInput label={obj.label} mb={5}/>

                  <FormControlInput label={obj.labelTwo} mb={3}/>
                  <TextoNegrito fontSize={12}>{obj.describe}</TextoNegrito>
              </Box>
            ))}

            {secoes[numSecao]?.perfil?.map((obj) => (
              <Box borderColor="blue" borderWidth={2} h="70%" alignItems="center">
                  <Text>eu amo</Text>
              </Box>
            ))}

            {secoes[numSecao]?.curso?.map((obj) => (
              <Box borderColor="blue" borderWidth={2} h="70%" alignItems="center">
                  <Text>naruto</Text>
              </Box>
            ))}
          </Box>

          {/* terceiro bloco */}

            <Box  h="30%" justifyContent="center">
              <Box w="100%" alignItems="center">
                <BotaoSecao onPress={() => avancarSecao()}>
                  {numSecao == 0 || numSecao == 1 ?
                    "Continuar"
                  :
                    "Confirmar"
                  }
                </BotaoSecao>

                {numSecao > 0 && <TextoNegrito color="#468B51" mt={3} onPress={() => voltarSecao()}>Voltar</TextoNegrito>}
              </Box>
              
            </Box>
          </VStack>
        </LinearGradientMoots>
      </Box>
    );
}