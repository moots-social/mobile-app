import { VirtualizedList } from "@gluestack-ui/themed";
import Post from "../post/Post";

interface IVirtualizedPostsProps{
    dataPost: any[]
}

export default function VirtualizedPosts({dataPost, ...rest}: IVirtualizedPostsProps){
    return <VirtualizedList contentContainerStyle={{alignItems: 'center', paddingTop: 2}} w="95%" data={dataPost} initialNumToRender={5} keyExtractor={(item: any) => item.id} getItem={(data, index)=>data[index]} getItemCount={() => dataPost.length} renderItem={({item}: any)=> (
        <Post postId={item.postId} descricaoPost={item.texto} imagemPost={item.listImagens} imagemPerfil={item.fotoPerfil} userId={item.userId} nomeUsuario={item.nomeCompleto} tagUsuario={item.tag} mb={20} rw="100%" mx='$5'/>
    )} {...rest}/>
} 