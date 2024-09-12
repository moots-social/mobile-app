import { StyledProvider } from "@gluestack-style/react";
import { OverlayProvider } from "@gluestack-ui/overlay";
import { ToastProvider } from "@gluestack-ui/toast";
import { config } from "./src/Components/gluestack-ui.config";
import { createProvider } from "@gluestack-ui/provider";
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
        <StatusBar backgroundColor={config.tokens.colorsProject.dark.dois}/>
          <Routes />
        </ToastProvider>
      </OverlayProvider>
    </GluestackUIStyledProvider>
  );
}
