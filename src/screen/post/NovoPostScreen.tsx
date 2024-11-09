import { Box, ScrollView, Text, Textarea, TextareaInput } from "@gluestack-ui/themed";
import { Image } from "@gluestack-ui/themed-native-base";
import LinearGradientMoots from "../../components/geral/LinearGradientMoots";
import CabecalhoPerfil from "../../components/cabecalho/CabecalhoPerfil";
import { RoundedBottom } from "../../components/geral/Rounded";
import { TextoNegrito } from "../../components/geral/Texto";
import { BotaoCamera, BotaoEnviarNovoPost, BotaoGaleria, TesteContext } from "../../components/botao/BotoesPostComentario";
import { getIdStorage, getTokenStorage } from "../../utils/storageUtils";
import { postApi, usuarioApi } from "../../api/apis";
import { useEffect, useState } from "react";
import * as ImagePicker from 'expo-image-picker'
import { TouchableOpacity } from "react-native-gesture-handler";

// Defina a interface User
interface User {
  nomeCompleto: string;
  fotoPerfil: string | null;
}

const usuarioIcon = require('../../assets/UsuarioIcon.png');

export default function NovoPost({navigation}) {
  const [user, setUser] = useState<User | null>(null); 
  const [imagens, setImagens] = useState<ImagePicker.ImagePickerAsset[]>([]);  
  const [texto, setTexto] = useState<string>("")

  const token = getTokenStorage();
  const id = getIdStorage();

  useEffect(() => {
    const reqUser = async () => {
      try {
        const req = await usuarioApi.get(`/buscar/${await id}`, {
          headers: { Authorization: await token },
        });

        const data = await req.data;

        if (data) {
          setUser(data);  
        }
      } catch (e: any) {
        alert("Erro ao carregar os dados do usuário");
      }
    };
    reqUser();
  }, []);

  const atualizarImagens = (novasImagens: ImagePicker.ImagePickerAsset[]) => {
    setImagens(novasImagens);
  };

  if (!user) {
    return <Text>Carregando...</Text>; 
  }

  const handleSubmit = async () => {
    if (texto === "" && imagens.length < 1) {
        alert('Você não pode postar algo sem nada');
    } else {
        try {          
            const req = await postApi.post("/criar", {
                texto: texto, 
                listImagens: imagens 
            }, {
                headers: { Authorization: await token }
            });

            const data = await req.data;

            if (data) {
                alert('Post criado com sucesso');
                navigation.navigate('feed');
            }
        } catch (error: any) {
            alert(error.response.message.error); 
        }
    }
};


  return (
    <LinearGradientMoots>
      <ScrollView>
        <CabecalhoPerfil titulo="Nova publicação" zIndex={1} />
        <RoundedBottom zIndex={0} minHeight={500} bg="$white" bottom={5} mb={10}>
          <Box p={20} display="flex" justifyContent="space-between" minHeight={500}>
            <Box display="flex">
              <Box flexDirection="row" alignItems="center">
                {/* Verifica se user.fotoPerfil está definido antes de renderizar */}
                <Image
                  source={user.fotoPerfil ? { uri: user.fotoPerfil } : usuarioIcon}
                  size={55}
                  borderRadius={30}
                />
                <TextoNegrito ml={2}>{user.nomeCompleto}</TextoNegrito>
              </Box>
              <Box justifyContent="center">
                <Textarea ml={38} brw={0} w="85%" h={200} bottom={10}>
                  <TextareaInput fontFamily="Poppins_500Medium" placeholder="No que você está pensando?" onChangeText={(e) => {
                    setTexto(e)
                    }}
                    />
                </Textarea>
                <Box>
                    {imagens.map((e, index) => (
                        <Image source={{uri: e.uri}} key={index}/>
                    ))}
                </Box>
              </Box>
            </Box>
            <Box flexDirection="row" justifyContent="space-between">
              <Box flexDirection="row">
                {/* Passando a função de atualizar imagens como prop */}
                <BotaoGaleria onUpdateImagens={atualizarImagens} />
                <BotaoCamera onUpdateImagens={atualizarImagens} />
              </Box>
              <TouchableOpacity onPress={() => handleSubmit()}>
                <BotaoEnviarNovoPost/>
              </TouchableOpacity>
            </Box>
          </Box>
        </RoundedBottom>
      </ScrollView>
    </LinearGradientMoots>
  );
}
