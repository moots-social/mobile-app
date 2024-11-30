import { Box, ScrollView} from '@gluestack-ui/themed';
import LinearGradientMoots from '../../components/geral/LinearGradientMoots';
import CabecalhoPerfil from '../../components/cabecalho/CabecalhoPerfil';
import { StatusBar } from 'expo-status-bar'
import { BotaoNovoPost } from '../../components/botao/BotaoMais';
import { useState } from 'react';
import Loading from '../../components/geral/Loading';
import { RefreshControl } from '@gluestack-ui/themed';
import VirtualizedPosts from '../../components/geral/VirtualizedPosts';

export default function Feed() {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(()=>{
      setRefreshing(false)
    }, 1000)
  };
  
  // if (isLoading) return <Loading isOpen={isLoading} />;
  
  return (
    <>
      <StatusBar translucent />
      <LinearGradientMoots>
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <CabecalhoPerfil titulo="Feed" temBotaoVoltar={false} userId={0} postId={0}/>
          <Box alignItems="center" mt={35}>
            <VirtualizedPosts userId={0} refreshState={refreshing}/>
          </Box>
        </ScrollView>
        <BotaoNovoPost position="absolute" $base-top="85%" $md-top="90%" $base-right="5%" $md-right="6%" />
      </LinearGradientMoots>
    </>
  );
}
