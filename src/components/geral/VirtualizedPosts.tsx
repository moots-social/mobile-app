import { VirtualizedList } from "@gluestack-ui/themed";
import Post from "../post/Post";
import { useEffect, useState } from "react";
import searchUtils, { buscarPostPorUserId } from "../../utils/searchUtils";
import { buscarColecao } from "../../utils/usuarioUtils";
import { TextoNegrito } from "./Texto";

interface IVirtualizedPostsProps{
    dataPost?: any[],
    localDeRenderizacao?: string,
    refreshState: boolean,
    userId: number
}

export default function VirtualizedPosts({dataPost, localDeRenderizacao, refreshState, userId, ...rest}: IVirtualizedPostsProps){
    const [posts, setPosts] = useState<any[]>()

    const handleBuscarPosts = async()=>{
        if(localDeRenderizacao){
            switch (localDeRenderizacao.toLowerCase()){
                case 'colecao':
                    let resultado = await buscarColecao()
                    if(resultado!=0) setPosts(resultado)
                        
                        break
                case 'pesquisa':
                    setPosts(dataPost)
                    break
                case 'perfil':
                    resultado = await buscarPostPorUserId(userId)
                    if(resultado!=0) setPosts(resultado.reverse())
                    break
                default:
                    console.log('valor de renderização inválido')
                    setPosts([])
                    break
                }
        }else{
            const resultado = await searchUtils.buscarTodosOsPosts()
            
            if(resultado!=0) setPosts(resultado)
            else setPosts([])
        }
    }
                    

    useEffect(()=>{
        handleBuscarPosts()
    }, [refreshState])

    if(!posts) return <TextoNegrito>Buscando publicações...</TextoNegrito>
    return <VirtualizedList contentContainerStyle={{alignItems: 'center', paddingTop: 4}} w="100%" data={posts} initialNumToRender={3} keyExtractor={(item: any) => item.id} getItem={(data, index)=> data[index]} getItemCount={() => posts.length} renderItem={({item}: any)=> (
        <Post 
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