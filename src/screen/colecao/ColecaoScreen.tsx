import { ScrollView } from "@gluestack-ui/themed";
import CabecalhoPerfil from "../../components/cabecalho/CabecalhoPerfil";
import LinearGradientMoots from "../../components/geral/LinearGradientMoots";
import { TextoNegrito } from "../../components/geral/Texto";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { usuarioApi } from "../../api/apis";
import PostColecao from "../../components/post/PostColecao";

export default function Colecao(){
    const [publics, setPublics] = useState<any>([]);
    const id = useSelector(state => state.usuario.user.userId);
    console.log("este é id " + id)

    useEffect(() => {
        const buscarPostsSalvos = async () => {
          try {
            const resposta = await usuarioApi.buscarColecao(id);
            const posts = resposta.data
    
            setPublics(posts || []);
          } catch (error: any) {
            alert(error.response?.message?.error || "Erro ao carregar os posts");
          } 
        };
        console.log(publics)
        buscarPostsSalvos();
      }, []);

    return(
        <LinearGradientMoots>
            <ScrollView>
                <CabecalhoPerfil titulo="Sua coleção" mb={5} temBotaoVoltar={false}/>
                {publics && publics.length > 0 && publics[0] !== ''? (
                    publics.map((e: any) => (
                        <PostColecao
                            key={e.id}
                            nomeUsuario={e.nomeCompleto}
                            tagUsuario={e.tag}
                            mb={10}
                            ml={15}
                            imagemPerfil={e.fotoPerfil}
                            userId={e.userId}
                            postId={e.postId}
                            {...(e.texto && { descricaoPost: e.texto })}
                            {...(e.listImagens && e.listImagens.length > 0 && { imagemPost: e.listImagens })}
                        />
                        ))
                ) : (
                    <TextoNegrito alignSelf='center' mt={15}>Nenhum item salvo.</TextoNegrito>
                )}
            </ScrollView>
        </LinearGradientMoots>
    )
}