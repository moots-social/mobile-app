import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";

interface LinearGradientMootsProps {
    children: ReactNode;
    
  }

export default function LinearGradientMoots({children, ...rest} : LinearGradientMootsProps){
    return (
        <LinearGradient
        colors={["#FFFABB", "#E0F5FF", "#F4E5FF", "#E2FCFF"]}
        locations={[0, 0.3856, 0.6845, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }} // ajuste conforme necessário
        style={{ flex: 1 }}
        {...rest}
        >
            {children}
        </LinearGradient>
    )
}

export function LinearGreenGradientMoots({children, ...rest}: LinearGradientMootsProps){
    return(
        <LinearGradient
        colors={["#A3B0D9", "#E6C5FF", "#C9D3F2", "#C2E4CB"]}
        locations={[0, 0.24, 0.40, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }} // ajuste conforme necessário
        style={{ flex: 1 }}
        {...rest}
        >
            {children}
        </LinearGradient>
    )
}