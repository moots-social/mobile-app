import { Box, Input, InputField, Textarea, TextareaInput } from "@gluestack-ui/themed";
import { TextoNegrito } from "./Texto";

export default function InputPerfil({titulo, tituloSize=18, type="text",  placeholder='', ...rest}){
    return (
        <Box alignItems="center">
            <TextoNegrito fontSize={tituloSize}>{titulo}</TextoNegrito>
            <Input variant="rounded" brw={1} brc="$black" {...rest} mt={10} h={30}>
                <InputField type={type} placeholder={placeholder} fontFamily="Poppins_500Medium"/>
            </Input>
        </Box>
    )
}

export function MultiLinhaInputPerfil({titulo, tituloSize=18, placeholder='', ...rest}){
    return(
        <Box alignItems="center">
            <TextoNegrito fontSize={tituloSize}>{titulo}</TextoNegrito>
            <Textarea brw={1} brc="$black" {...rest} mt={10}>
                <TextareaInput placeholder={placeholder} fontFamily="Poppins_500Medium"/>
            </Textarea>
        </Box>
    )
}