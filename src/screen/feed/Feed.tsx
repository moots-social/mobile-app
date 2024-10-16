import { Box} from '@gluestack-ui/themed'
import LinearGradientMoots from '../../components/LinearGradientMoots'
import CabecalhoPerfil from '../../components/CabecalhoPerfil'
import { StatusBar } from 'expo-status-bar'
import Post from '../../components/Post'
import AlertDialogGreen from '../../components/AlertDialogGreen'

export default function Feed({navigation}) {

  return (
    <LinearGradientMoots>
      <StatusBar translucent={false}/>
      <CabecalhoPerfil titulo="Feed" temBotaoVoltar={false}/>
      <Box alignItems="center" mt={35}>
        <Post />
      </Box>
      <AlertDialogGreen titulo='Confirmar ação'>
        Tem certeza que deseja parar de seguir @usuario10?
      </AlertDialogGreen>
    </LinearGradientMoots>
  )
}