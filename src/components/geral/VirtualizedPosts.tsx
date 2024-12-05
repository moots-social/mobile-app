import { VirtualizedList } from "@gluestack-ui/themed";
import Post from "../post/Post";
import { useEffect, useState } from "react";
import searchUtils, { buscarPostPorUserId, buscarPostsPaginados } from "../../utils/searchUtils";
import { buscarColecao } from "../../utils/usuarioUtils";
import { TextoNegrito } from "./Texto";
import { useSelector } from "react-redux";
import {BASE_URL} from '@env'
import EventSource from "react-native-sse";
import { Cache } from "react-native-cache";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BareLoading } from "./Loading";
import { usuarioIcon } from "../perfil/PerfilComponents";
import { Dot } from "lucide-react-native";
interface IVirtualizedPostsProps{
    dataPost?: any[],
    localDeRenderizacao: string,
    refreshState: boolean,
    userId: number,
    onMessageEvent?: (posts: any)=>void,
    onMessageGetFotoPerfil?: (fotos: string[]) => void
}

const cache = new Cache({
    namespace: 'posts',
    policy: {
        maxEntries: 15,
        stdTTL: 1800
    },
    backend: AsyncStorage
})
//onMessageEvent: evento de quando o sse pegar algum post novo 
export default function VirtualizedPosts({dataPost, localDeRenderizacao, refreshState, userId, onMessageEvent, onMessageGetFotoPerfil, ...rest}: IVirtualizedPostsProps){
    const [posts, setPosts] = useState<any[]>([])
    const [pagina, setPagina] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)
    const [lru, setLru] = useState<any[]>([])
    const [fotosPerfil, setFotosPerfil] = useState<string[]>([])
    const [endReached, setEndReached] = useState<boolean>(false)
    const usuario = useSelector(state => state.usuario.user)

    useEffect(()=>{
        if(localDeRenderizacao==='feed'){
            const eventSource = new EventSource(`${BASE_URL}/post/stream-sse`)
            
            eventSource.addEventListener('open', ()=>{
                console.log('SSE/AB')
            })
    
            eventSource.addEventListener('message', async(event) => {
                console.log('SSE/NV:' + event.data);
                const novoPost = JSON.parse(event.data)

                await cache.set(String(novoPost.postId), novoPost)
                // const lruPostId = await AsyncStorage.getItem('posts:_lru')
                // if (lruPostId) {
                //     const formattedLru = JSON.parse(lruPostId)
                //     const lruPosts = await Promise.all(
                //         formattedLru.map(async (id: string) => {
                //             const post = await cache.get(id);
                //             return post;
                //         })
                //     );
                //     setLru(lruPosts)
                     
                // }
                const cachedPost = await cache.peek(String(novoPost.postId))
                setLru([...lru, cachedPost])
            });
    
            eventSource.addEventListener('error', (event) => {
                console.error('SSE/INT: ' + event);
            });
    
            eventSource.open();
    
            return ()=>{
                eventSource.close()
                console.log('SSE/FE')
            }
        }
    }, [])

    const handleGetPostFeed = async() =>{
        const posts = await buscarPostsPaginados(pagina)
        if(posts!=0 && !endReached) setPosts(posts)
        else if(posts!=0 && endReached){
            setPosts((prevPosts)=>[...prevPosts, posts])
            setEndReached(false)
        } 
    }

const clearCache = async()=>{
        await cache.clearAll()
        setLru([])
        setFotosPerfil([])
    }

    useEffect(()=>{
        if(lru.length>0 ){
            setPosts([...lru, ...posts])
            clearCache()
        }
    }, [refreshState])

    useEffect(() => {
        if (lru.length >= 1 && lru.length<=3 && onMessageGetFotoPerfil) {
            console.log('Passando foto para feed');
            
            const ultimoPost = lru[lru.length - 1]
                setFotosPerfil((prevFotosPerfil) => [
                    ...prevFotosPerfil,
                    ultimoPost.fotoPerfil,
                ])
    
                onMessageGetFotoPerfil([
                    ...fotosPerfil,
                    ultimoPost.fotoPerfil,
                ])
        }
    }, [lru]);

    const handleBuscarPosts = async()=>{
        setLoading(true)
        switch (localDeRenderizacao.toLowerCase()){
            case 'feed':
                // let resultado = await buscarPostsPaginados(pagina)
                // if(resultado!=0) setPosts([...posts, ...resultado])
                // if(resultado!=0) setPosts(resultado)
                // else setPosts([])
                //pode ou nao ter mais, se tiver menos que 15 com certeza
                //nao tem mais
                //limite de retorno é 15
                // setTemMais(resultado.length==15)
                await handleGetPostFeed()
                break
            case 'colecao':
                let resultado = await buscarColecao()
                if(resultado!=0) setPosts(resultado)
                else setPosts([])
                break
            case 'pesquisa':
                setPosts(dataPost || [])
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
        setLoading(false)
    }
                    
    const handleEndReachedFeed = async() =>{
        if(!loading && localDeRenderizacao==='feed' && endReached){
            setPagina((prevPagina)=>prevPagina+1)
        }
    }

    useEffect(()=>{
        handleBuscarPosts()
    }, [refreshState, pagina])

    if(!posts) return <TextoNegrito>Buscando publicações...</TextoNegrito>
    if(posts && posts.length<=0) return <TextoNegrito>Nenhuma publicação encontrada.</TextoNegrito>
    return <VirtualizedList onEndReached={handleEndReachedFeed} maxToRenderPerBatch={15} ListFooterComponent={loading ? <BareLoading /> : <Dot color='grey'/>} onEndReachedThreshold={0.5} contentContainerStyle={{alignItems: 'center', paddingTop: 4}} w="100%" data={posts} initialNumToRender={4} keyExtractor={(item: any) => item.postId} getItem={(data, index)=> data[index]} getItemCount={() => posts.length} renderItem={({item}: any)=> (
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