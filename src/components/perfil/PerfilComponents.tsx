import { Box, Image, Pressable, Text } from "@gluestack-ui/themed";
import { BotaoConfigurar, BotaoCurso, BotaoSeguir, BotaoListaSeguidores } from "./PerfilBotoes";
import { TextoNegrito, Titulo } from "../geral/Texto";
import { ScrollView } from "@gluestack-ui/themed-native-base";
import { useCallback, useEffect, useState } from "react";

import ImageView from "react-native-image-viewing"
import { useSelector } from "react-redux";
import { buscarPostPorUserId } from "../../utils/searchUtils";
import VirtualizedPosts from "../geral/VirtualizedPosts";

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
    seguir: boolean,
    getUsuario: any
}
interface IPerfilBox{
    objetoARenderizar: any,
    seguir: boolean,
}

export const usuarioIcon = "https://storageimagesmoots.blob.core.windows.net/artifact-image-container/68a77764-1c2e-4bc4-8d6b-c280ac593970.png"
export const coverIcon = 'https://storageimagesmoots.blob.core.windows.net/artifact-image-container/6d682b11-f1c0-48cb-976d-19b0db2f2681.png'


export function FotoCapaBox({fotoPerfilSource, fotoCapaSource, ...rest}: IFotoCapaBoxProps){
    const [isVisible, setIsVisible] = useState(false)
    const [index, setIndex] = useState<number>(0)

    const handleExpandirFoto = (novoIndex: number) =>{
        setIndex(novoIndex)
        setIsVisible(true)
    }

    return <Box display="flex" justifyContent="flex-end" {...rest}>
                <Pressable onPress={()=>handleExpandirFoto(0)}>            
                    <Image source={fotoCapaSource} w="100%" h={220} borderBottomLeftRadius={10} borderBottomRightRadius={10} position="relative" zIndex={0} alt='capa'/>
                </Pressable>
                <Pressable alignSelf="center" zIndex={1} position="absolute" top={170} onPress={()=>handleExpandirFoto(1)}>
                    <Image source={fotoPerfilSource || usuarioIcon} w={100}  h={100} rounded={60} alt='foto de perfil'/>
                </Pressable>
                <ImageView 
                    images={[{uri: fotoCapaSource}, {uri: fotoPerfilSource || usuarioIcon}]}
                    imageIndex={index}
                    visible={isVisible}
                    onRequestClose={()=>setIsVisible(false)}
                />
            </Box>
}

export function TextoBox({nomeCompleto, tag, descricao , ...rest}: ITextoBoxProps){
    return <Box mt={60} alignItems="center" alignSelf="center" w="90%" {...rest}>
              <Text fontFamily='Poppins_600SemiBold' fontSize={26} color='$black' textAlign='center'>{nomeCompleto}</Text>
              <Text fontFamily='Poppins_500Medium' fontSize={18} color='#B6B3B3' textAlign='center'>{tag}</Text>
              {descricao!=='' && <Text fontFamily='Poppins_500Medium' fontSize={18} color='#737373' textAlign='center'>{descricao}</Text>}
            </Box>
}

export function BotoesPerfilBox({curso, seguir, getUsuario}: IBotoesPerfilBoxProps){
    const usuario = useSelector(state => state.usuario.user)
    const [testState, setTestState] = useState<string>('')
    useEffect(()=>{
        setTestState(curso)
    }, [usuario.curso])
    return <Box flexDirection='row' alignItems="center" justifyContent="space-between" alignSelf="center" w={180} my={10}>
            {!seguir ? <BotaoConfigurar w={35} imgW={15} imgH={15} /> : <BotaoSeguir rounded={20} imgW={15} imgH={12} id1={usuario.id} id2={getUsuario.userId} nomeCompleto={getUsuario.nomeCompleto} />}
            <BotaoCurso curso={testState} />
            <BotaoListaSeguidores rounded={20} w={35} imgW={12} imgH={12} getUsuario={getUsuario} /> 
        </Box>
}

export function PublicacoesBox({userId}){
    
    return <Box alignItems="center">
            <Titulo>Publicações</Titulo>
            {/* {dataPost.length>0 ? <VirtualizedPosts w="100%" dataPost={dataPost}/> : <TextoNegrito fontFamily="Poppins_500Medium">Sem publicações para mostrar.</TextoNegrito>} */}
            <VirtualizedPosts userId={userId} localDeRenderizacao="perfil"/>
        </Box>
}

export function PerfilBox({objetoARenderizar, seguir}: IPerfilBox){
    return(
        <ScrollView w="100%" display="flex">
            <FotoCapaBox fotoPerfilSource={objetoARenderizar.fotoPerfil || ''} fotoCapaSource={objetoARenderizar.fotoCapa || ''} />
            <TextoBox nomeCompleto={objetoARenderizar.nomeCompleto || ''} tag={objetoARenderizar.tag || ''} descricao={objetoARenderizar.descricao || ''}/>
            <BotoesPerfilBox curso={objetoARenderizar.curso || ''} seguir={seguir} getUsuario={objetoARenderizar}/>
            <PublicacoesBox userId={objetoARenderizar.userId}/>
        </ScrollView>
    )
}