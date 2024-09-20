import { ITextareaProps } from "@gluestack-ui/textarea/lib/typescript/types";
import { Text } from "@gluestack-ui/themed-native-base";

interface Tituloprops extends ITextareaProps{
    children: String | number
}

export function Titulo({children, ...rest}: Tituloprops){
    return(    
    <Text fontFamily="$fontProjectTitle" fontSize={25} color={"black"} {...rest} paddingVertical={5}>
        {children}
    </Text>)
}

export function Texto({children, ...rest}: Tituloprops){
    return(
    <Text fontFamily="$fontProjectDefault" color={"black"} {...rest}>
        {children}
    </Text> 
    )
}

export function TextoNegrito({children, ...rest}: Tituloprops){
    return(
        <Text fontFamily="$fontProjectTitle" color={"black"} fontSize={15} {...rest}>
            {children}
        </Text>
    )
}
