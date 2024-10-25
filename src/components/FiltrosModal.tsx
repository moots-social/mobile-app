import { Box, Image, Modal, ModalBackdrop, ModalContent, ModalHeader, Pressable, Divider, ModalBody, Select, Radio, Checkbox, RadioGroup, RadioIndicator, RadioIcon, RadioLabel, CircleIcon, CheckboxIndicator, CheckboxIcon, CheckIcon, CheckboxLabel, ModalFooter, SelectInput, SelectIcon, Icon, ChevronDownIcon, SelectTrigger, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicatorWrapper, SelectDragIndicator, SelectItem} from "@gluestack-ui/themed";
import React, { useState, useEffect } from "react";
import { TextoNegrito, Titulo } from "./Texto";
import BotaoSecao from "./BotaoSecao";

const filtroIcon = require('../assets/FiltroIcon.png')

export default function FiltrosModal({...rest}){

    const [textoBotaoAcao, setTextoBotaoAcao] = useState('Confirmando...')

    const [modalVisivel, setModalVisivel] = useState(false)
    const [botaoVisivel, setBotaoVisivel] = useState(false)

    const [valorRadioGeral, setValorRadioGeral] = useState('tudo')

    const [valorRadioUsuario, setValorRadioUsuario] = useState('qualquerUm')
    const [valorSelectUsuario, setValorSelectUsuario] = useState('Qualquer')

    const [valorCheckPublicacoes, setValorCheckPublicacoes] = useState(true)

    const [eValidoUsuario, setEValidoUsuario] = useState(true)
    const [eValidoPublicacoes, setEValidoPublicacoes] = useState(true)
    const ref = React.useRef(null)

    const handleRadioGeral = ()=>{
        if(valorRadioGeral==='tudo'){
            setEValidoUsuario(true)
            setEValidoPublicacoes(true)
        }
        if(valorRadioGeral==='usuarios'){
            setValorCheckPublicacoes(false)
            setEValidoUsuario(true)
            setEValidoPublicacoes(false)
        } 
        if(valorRadioGeral==='publicacoes'){
            setValorRadioUsuario('')
            setValorSelectUsuario('Qualquer')
            setEValidoUsuario(false)
            setEValidoPublicacoes(true)
        } 
    }

    const handleFechar = (textoBotao: string) => {
        setBotaoVisivel(false)
        setTextoBotaoAcao(textoBotao)
        setTimeout(()=>{
            setModalVisivel(false)
        }, 0.1)
    }

    const handleAbrir = (textoBotao: string) =>{
        setModalVisivel(true)
        setTextoBotaoAcao(textoBotao)
        setTimeout(()=>{
            setBotaoVisivel(true)
        }, 500)
    }

    useEffect(()=>{
        handleRadioGeral()
    }, [valorRadioGeral])


    return(
        <Box {...rest}>

            <Pressable onPress={()=>{handleAbrir('Carregando...')}} ref={ref}>
                <Image source={filtroIcon} w={30} h={30}/>
            </Pressable>

            <Modal isOpen={modalVisivel} onClose={()=>{
                handleFechar('Voltando...')
                setValorRadioGeral('tudo')
                setValorRadioUsuario('qualquerUm')
                setValorCheckPublicacoes(true)
                setValorSelectUsuario('Qualquer')
                }} finalFocusRef={ref}>
                <ModalBackdrop/>

                <ModalContent w="90%" h={472} justifyContent="center">

                    <ModalHeader flexDirection="column">
                        <Titulo>Filtros</Titulo>
                        <Divider />
                    </ModalHeader>

                    <ModalBody>

                        <Box mt={20}>
                            <TextoNegrito fontSize={18}>O que você quer buscar?</TextoNegrito>
                            <RadioGroup value={valorRadioGeral} onChange={setValorRadioGeral} flexDirection="row" justifyContent="space-between" mt={10}>
                                <Radio value="tudo">
                                    <RadioIndicator mr={4} borderColor="$black">
                                        <RadioIcon as={CircleIcon} color="$lightSete" size={1}/>
                                    </RadioIndicator>
                                    <RadioLabel><TextoNegrito>Tudo</TextoNegrito></RadioLabel>
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
                            <RadioGroup value={valorRadioUsuario} onChange={setValorRadioUsuario} flexDirection="row" justifyContent="space-between" mt={10}>
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
                            <Box flexDirection="row" mt={10}>
                                {!eValidoUsuario? <TextoNegrito mt={1} color="$trueGray500">Curso: </TextoNegrito> : <TextoNegrito mt={1}>Curso: </TextoNegrito>}
                                <Select isDisabled={!eValidoUsuario} selectedValue={valorSelectUsuario} onValueChange={setValorSelectUsuario}>
                                    <SelectTrigger variant="rounded" w={200} h={25} borderColor="$black" borderWidth={2}>
                                        <SelectInput />
                                        <SelectIcon mr={5}>
                                            <Icon as={ChevronDownIcon}/>
                                        </SelectIcon>
                                    </SelectTrigger>
                                    <SelectPortal>
                                        <SelectBackdrop />
                                        <SelectContent>
                                            <SelectDragIndicatorWrapper>
                                                <SelectDragIndicator />
                                            </SelectDragIndicatorWrapper>
                                            <SelectItem label="Qualquer" value="Qualquer"/>
                                            <SelectItem label="Desenvolvimento" value="Desenvolvimento"/>
                                            <SelectItem label="Qualidade" value="Qualidade"/>
                                            <SelectItem label="FIC" value="FIC"/>
                                            <SelectItem label="Mecânica" value="Mecanica"/>
                                            <SelectItem label="Redes" value="Redes"/>
                                        </SelectContent>
                                    </SelectPortal>
                                </Select>
                            </Box>
                        </Box>

                        <Box mt={20}>
                            <TextoNegrito fontSize={18}>Publicações</TextoNegrito>
                            <Checkbox isDisabled={!eValidoPublicacoes} value='permitirPost' isChecked={valorCheckPublicacoes} onChange={setValorCheckPublicacoes} mt={10} size='md'>
                                <CheckboxIndicator mr={4} borderColor="$black">
                                    <CheckboxIcon as={CheckIcon} color="$lightSete" bg="$white" rounded={2} />
                                </CheckboxIndicator>
                                <CheckboxLabel><TextoNegrito>Permitir publicações de qualquer um</TextoNegrito></CheckboxLabel>
                            </Checkbox>
                        </Box>

                    </ModalBody>

                    <ModalFooter justifyContent="center" pb={botaoVisivel ? 20 : 30}>
                        {botaoVisivel ? <BotaoSecao onPress={()=>handleFechar('Confirmando...')} w="100%">Confirmar</BotaoSecao> : <TextoNegrito color="#468B51">{textoBotaoAcao}</TextoNegrito>}
                        
                    </ModalFooter>
                </ModalContent>

            </Modal>

        </Box>
    )
}