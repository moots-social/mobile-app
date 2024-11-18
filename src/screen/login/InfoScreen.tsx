import { VStack, Text, Box, FormControl, Input, Image } from "@gluestack-ui/themed-native-base";
import { AlertCircleIcon, Button, ButtonText, ChevronDownIcon, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlLabel, FormControlLabelText, Icon, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger, styled } from "@gluestack-ui/themed";
import { useState } from "react";
import { TextoNegrito } from "../../components/geral/Texto";
import BotaoSecao from "../../components/botao/BotaoSecao";
import LinearGradientMoots from "../../components/geral/LinearGradientMoots";
import FormControlInput from "../../components/geral/FormControlInput";
import Antdesign from "react-native-vector-icons/AntDesign";
import { Select } from '@gluestack-ui/themed';
import { reqSemToken, usuarioApi } from "../../api/apis";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Alert } from "react-native";
import { usuarioIcon } from "../../components/perfil/PerfilComponents";
import { handleUpdateImage } from "../editarPerfil/EditarPerfilScreen";
import { blobUsuario, criar } from "../../utils/usuarioUtils";

const imagemCursoDesenvolvimento = require("../../assets/cursoIcons/DesenvolvimentoIcon.png")
const imagemCursoFic = require("../../assets/cursoIcons/FicIcon.png")
const imagemCursoMecanica = require("../../assets/cursoIcons/MecanicaIcon.png")
const imagemCursoQualidade = require("../../assets/cursoIcons/QualidadeIcon.png")
const imagemCursoRedes = require("../../assets/cursoIcons/RedesIcon.png")

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

