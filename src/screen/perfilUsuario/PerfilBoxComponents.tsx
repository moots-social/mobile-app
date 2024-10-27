import { Box, Image } from "@gluestack-ui/themed";

interface IFotoCapaBox{
    fotoPerfilSource: any,
    fotoCapaSource: any
}

export function FotoCapaBox({fotoPerfilSource, fotoCapaSource, ...rest}: IFotoCapaBox){
    return <Box display="flex" justifyContent="flex-end">
                <Image source={fotoPerfilSource} w="100%" h={220} brw={1} borderBottomLeftRadius={10} borderBottomRightRadius={10} position="relative" zIndex={0}/>
                <Image source={fotoCapaSource} w={100} h={100} brw={1} rounded={60} alignSelf="center" zIndex={1} position="absolute" top={170} />
            </Box>
}