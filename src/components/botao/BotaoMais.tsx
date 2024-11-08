import { Box, Image, Modal, ModalBackdrop, ModalBody, ModalContent, ModalHeader, Text } from "@gluestack-ui/themed"
import { useNavigation } from "@react-navigation/native"
import { useState, useRef, useEffect } from "react"
import { Pressable } from "react-native"
import { BarraPesquisaChat } from "../barra/BarraPesquisa"
import { getIdStorage, getTokenStorage } from "../../utils/storageUtils"
import { usuarioApi } from "../../api/apis"
import { UsuarioContext } from "../../context/UsuarioContext"

const maisIcon = require('../../assets/MaisIcon.png')

export function BotaoNovoPost({...rest}){
    const navigation = useNavigation()

    return <Pressable {...rest} onPress={()=>navigation.navigate('novoPost')}>
            <Image source={maisIcon} w={70} h={70} alt='novo post'/>
        </Pressable>
}

export function BotaoNovoChat({...rest}){
    const [isModalVisivel, setModalVisivel] = useState<boolean>(false)
    const ref = useRef(null)

    return (
            <Pressable {...rest} onPress={()=>setModalVisivel(true)}>
                <Image source={maisIcon} w={70} h={70} alt='novo chat'/>
                <Modal isOpen={isModalVisivel} onClose={()=>setModalVisivel(false)} finalFocusRef={ref}>
                    <ModalBackdrop />
                    <ModalContent>
                        <BarraPesquisaChat />
                        <Box h={348} p={20}>

                        </Box>
                    </ModalContent>
                </Modal>
            </Pressable>
    )
}