import { Box, ScrollView} from '@gluestack-ui/themed';
import LinearGradientMoots from '../../components/geral/LinearGradientMoots';
import CabecalhoPerfil from '../../components/cabecalho/CabecalhoPerfil';
import { StatusBar } from 'expo-status-bar'
import { BotaoNovoPost } from '../../components/botao/BotaoMais';
import { useRef, useState } from 'react';
import Loading from '../../components/geral/Loading';
import { RefreshControl } from '@gluestack-ui/themed';
import VirtualizedPosts from '../../components/geral/VirtualizedPosts';
import Animated, {useSharedValue, withTiming} from 'react-native-reanimated';
import { TextoNegrito } from '../../components/geral/Texto';
export default function Feed({navigation}) {
  const scrollRef = useRef()
  const [desceuTela, setDesceuTela] = useState<boolean>(false)
  const [refreshing, setRefreshing] = useState<boolean>(false);
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  const translateY = useSharedValue(100)
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
    scrollRef.current.scrollTo({y: 0, animated: true})
  }
  // if (isLoading) return <Loading isOpen={isLoading} />;
  
  return (
    <>
      <StatusBar translucent />
      <LinearGradientMoots>
        <ScrollView ref={scrollRef} onScroll={handleDescerTela} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <CabecalhoPerfil titulo="Feed" temBotaoVoltar={false} userId={0} postId={0}/>
          <Box alignItems="center" mt={35}>
            <VirtualizedPosts userId={0} refreshState={refreshing}/>
          </Box>
        </ScrollView>
        <BotaoNovoPost position="absolute" $base-top="85%" $md-top="90%" $base-right="5%" $md-right="6%" onPress={()=>navigation.navigate('novoPost', {onPostEnviado: onRefresh})}/>
        {desceuTela && <Animated.View style={[{backgroundColor: '#27B1BF', justifyContent: 'center', alignItems:'center', borderRadius: 30, position: 'absolute', top: '5%', alignSelf: 'center'}, {opacity}]}>
          <TextoNegrito color='$white' onPress={handlePressVoltarAoTopo} m={2.5}>Voltar ao topo</TextoNegrito>
        </Animated.View>}
      </LinearGradientMoots>
    </>
  );
}
