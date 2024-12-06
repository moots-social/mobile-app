import { Box, FlatList, Pressable, ScrollView} from '@gluestack-ui/themed';
import LinearGradientMoots from '../../components/geral/LinearGradientMoots';
import CabecalhoPerfil from '../../components/cabecalho/CabecalhoPerfil';
import { StatusBar } from 'expo-status-bar'
import { BotaoNovoPost } from '../../components/botao/BotaoMais';
import { useEffect, useRef, useState } from 'react';
import Loading from '../../components/geral/Loading';
import { RefreshControl } from '@gluestack-ui/themed';
import VirtualizedPosts from '../../components/geral/VirtualizedPosts';
import Animated, {useSharedValue, withTiming} from 'react-native-reanimated';
import { TextoNegrito } from '../../components/geral/Texto';
import { LazyIcon } from '../../components/geral/LazyImage';
import { usuarioIcon } from '../../components/perfil/PerfilComponents';
import { ArrowUp, CirclePlus, CirclePlusIcon, Icon, MoveUp } from 'lucide-react-native';
// export default function Feed({navigation}) {
//   const scrollRef = useRef()
//   const [desceuTela, setDesceuTela] = useState<boolean>(false)
//   const [refreshing, setRefreshing] = useState<boolean>(false);
//   const [fotosPerfil, setFotosPerfil] = useState<string[]>([])
//   // const [isLoading, setIsLoading] = useState<boolean>(false);

//   const opacity = useSharedValue(0)

//   const onRefresh = () => {
//     setRefreshing(true);
//     setTimeout(()=>{
//       setRefreshing(false)
//     }, 1000)
//   };
  
//   const handleDescerTela = (event) =>{
//     setDesceuTela(event.nativeEvent.contentOffset.y > 500)
//     opacity.value = withTiming(desceuTela ? 1 : 0, { duration: 400 })
//   }

//   const handlePressVoltarAoTopo = ()=>{
//     scrollRef.current.scrollTo({y: 0, animated: true})
//     if(fotosPerfil.length!=0){
//       onRefresh()
//       setFotosPerfil([])
//     }
//   }

