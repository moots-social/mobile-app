import { IButtonProps } from "@gluestack-ui/themed";
import { ReactNode, useState } from "react";
import { Button, ButtonText } from "@gluestack-ui/themed";

interface botaoSecao extends IButtonProps{
    children: ReactNode,
    color?: any,
}

export default function BotaoSecao({children, color, ...rest} : botaoSecao){
    return (
        
    <Button
        style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        }}
        w="80%"
        h={50}
        $active-opacity={0.6}
        borderStyled="solid"
        borderWidth={3}
        borderColor="#fff"
        bg="#468B51"
        borderRadius={15}
        {...rest}
    >
        <ButtonText fontFamily="Poppins_700Bold" color={color || '$white'}>{children}</ButtonText>
    </Button>
    )
}