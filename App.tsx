import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyledProvider } from "@gluestack-style/react";
import { OverlayProvider } from "@gluestack-ui/overlay";
import { ToastProvider } from "@gluestack-ui/toast";
import { createProvider } from "@gluestack-ui/provider";
import { configer } from "./src/Config/gluestack-ui.config";
import { config } from "@gluestack-ui/themed-native-base";
import Routes from "./src/routes/index";

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
import { Text } from "@gluestack-ui/themed-native-base";

const GluestackUIStyledProvider = createProvider({
  StyledProvider,
});

export default function App() {
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
    return <Text>Olá</Text>; // Ou um componente de carregamento
  }

  return (
    <GluestackUIStyledProvider config={configer}>
      <OverlayProvider>
        <ToastProvider>
          <StatusBar />
          <Routes />
        </ToastProvider>
      </OverlayProvider>
    </GluestackUIStyledProvider>
  );
}

