import { VirtualizedList } from "@gluestack-ui/themed";
import Post from "../post/Post";
import { useEffect, useState } from "react";
import searchUtils, { buscarPostPorUserId } from "../../utils/searchUtils";
import { buscarColecao } from "../../utils/usuarioUtils";
import { TextoNegrito } from "./Texto";
import { useSelector } from "react-redux";

interface IVirtualizedPostsProps{
    dataPost?: any[],
    localDeRenderizacao?: string,
    refreshState: boolean,
    userId: number
}

export default function VirtualizedPosts({dataPost, localDeRenderizacao, refreshState, userId, ...rest}: IVirtualizedPostsProps){
    const [posts, setPosts] = useState<any[]>()
    const usuario = useSelector(state => state.usuario.user)

    const handleBuscarPosts = async()=>{
        if(localDeRenderizacao){
            switch (localDeRenderizacao.toLowerCase()){
                case 'colecao':
                    let resultado = await buscarColecao()
                    if(resultado!=0) setPosts(resultado)
                    else setPosts([])
                    break
                case 'pesquisa':
                    setPosts(dataPost)
                    break
                case 'perfil':
                    resultado = await buscarPostPorUserId(userId)
                    if(resultado!=0) setPosts(resultado.reverse())
                    else setPosts([])
                    break
                default:
                    console.log('valor de renderização inválido')
                    setPosts([])
                    break
                }
        }else{
            const resultado = await searchUtils.buscarTodosOsPosts()
            
            if(resultado!=0) setPosts(resultado)
            else{
                setPosts([])
            } 
        }
    }
                    
    // useEffect(()=>{
    //     if(localDeRenderizacao) handleBuscarPosts()
    // }, [usuario.novoPost])

    useEffect(()=>{
        handleBuscarPosts()
    }, [refreshState])

    if(!posts) return <TextoNegrito>Buscando publicações...</TextoNegrito>
    if(posts && posts.length<=0) return <TextoNegrito>Nenhuma publicação encontrada.</TextoNegrito>
    return <VirtualizedList  contentContainerStyle={{alignItems: 'center', paddingTop: 4}} w="100%" data={posts} initialNumToRender={4} keyExtractor={(item: any) => item.postId} getItem={(data, index)=> data[index]} getItemCount={() => posts.length} renderItem={({item}: any)=> (
        <Post
        key={item.postId}
        postId={item.postId} 
        descricaoPost={item.texto} 
        imagemPost={item.listImagens} 
        imagemPerfil={item.fotoPerfil} 
        userId={item.userId} 
        nomeUsuario={item.nomeCompleto} 
        tagUsuario={item.tag} 
        likeUsers={item.likeUsers} mb={10} mx='$5'/>
    )} {...rest}/>
} 