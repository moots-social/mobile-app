import { StyledProvider } from "@gluestack-style/react";
import { OverlayProvider } from "@gluestack-ui/overlay";
import { ToastProvider } from "@gluestack-ui/toast";
import { config, createProvider } from "@gluestack-ui/themed-native-base";
import Routes from "./src/routes/index";
import React from "react";
import { StatusBar } from "expo-status-bar";
const GluestackUIStyledProvider = createProvider({
  StyledProvider,
});
export default function App() {
  return (
    <GluestackUIStyledProvider config={config}>
      <OverlayProvider>
        <ToastProvider>
          <StatusBar style="auto" />
          <Routes />
        </ToastProvider>
      </OverlayProvider>
    </GluestackUIStyledProvider>
  );
}
