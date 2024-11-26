import { Box, ScrollView,} from "@gluestack-ui/themed";
import CabecalhoPerfil from "../../components/cabecalho/CabecalhoPerfil";
import LinearGradientMoots from "../../components/geral/LinearGradientMoots";
import { useState } from "react";
import VirtualizedPosts from "../../components/geral/VirtualizedPosts";
import { RefreshControl } from "react-native-gesture-handler";

export default function Colecao(){
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(()=>{
      setRefreshing(false);
      console.log(refreshing)
    }, 1000)
  };

  return(
      <LinearGradientMoots>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
              <CabecalhoPerfil titulo="Sua coleção" mb={5} temBotaoVoltar={false}/>
              <Box alignItems='center' mt={35}>
                <VirtualizedPosts localDeRenderizacao="colecao" userId={0} refreshState={refreshing}/>
              </Box>
          </ScrollView>
      </LinearGradientMoots>
  )
}