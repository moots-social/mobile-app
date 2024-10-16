import { Image } from "@gluestack-ui/themed";
import { FullRounded } from "./Rounded";
import { TextoNegrito } from "./Texto";

const fecharIcon = require('../assets/FecharIcon.png')

export default function AlertaRetangular({children}: any){
    return(
        <FullRounded bg="$white" minH={65} w="95%" p={20} pr={15}  flexDirection="row" justifyContent="space-between">
            <TextoNegrito >
                {children}
            </TextoNegrito>
            <Image source={fecharIcon} w={10} h={10} bottom={5}/>
        </FullRounded>
    )
}

//exemplo de uso
{/* <AlertaRetangular>
    Publicação adicionada com sucesso.
    <Link><LinkText color="$add2" fontFamily="Poppins_600SemiBold" textDecorationLine='none'>Visualizar</LinkText></Link>
</AlertaRetangular> */}