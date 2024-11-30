import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from 'expo-font'; 

import { Box, Spinner, Image } from "@gluestack-ui/themed";
import { StatusBar } from "expo-status-bar";
import { LogBox } from "react-native";
import { Provider } from "react-redux";

import Stack from "./stack.routes";
import store from "../redux/storeProvider";

import {
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic
} from '@expo-google-fonts/poppins';

const splashScreen = require('../assets/SplashScreen.png')

export default function Routes() {
  LogBox.ignoreAllLogs(true)

  const [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
  });

  //splash screen renderizada enquanto as fontes carregam
  if (!fontsLoaded) {
    return (
      <Box>
        <StatusBar translucent={true}/>
        <Image source={splashScreen} w="100%" h="100%"/>
        <Spinner color="$lightSete" size="large"/>
      </Box>
    )
  }

  return (
    <Provider store={store}>
        <NavigationContainer>
            <Stack />
        </NavigationContainer>
    </Provider>
  );
}
