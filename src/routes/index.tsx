import { NavigationContext } from "../context/NavigationContext";
import { createRef } from "react";

const navigationRef = createRef()

const splashScreen = require('../assets/SplashScreen.png')

import { NavigationContainer } from "@react-navigation/native";
import Stack from "./stack.routes";
import { useFonts } from 'expo-font'; 
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
import { Image } from "@gluestack-ui/themed-native-base";
import { StatusBar } from "expo-status-bar";
import { Box, Spinner } from "@gluestack-ui/themed";

export default function Routes() {
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

  if (!fontsLoaded) {
    return (
      <Box>
        <StatusBar />
        <Image source={splashScreen} w="100%" h="100%"/>
        <Spinner color="$lightSete" size="large"/>
      </Box>
  ) //splash screen
  }

  return (
    <NavigationContainer>
      <NavigationContext.Provider value={navigationRef.current}>
        <Stack />
      </NavigationContext.Provider>
    </NavigationContainer>
  );
}
