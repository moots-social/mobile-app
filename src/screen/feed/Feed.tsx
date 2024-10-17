import { Box, Text } from '@gluestack-ui/themed'
import LinearGradientMoots from '../../components/LinearGradientMoots'
import SyncStorage from '@react-native-async-storage/async-storage';

export default function Feed() {
  const token = SyncStorage.getItem('token')
  console.log("isso ai" + token)
  
  return (
    <LinearGradientMoots>
      <Text>OI</Text>
    </LinearGradientMoots>
  )
}