//   const handleGetFotoPerfil = (novasFotosPerfil: string[]) =>{
//     if(novasFotosPerfil.length>=1 && novasFotosPerfil.length<=3){
//       console.log(`${novasFotosPerfil.length} foto(s) recebida(s)`)
//       setFotosPerfil(novasFotosPerfil)
//     }
//   }
//   // if (isLoading) return <Loading isOpen={isLoading} />;
//   return (
//     <>
//       <StatusBar translucent />
//       <LinearGradientMoots>
//         <ScrollView ref={scrollRef} onScroll={handleDescerTela} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
//           <CabecalhoPerfil titulo="Feed" temBotaoVoltar={false} userId={0} postId={0}/>
//           <Box alignItems="center" mt={35}>
//             <VirtualizedPosts userId={0} refreshState={refreshing} localDeRenderizacao='feed' onMessageGetFotoPerfil={(fotosPerfil: string[]) =>handleGetFotoPerfil(fotosPerfil)}/>
//           </Box>
//         </ScrollView>
//         <BotaoNovoPost position="absolute" $base-top="85%" $md-top="90%" $base-right="5%" $md-right="6%" onPress={()=>navigation.navigate('novoPost', {onPostEnviado: onRefresh})}/>
//         {desceuTela && <Animated.View  style={[{backgroundColor: '#27B1BF', justifyContent: 'center', alignItems:'center', borderRadius: 30, position: 'absolute', top: '5%', alignSelf: 'center', width: 150}, {opacity}]}>
//           <TextoNegrito color='$white' onPress={handlePressVoltarAoTopo} pt={2.5} px={5} pb={fotosPerfil.length>=1 ? 0 : 2.5}>Voltar ao topo</TextoNegrito>
//           {fotosPerfil.length>0 && (
//             <Pressable flexDirection='row' alignItems="center" justifyContent='center' gap='$1' w='100%' onPress={handlePressVoltarAoTopo}>
//               {/* <MoveUp color='white' height={15}/> */}
//               {fotosPerfil.map((foto)=>(
//                 <LazyIcon imagem={foto || usuarioIcon} style={{width: 25, height: 25, borderRadius: 30, marginBottom: 5, borderWidth: 2, borderColor: 'white'}}/>
//               ))}
//             </Pressable>
//           )}
//         </Animated.View>}
//       </LinearGradientMoots>
//     </>
//   );
// }
export default function Feed({ navigation }) {
  const scrollRef = useRef()
  const [desceuTela, setDesceuTela] = useState<boolean>(false)
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [fotosPerfil, setFotosPerfil] = useState<string[]>([])
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  const opacity = useSharedValue(0)

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(()=>{
      setRefreshing(false)
    }, 1000)
  };
  
  const handleDescerTela = (event) =>{
    setDesceuTela(event.nativeEvent.contentOffset.y > 500)
    opacity.value = withTiming(desceuTela ? 1 : 0, { duration: 400 })
  }

  const handlePressVoltarAoTopo = ()=>{
    scrollRef.current?.scrollToOffset({ offset: 0, animated: true })
    if(fotosPerfil.length!=0){
      onRefresh()
      setFotosPerfil([])
    }
  }
  const onNovoPost = () =>{

  }
  
  const handleGetFotoPerfil = (novasFotosPerfil: string[]) =>{
    if(novasFotosPerfil.length>=1 && novasFotosPerfil.length<=3){
      console.log(`${novasFotosPerfil.length} foto(s) recebida(s)`)
      setFotosPerfil(novasFotosPerfil)
    }
  }
  // if (isLoading) return <Loading isOpen={isLoading} />;
  return (
    <>
      <StatusBar translucent />
      <LinearGradientMoots>
        <FlatList
          data={[]}
          ListHeaderComponent={
            <>
              <CabecalhoPerfil titulo="Feed" temBotaoVoltar={false} userId={0} postId={0} />
              <Box alignItems="center" mt={35}>
                <VirtualizedPosts userId={0} refreshState={refreshing} localDeRenderizacao="feed"
                 onMessageGetFotoPerfil={(fotosPerfil: string[]) =>handleGetFotoPerfil(fotosPerfil)}/>
              </Box>
            </>
          }
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          contentContainerStyle={{ paddingBottom: 15}}
          keyExtractor={(item, index) => `feed-item-${index}`}
          renderItem={null}
          ref={scrollRef}
          onScroll={handleDescerTela}
        />
        <BotaoNovoPost position="absolute" $base-top="85%" $md-top="90%" $base-right="5%" $md-right="6%" onPress={()=>navigation.navigate('novoPost', {onPostEnviado: onRefresh})}/>
          {desceuTela && <Animated.View  style={[{backgroundColor: '#27B1BF', justifyContent: 'center', alignItems:'center', borderRadius: 30, position: 'absolute', top: '5%', alignSelf: 'center', width: 150}, {opacity}]}>
            <TextoNegrito color='$white' onPress={handlePressVoltarAoTopo} pt={2.5} px={5} pb={fotosPerfil.length>=1 ? 0 : 2.5}>Voltar ao topo</TextoNegrito>
            {fotosPerfil.length>0 && (
            <Pressable flexDirection='row' alignItems="center" justifyContent='center' gap='$1' w='100%' onPress={handlePressVoltarAoTopo}>
              {fotosPerfil.map((foto)=>(
                <LazyIcon imagem={foto || usuarioIcon} style={{width: 25, height: 25, borderRadius: 30, marginBottom: 5, borderWidth: 2, borderColor: 'white'}}/>
              ))}
            </Pressable>
          )}
        </Animated.View>}
      </LinearGradientMoots>
    </>
  );
}