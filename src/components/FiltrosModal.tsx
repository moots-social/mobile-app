import { Box, Image, Modal, ModalBackdrop, ModalContent, ModalHeader, Pressable, Divider, ModalBody, Select, Radio, Checkbox, RadioGroup, RadioIndicator, RadioIcon, RadioLabel, CircleIcon, CheckboxGroup, CheckboxIndicator, CheckboxIcon, CheckIcon, CheckboxLabel, ModalFooter } from "@gluestack-ui/themed";
import React, { useState, useEffect } from "react";
import { TextoNegrito, Titulo } from "./Texto";
import BotaoSecao from "./BotaoSecao";

const filtroIcon = require('../assets/filtroIcon.png')

export default function FiltrosModal(){

    const [modalVisivel, setModalVisivel] = useState(false)

    const [valorRadioGeral, setValorRadioGeral] = useState('todos')
    const [valorRadioUsuario, setValorRadioUsuario] = useState('')
    
    const [valorCheckPublicacoes, setValorCheckPublicacoes] = useState(['', ''])

    const [eValidoUsuario, setEValidoUsuario] = useState(true)
    const [eValidoPublicacoes, setEValidoPublicacoes] = useState(true)
    const ref = React.useRef(null)

    const handleRadioGeral = ()=>{
        if(valorRadioGeral==='todos'){
            setEValidoUsuario(true)
            setEValidoPublicacoes(true)
        }
        if(valorRadioGeral==='usuarios'){
            setValorCheckPublicacoes(['', ''])
            setEValidoUsuario(true)
            setEValidoPublicacoes(false)
        } 
        if(valorRadioGeral==='publicacoes'){
            setValorRadioUsuario(false)
            setEValidoUsuario(false)
            setEValidoPublicacoes(true)
        } 
    }

    useEffect(()=>{
        handleRadioGeral()
    }, [valorRadioGeral])

    return(
        <Box>
            <Pressable onPress={()=>setModalVisivel(true)} ref={ref}>
                <Image source={filtroIcon} size="2xs"/>
            </Pressable>
            <Modal isOpen={modalVisivel} onClose={()=>setModalVisivel(false)}>
                <ModalBackdrop/>
                <ModalContent w="90%" h={442} justifyContent="center">
                    <ModalHeader flexDirection="column">
                        <Titulo>Filtros</Titulo>
                        <Divider />
                    </ModalHeader>
                    <ModalBody>
                        <Box mt={20}>
                            <TextoNegrito fontSize={18}>Geral</TextoNegrito>
                            <RadioGroup value={valorRadioGeral} onChange={setValorRadioGeral} flexDirection="row" justifyContent="space-between">
                                <Radio value="todos">
                                    <RadioIndicator mr={4} borderColor="$black">
                                        <RadioIcon as={CircleIcon} color="$lightSete" size={1}/>
                                    </RadioIndicator>
                                    <RadioLabel><TextoNegrito>Todos</TextoNegrito></RadioLabel>
                                </Radio>
                                <Radio value="usuarios">
                                    <RadioIndicator mr={4} borderColor="$black">
                                        <RadioIcon as={CircleIcon} color="$lightSete" size={1}/>
                                    </RadioIndicator>
                                    <RadioLabel><TextoNegrito>Usuários</TextoNegrito></RadioLabel>
                                </Radio>
                                <Radio value="publicacoes">
                                    <RadioIndicator mr={4} borderColor="$black">
                                        <RadioIcon as={CircleIcon} color="$lightSete" size={1}/>
                                    </RadioIndicator>
                                    <RadioLabel ><TextoNegrito>Public.</TextoNegrito></RadioLabel>
                                </Radio>
                            </RadioGroup>
                        </Box>
                        <Box mt={20}>
                            <TextoNegrito fontSize={18}>Usuários</TextoNegrito>
                            <RadioGroup value={valorRadioUsuario} onChange={setValorRadioUsuario} flexDirection="row" justifyContent="space-between">
                                <Radio value="quemSegue" isDisabled={!eValidoUsuario}>
                                    <RadioIndicator mr={4} borderColor="$black">
                                        <RadioIcon as={CircleIcon} color="$lightSete" size={1}/>
                                    </RadioIndicator>
                                    <RadioLabel><TextoNegrito>Quem você segue</TextoNegrito></RadioLabel>
                                </Radio>
                                <Radio value="qualquerUm" isDisabled={!eValidoUsuario}>
                                    <RadioIndicator mr={4} borderColor="$black">
                                        <RadioIcon as={CircleIcon} color="$lightSete" size={1}/>
                                    </RadioIndicator>
                                    <RadioLabel><TextoNegrito>Qualquer um</TextoNegrito></RadioLabel>
                                </Radio>
                            </RadioGroup>
                            <TextoNegrito mt={1}>Curso: </TextoNegrito>
                        </Box>
                        <Box mt={20}>
                            <TextoNegrito fontSize={18}>Publicações</TextoNegrito>
                            <CheckboxGroup value={valorCheckPublicacoes} onChange={setValorCheckPublicacoes}>
                                <Checkbox isDisabled={!eValidoPublicacoes} value='permitirPost'>
                                    <CheckboxIndicator mr={4} borderColor="$black">
                                        <CheckboxIcon as={CheckIcon} color="$lightSete" bg="$white" rounded={2} />
                                    </CheckboxIndicator>
                                    <CheckboxLabel><TextoNegrito>Permitir publicações de qualquer um</TextoNegrito></CheckboxLabel>
                                </Checkbox>
                                <Checkbox isDisabled={!eValidoPublicacoes} value='dataPost'> 
                                    <CheckboxIndicator mr={4} borderColor="$black">
                                        <CheckboxIcon as={CheckIcon} color="$lightSete" bg="$white" rounded={2} />
                                    </CheckboxIndicator>
                                    <CheckboxLabel><TextoNegrito>Data da publicação: </TextoNegrito></CheckboxLabel>
                                </Checkbox>
                            </CheckboxGroup>
                        </Box>
                    </ModalBody>
                    <ModalFooter justifyContent="center">
                        <BotaoSecao onPress={()=>setModalVisivel(false)}>
                            Confirmar
                        </BotaoSecao>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}