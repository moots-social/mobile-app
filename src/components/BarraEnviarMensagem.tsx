import { Box, Image, Pressable, Input, InputField } from "@gluestack-ui/themed"
const EmojiIcon = require('../assets/EmojiIcon.png')
const EnviarIcon = require('../assets/EnviarIconRounded.png')

export default function BarraEnviarMensagem(){
return (
    <Box flexDirection="row" justifyContent="space-around">
        <Botao40DarkSeis evento={()=>alert('oi')} icone={EmojiIcon}/>
        <InputMensagem />
        <Botao40DarkSeis evento={()=>alert('oi')} icone={EnviarIcon}/>
    </Box>
)    
}
export function InputMensagem(){
return <Input w={288} variant="rounded" borderWidth={1} borderColor="$black">
            <InputField fontFamily="Poppins_500Medium" placeholder="Digite aqui..." bg="$white"/>
        </Input>
}
export function Botao40DarkSeis({evento, icone}: any){
return (
    <Pressable w={40} h={40} rounded={30} bg="$darkSeis" borderWidth={1} onPress={evento} justifyContent="center" alignItems="center">
        <Image source={icone} size='2xs'/>
    </Pressable>
)
}