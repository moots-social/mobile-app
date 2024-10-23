import {
    Modal,
    ModalBackdrop,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalFooter,
    ModalBody,
    Image,
    Text,
    ButtonGroup,
    Button,
    ButtonText,
  } from '@gluestack-ui/themed';
  import { ReactNode, useRef, useState } from 'react';

  interface IModalDialogBrancoProps{
      titulo: string,
      botao1?: string,
      botao2?: string,
      children: ReactNode
  }
  interface IModalDialogConfirmarProps{
      titulo: string,
      children: ReactNode
  }

  const fecharIcon = require('../assets/FecharIcon.png')
  
export function ModalDialogBranco({titulo, botao1='Sim', botao2='Não', children, ...rest}: IModalDialogBrancoProps){
    return(
        <Modal bg="$white" {...rest}>
            <ModalBackdrop />
            <ModalContent alignItems="center" w={240}>
                <ModalHeader flexDirection="column" w="100%" p={0}>
                    <ModalCloseButton alignSelf="flex-end" mt={5} mr={5}>
                        <Image source={fecharIcon} w={10} h={10}/>
                    </ModalCloseButton>
                    <Text fontSize={18} fontFamily='Poppins_700Bold' color="#303030">{titulo}</Text>
                </ModalHeader>
                <ModalBody>
                    <Text textAlign="center" fontSize={14} fontFamily='Poppins_600SemiBold' color="#505050">{children}</Text>
                </ModalBody>
                <ModalFooter>
                    <ButtonGroup>
                        <ModalCloseButton bg="$lightSete" px="$3.5" pt="$3">
                            <ButtonText fontFamily="Poppins_500Medium" color="$white">{botao1}</ButtonText>
                        </ModalCloseButton>
                        <ModalCloseButton brw={1} brc="$lightQuatro" px="$3.5" pt="$3">
                            <ButtonText color="$lightQuatro" fontFamily="Poppins_500Medium">{botao2}</ButtonText>
                        </ModalCloseButton>
                    </ButtonGroup>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
    export function ModalConfirmar({titulo, children, ...rest}: IModalDialogConfirmarProps){
        return(
            <Modal bg="$white" {...rest}>
            <ModalBackdrop />
            <ModalContent alignItems="center">
                <ModalHeader flexDirection="column" w="100%" p={0}>
                    <ModalCloseButton alignSelf="flex-end" mt={5} mr={5}>
                        <Image source={fecharIcon} w={10} h={10}/>
                    </ModalCloseButton>
                    <Text fontSize={18} fontFamily='Poppins_700Bold' color="#303030">{titulo}</Text>
                </ModalHeader>
                <ModalBody>
                    <Text textAlign="center" fontSize={14} fontFamily='Poppins_600SemiBold' color="#505050">{children}</Text>
                </ModalBody>
                <ModalFooter>
                    <ModalCloseButton bg="$lightSete" px="$3.5" pt="$3">
                        <ButtonText fontFamily="Poppins_500Medium" color="$white" >Ok</ButtonText>
                    </ModalCloseButton>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}