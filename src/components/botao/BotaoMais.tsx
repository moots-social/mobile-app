import { Box, Pressable, Icon, Image, Modal, ModalBackdrop, ModalBody, ModalContent, ModalHeader, Text } from "@gluestack-ui/themed"
import { useNavigation } from "@react-navigation/native"
import { useState, useRef, useEffect } from "react"
import { Pressable } from "react-native"
import { BarraPesquisaChat } from "../barra/BarraPesquisa"
import { getIdStorage, getTokenStorage } from "../../utils/storageUtils"
import { usuarioApi } from "../../api/apis"
import {EditIcon} from 'lucide-react-native'
import { UsuarioContext } from "../../context/UsuarioContext"

const maisIcon = require('../../assets/MaisIcon.png')

export function BotaoNovoPost({...rest}){
    const navigation = useNavigation()

    return <Pressable  bg='$lightQuatro' p={20} rounded={30} {...rest} onPress={()=>navigation.navigate('novoPost')}>
                <Icon as={EditIcon} color='$white' />
        </Pressable>
}

export function BotaoNovoChat({...rest}){
    const [isModalVisivel, setModalVisivel] = useState<boolean>(false)
    const ref = useRef(null)

    return (
            <Pressable {...rest} onPress={()=>setModalVisivel(true)}>
                <Icon as={EditIcon} color='$white'/>
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