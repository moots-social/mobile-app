import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyledProvider } from "@gluestack-style/react";
import { OverlayProvider } from "@gluestack-ui/overlay";
import { ToastProvider } from "@gluestack-ui/toast";
import { createProvider } from "@gluestack-ui/provider";
import Routes from "./src/routes/index";
import { config } from "./config/gluestack-ui.config";

const GluestackUIStyledProvider = createProvider({
  StyledProvider,
});

export default function App() {
  return (
    <GluestackUIStyledProvider config={config}>
      <OverlayProvider>
        <ToastProvider>
          <StatusBar />
          <Routes />
        </ToastProvider>
      </OverlayProvider>
    </GluestackUIStyledProvider>
  );
}