import { Box, Image, Text } from "@gluestack-ui/themed";
import { BotaoConfigurar, BotaoCurso, BotaoSeguir, BotaoListaSeguidores } from "./PerfilBotoes";
import { Titulo } from "../geral/Texto";
import { ScrollView } from "@gluestack-ui/themed-native-base";

interface IFotoCapaBoxProps{
    fotoPerfilSource: any,
    fotoCapaSource: any
}

interface ITextoBoxProps{
    nomeCompleto: string,
    tag: string,
    descricao: string,
}

interface IBotoesPerfilBoxProps{
    curso: string,
    seguir: boolean
}
interface IPerfilBox{
    objetoARenderizar: any,
    seguir: boolean
}

export const usuarioIcon = "https://storageimagesmoots.blob.core.windows.net/artifact-image-container/68a77764-1c2e-4bc4-8d6b-c280ac593970.png"
export const coverIcon = 'https://storageimagesmoots.blob.core.windows.net/artifact-image-container/6d682b11-f1c0-48cb-976d-19b0db2f2681.png'


export function FotoCapaBox({fotoPerfilSource, fotoCapaSource, ...rest}: IFotoCapaBoxProps){
    return <Box display="flex" justifyContent="flex-end" {...rest}>
                <Image source={fotoCapaSource || coverIcon} w="100%" h={220} brw={1} borderBottomLeftRadius={10} borderBottomRightRadius={10} position="relative" zIndex={0} alt='capa'/>
                <Image source={fotoPerfilSource || usuarioIcon} w={100} h={100} brw={1} rounded={60} alignSelf="center" zIndex={1} position="absolute" top={170} alt='foto de perfil'/>
            </Box>
}

export function TextoBox({nomeCompleto, tag, descricao , ...rest}: ITextoBoxProps){
    return <Box mt={60} alignItems="center" alignSelf="center" w="90%" {...rest}>
              <Text fontFamily='Poppins_600SemiBold' fontSize={26} color='$black' textAlign='center'>{nomeCompleto}</Text>
              <Text fontFamily='Poppins_500Medium' fontSize={18} color='#B6B3B3' textAlign='center'>{tag}</Text>
              {descricao!=='' && <Text fontFamily='Poppins_500Medium' fontSize={18} color='#737373' textAlign='center'>{descricao}</Text>}
            </Box>
}

export function BotoesPerfilBox({curso, seguir}: IBotoesPerfilBoxProps){
    return <Box flexDirection='row' alignItems="center" justifyContent="space-between" alignSelf="center" w={180} my={10}>
            {!seguir ? <BotaoConfigurar w={35} imgW={15} imgH={15} /> : <BotaoSeguir rounded={20} imgW={15} imgH={12} />}
            <BotaoCurso curso={curso}/>
            <BotaoListaSeguidores rounded={20} w={35} imgW={12} imgH={12}/> 
        </Box>
}

export function PublicacoesBox(){
    return <Box alignItems="center">
            <Titulo>Publicações</Titulo>
        </Box>
}

export function PerfilBox({objetoARenderizar, seguir}: IPerfilBox){
    return(
        <ScrollView w="100%" display="flex">
            <FotoCapaBox fotoPerfilSource={objetoARenderizar.fotoPerfil || ''} fotoCapaSource={objetoARenderizar.fotoCapa || ''} />
            <TextoBox nomeCompleto={objetoARenderizar.nomeCompleto || ''} tag={objetoARenderizar.tag || ''} descricao={objetoARenderizar.descricao || ''}/>
            <BotoesPerfilBox curso={objetoARenderizar.curso || ''} seguir={seguir}/>
            <PublicacoesBox />
        </ScrollView>
    )
}