export default function Info({navigation, route}){
    const [numSecao, setNumSecao] = useState(0);
    const { sessao } = route.params;
    const { email, senha } = sessao
    const [create, setCreate] = useState({nomeCompleto: "", tag: "", fotoPerfil: usuarioIcon, curso: "", roles: ["USER"], email, senha})
    const [imagens, setImagens] = useState<ImagePicker.ImagePickerAsset[]>([])
    const [imagemCurso, setImagemCurso] = useState(imagemCursoDesenvolvimento)

    const selecionarImagem = async() => {
      let resultado = await ImagePicker.launchImageLibraryAsync({
        allowsMultipleSelection: false,
        allowsEditing: true,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 1
      })

      if(!resultado.canceled){
        setImagens(resultado.assets)
        setCreate({...create, fotoPerfil: resultado.assets[0].uri})
      }
    }

    function handleSelect(value: string) {
      setCreate({ ...create, curso: value })

      if(value === "DESENVOLVIMENTO"){
        setImagemCurso(imagemCursoDesenvolvimento)
      } else if (value === "MECANICA"){
        setImagemCurso(imagemCursoMecanica)
      } else if (value === "FIC"){
        setImagemCurso(imagemCursoFic)
      } else if (value === "QUALIDADE"){
        setImagemCurso(imagemCursoQualidade)
      } else if (value === "REDES") {
        setImagemCurso(imagemCursoRedes)
      }
    }

    function avancarSecao() {
      if (numSecao < secoes.length - 1) 
        setNumSecao(numSecao + 1);
    }

    function voltarSecao(n: number) {
      if (numSecao > 0) setNumSecao(numSecao - n);
    }

    function functionOne(){
      if(create.tag === "" || create.nomeCompleto === ""){
        Alert.alert('Campos vazios', "Seu nome e tag são obrigatórios.")
      } else {
        avancarSecao();
      }
    }

    const handleSubmit = async() => {
      
      let imagem = ''
      try {
        if(create.curso === ""){
          Alert.alert('Campo vazio', "O seu curso é obrigatório.")
        }
        if(create.fotoPerfil!==usuarioIcon){
          imagem = await blobUsuario(create.fotoPerfil)
        }else{
          imagem = ''
        }
        alert(`imagem: ${imagem}`)
        const res = await criar({...create, fotoPerfil: imagem})
        if (res === `Usuário "${create.nomeCompleto}" criado com sucesso.`) {
          Alert.alert('Cadastro', `Você criou sua conta com sucesso. Realize o login para usar o app.`)
          navigation.navigate("login")
      } 
      } catch (error: any) {
        if(error.response.data.error === "Tag já está em uso."){
          Alert.alert('Erro', error.response.data.error)
          voltarSecao(2)
        }
        console.error(error)
      }
    }; 

    return (
      <Box flex={1}>
        <LinearGradientMoots>
          {/* primeiro bloco */}
          <Box h="30%" alignItems="center" mt={5}>
            <TextoNegrito fontSize={32} paddingVertical={5} mt={20}>
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
                <Box
                  alignItems="center"
                  justifyContent="center"
                  h="100%"
                  w="90%"
                >
                  <FormControlInput
                    label={obj.label}
                    mbb={8}
                    value={create.nomeCompleto}
                    onChange={(text) => setCreate({ ...create, nomeCompleto: text })}
                  />

                  <FormControlInput
                    label={obj.labelTwo}
                    mbb={3}
                    value={create.tag}
                    onChange={(text) => setCreate({ ...create, tag: text })}
                  />
                  <TextoNegrito fontSize={12}>{obj.describe}</TextoNegrito>
                </Box>
              ))}

              {secoes[numSecao]?.perfil?.map((obj) => (
                <Box h="70%" alignItems="center" w="90%">
                  <Image key={create.fotoPerfil} source={create.fotoPerfil} size={180} mb={30} borderRadius={90}/>
                  <TouchableOpacity onPress={() => selecionarImagem()} activeOpacity={1}>
                  <StyledShadowBox
                    borderWidth={3}
                    borderRadius={15}
                    bg="white"
                    flexDirection="row"
                    justifyContent='center'
                  >
                    <Box
                      borderColor="black"
                      h={10}
                      justifyContent="center"
                      alignItems="center"
                      w="80%"
                      pl='$8'
                    >
                      <TextoNegrito fontSize={20}>
                        {obj.buttonText}
                      </TextoNegrito>
                    </Box>
                    <Box justifyContent="center" alignItems="center">
                      <Antdesign name="camerao" size={30} />
                    </Box>
                  </StyledShadowBox>

                  </TouchableOpacity>
                  <TextoNegrito
                    color="#468B51"
                    mt={3}
                    onPress={() => {setCreate({...create, fotoPerfil: usuarioIcon}); Alert.alert('Prosseguir sem foto', 'Você decidiu não enviar uma foto agora. Basta clicar em continuar para seguir com o cadastro.')}}
                  >
                   Não usar imagem
                  </TextoNegrito>
                </Box>
              ))}

              {secoes[numSecao]?.curso?.map((obj) => (
                <Box h="70%" alignItems="center" w="90%">
                  <Image key={create.curso} source={imagemCurso} $base-w={160} $base-h={160} $md-w={300} $md-h={300} mb={10} />
                  <FormControl w="100%">
                    <FormControlLabel justifyContent="center">
                      <FormControlLabelText
                        color="#7D7D7D"
                        fontFamily="$fontProjectTitle"
                        fontSize={15}
                      >
                        {obj.describe}
                      </FormControlLabelText>
                    </FormControlLabel>
                    <StyledShadowBox w="100%">
                    <Select
                      onValueChange={(value) => handleSelect(value)}
                    >
                        <SelectTrigger variant="rounded" size="lg" bg="white">
                          <SelectInput placeholder="Selecione seu curso" />
                          <SelectIcon mr={20}>
                            <Antdesign name="caretdown" />
                          </SelectIcon>
                        </SelectTrigger>
                        <SelectPortal>
                          <SelectBackdrop />
                          <SelectContent>
                            <SelectDragIndicatorWrapper>
                              <SelectDragIndicator />
                            </SelectDragIndicatorWrapper>
                            <SelectItem
                              label={obj.picking.dev}
                              value="DESENVOLVIMENTO"
                            />
                            <SelectItem
                              label={obj.picking.mec}
                              value="MECANICA"
                            />
                            <SelectItem
                              label={obj.picking.rede}
                              value="REDES"
                            />
                            <SelectItem label={obj.picking.fic} value="FIC" />
                            <SelectItem
                              label={obj.picking.qual}
                              value="QUALIDADE"
                            />
                          </SelectContent>
                        </SelectPortal>
                      </Select>
                    </StyledShadowBox>
                    <FormControlError>
                      <FormControlErrorIcon as={AlertCircleIcon} />
                      <FormControlErrorText>
                        Campo obrigatório
                      </FormControlErrorText>
                    </FormControlError>
                  </FormControl>
                </Box>
              ))}
            </Box>

            {/* terceiro bloco */}
            <Box h="30%" justifyContent="center">
              <Box w="100%" alignItems="center">
                {numSecao === 0 && (
                  <BotaoSecao onPress={() => functionOne()}>
                    Continuar
                  </BotaoSecao>
                )}
                {numSecao === 1 && (
                  <BotaoSecao onPress={() => avancarSecao()}>
                    Continuar
                  </BotaoSecao>
                )}
                {numSecao === 2 && (
                  <BotaoSecao onPress={() => handleSubmit()}>
                    Confirmar
                  </BotaoSecao>
                )}
                
                {numSecao > 0 && (
                  <TextoNegrito
                    color="#468B51"
                    mt={3}
                    onPress={() => voltarSecao(1)}
                  >
                    Voltar
                  </TextoNegrito>
                )}
              </Box>
            </Box>
          </VStack>
        </LinearGradientMoots>
      </Box>
    );
}