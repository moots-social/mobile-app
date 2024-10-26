import { Box, Image, Modal, ModalBackdrop, ModalBody, ModalContent, ModalHeader, Text } from "@gluestack-ui/themed"
import { useNavigation } from "@react-navigation/native"
import { useState, useRef } from "react"
import { Pressable } from "react-native"
import { BarraPesquisaChat } from "./BarraPesquisa"

const maisIcon = require('../assets/MaisIcon.png')

export function BotaoNovoPost({...rest}){
    const navigation = useNavigation()

    return <Pressable {...rest} onPress={()=>navigation.navigate('novoPost')}>
            <Image source={maisIcon} w={70} h={70}/>
        </Pressable>
}

export function BotaoNovoChat({...rest}){
    const [isModalVisivel, setModalVisivel] = useState<boolean>(false)
    const ref = useRef(null)

    return (
            <Pressable {...rest} onPress={()=>setModalVisivel(true)}>
                <Image source={maisIcon} w={70} h={70}/>
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