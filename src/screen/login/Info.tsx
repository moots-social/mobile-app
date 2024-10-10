import { VStack, Text, Box, FormControl, Input, Image } from "@gluestack-ui/themed-native-base";
import { LinearGradient } from "expo-linear-gradient";
import { AlertCircleIcon, Button, ButtonText, ChevronDownIcon, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlLabel, FormControlLabelText, Icon, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger, styled } from "@gluestack-ui/themed";
import { useState } from "react";
import { TextoNegrito } from "../../components/Texto";
import BotaoSecao from "../../components/BotaoSecao";
import LinearGradientMoots from "../../components/LinearGradientMoots";
import FormControlInput from "../../components/FormControlInput";
import Antdesign from "react-native-vector-icons/AntDesign";
import { Select } from '@gluestack-ui/themed';

const imagemPerfil = require("../../assets/UsuarioIcon.png");
const imagemCurso = require("../../assets/vectorizedDesenvolvimento.png")

const StyledShadowBox = styled(Box, {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.25, // 40% de opacidade
  shadowRadius: 4,
  elevation: 5, // Para Android
  borderRadius: 15, // Para manter a borda arredondada
  overflow: "hidden", // Para que o Input fique dentro da borda arredondada
})

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
        imagem: imagemPerfil,
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
          dev: "Desenvolvimento",
          qual: "Qualidade",
          fic: "FIC",
          mec: "Mecânica",
          rede: "Redes"
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
          <Box  h="30%" alignItems="center" mt={7}>
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
              <Box h="70%" alignItems="center" w="90%">
                  <Image source={obj.imagem} size={180} mb={30}/>
                  <StyledShadowBox w="90%" borderWidth={3} borderRadius={15} bg="white" flexDirection="row">
                    <Box borderColor="black" h={10} justifyContent="center" alignItems="center" w="80%" pl={12}>
                        <TextoNegrito fontSize={20}>{obj.buttonText}</TextoNegrito>
                    </Box>
                    <Box w="20%" justifyContent="center" alignItems="center">
                      <Antdesign name="camerao" size={30}/>
                    </Box>
                  </StyledShadowBox>
              </Box>
            ))}

            {secoes[numSecao]?.curso?.map((obj) => (
              <Box h="70%" alignItems="center" w="90%">
                <Image source={obj.image} size={160} mb={10}/>
                <FormControl w="100%">
                <FormControlLabel justifyContent="center">
                  <FormControlLabelText color="#7D7D7D" fontFamily="$fontProjectTitle" fontSize={15}>{obj.describe}</FormControlLabelText>
                </FormControlLabel>
                  <StyledShadowBox w="100%">
                    <Select>
                      <SelectTrigger variant="rounded" size="lg" bg="white">
                        <SelectInput placeholder="Selecione seu curso" />
                        <SelectIcon mr={20}>
                          <Antdesign name="caretdown"/>
                        </SelectIcon>
                      </SelectTrigger>
                      <SelectPortal>
                        <SelectBackdrop />
                        <SelectContent>
                          <SelectDragIndicatorWrapper>
                            <SelectDragIndicator />
                          </SelectDragIndicatorWrapper>
                          <SelectItem label={obj.picking.dev} value="Desenvolvimento" />
                          <SelectItem label={obj.picking.mec} value="Mecânica" />
                          <SelectItem label={obj.picking.rede}  value="Redes"/>
                          <SelectItem label={obj.picking.fic} value="FIC" />
                          <SelectItem label={obj.picking.qual} value="Qualidade" />
                        </SelectContent>
                      </SelectPortal>
                    </Select>
                  </StyledShadowBox>
                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>Campo obrigatório</FormControlErrorText>
                </FormControlError>
                </FormControl>
              </Box>
            ))}
          </Box>

          {/* terceiro bloco */}

            <Box  h="30%" justifyContent="center">
              <Box w="100%" alignItems="center">
                  {numSecao == 0 || numSecao == 1 ?
                    <BotaoSecao onPress={() => avancarSecao()}>
                      Continuar
                    </BotaoSecao>
                  :
                  <BotaoSecao onPress={() => navigation.navigate("tabs")}>
                    Confirmar
                  </BotaoSecao>
                  }

                {numSecao > 0 && <TextoNegrito color="#468B51" mt={3} onPress={() => voltarSecao()}>Voltar</TextoNegrito>}
              </Box>
              
            </Box>
          </VStack>
        </LinearGradientMoots>
      </Box>
    );
}