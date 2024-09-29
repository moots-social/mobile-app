import { IButtonProps } from "@gluestack-ui/themed";
import { ReactNode } from "react";
import { Button, ButtonText } from "@gluestack-ui/themed";

interface botaoSecao extends IButtonProps{
    children: ReactNode;
}

export default function BotaoSecao({children, ...props} : botaoSecao){
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
        borderStyled="solid"
        borderWidth={3}
        borderColor="#fff"
        bg="#468B51"
        borderRadius={15}
        {...props}
    >
        <ButtonText fontFamily="Poppins_700Bold">{children}</ButtonText>
    </Button>
    )
}