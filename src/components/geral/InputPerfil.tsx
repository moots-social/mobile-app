import { Box, Input, InputField, Textarea, TextareaInput } from "@gluestack-ui/themed";
import { TextoNegrito } from "./Texto";

interface IInputPerfilProps{
    titulo: string,
    tituloSize?: number,
    tituloColor?: string, 
    type?: string,
    placeholder?: string,
    value?: string,
    onChange?: any
}

export default function InputPerfil({titulo, tituloSize=18, tituloColor, type="text",  placeholder='', onChange, ...rest}: IInputPerfilProps){
    return (
        <Box alignItems="center">
            <TextoNegrito fontSize={tituloSize} color={tituloColor}>{titulo}</TextoNegrito>
            <Input variant="rounded" brw={1} brc="$black" {...rest} mt={5} h={30}>
                <InputField type={type} placeholder={placeholder} fontFamily="Poppins_500Medium" on onChangeText={onChange ? onChange : ''} />
            </Input>
        </Box>
    )
}

export function MultiLinhaInputPerfil({titulo, tituloSize=18, tituloColor, placeholder='', value, onChange, ...rest}: IInputPerfilProps){
    return(
        <Box alignItems="center">
            {titulo!=='' && <TextoNegrito fontSize={tituloSize} color={tituloColor}>{titulo}</TextoNegrito>}
            <Textarea brw={1} brc="$black" {...rest} mt={5} >
                <TextareaInput placeholder={placeholder} fontFamily="Poppins_500Medium" onChangeText={onChange ? onChange : ''} value={value}/>
            </Textarea>
        </Box>
    )
}