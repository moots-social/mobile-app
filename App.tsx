import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { StyledProvider } from "@gluestack-style/react"
import { OverlayProvider } from "@gluestack-ui/overlay"
import { ToastProvider } from "@gluestack-ui/toast"
import { config, createProvider } from '@gluestack-ui/themed-native-base'
import Routes from './src/routes/index'

const GluestackUIStyledProvider = createProvider({ StyledProvider })

export default function App() {
  return (
    <GluestackUIStyledProvider config={config}>
      <OverlayProvider>
        <ToastProvider>
          <Routes />
        </ToastProvider>
      </OverlayProvider>
    </GluestackUIStyledProvider>
  );
}