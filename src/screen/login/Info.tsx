import { VStack, Text, Box } from "@gluestack-ui/themed-native-base";
import { LinearGradient } from "expo-linear-gradient";
import { StyledVStack } from "./Cadastro";

export default function Info(){
    return(
        <Box flex={1}>
            <LinearGradient 
            colors={["#FFFABB", "#E0F5FF", "#F4E5FF", "#E2FCFF"]}
            locations={[0, 0.3856, 0.6845, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }} // ajuste conforme necessário
            style={{ flex: 1 }}>
                    
            </LinearGradient>
        </Box>
    )
}