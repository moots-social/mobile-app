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
    AlertDialogBackdrop,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogCloseButton,
    AlertDialogBody,
    AlertDialogFooter,
  } from '@gluestack-ui/themed';
import { AlertDialog } from '@gluestack-ui/themed-native-base';
  import { ReactNode, useRef, useState } from 'react';

  interface IAlertDialogBrancoProps{
      titulo: string,
      botao1?: string,
      botao2?: string,
      corBotao1?: string,
      corBotao2?: string,
      onPressBotao1?: any,
      onPressBotao2?: any,
      children: ReactNode
  }
  interface IAlertDialogBrancoConfirmarProps{
      titulo: string,
      children: ReactNode
  }

  const fecharIcon = require('../assets/FecharIcon.png')
  
    export function AlertDialogBranco({titulo, botao1='Sim', botao2='Não', corBotao1, corBotao2, onPressBotao1, onPressBotao2, children, ...rest}: IAlertDialogBrancoProps){
    
      return(
            <AlertDialog bg="$white" {...rest}>
                <AlertDialogBackdrop />
                <AlertDialogContent alignItems="center" w={240}>
                    <AlertDialogHeader flexDirection="column" w="100%" p={0}>
                        <AlertDialogCloseButton alignSelf="flex-end" mt={5} mr={5}>
                            <Image source={fecharIcon} w={10} h={10}/>
                        </AlertDialogCloseButton>
                        <Text fontSize={18} fontFamily='Poppins_700Bold' color="#303030">{titulo}</Text>
                    </AlertDialogHeader>
                    <AlertDialogBody>
                        <Text textAlign="center" fontSize={14} fontFamily='Poppins_600SemiBold' color="#505050">{children}</Text>
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <ButtonGroup>
                            <AlertDialogCloseButton variant="solid" bg={corBotao1 || '$red'} >
                                <ButtonText fontFamily="Poppins_500Medium" color='$white' >{botao1}</ButtonText>
                            </AlertDialogCloseButton>
                            <AlertDialogCloseButton variant="outline" bg={corBotao2 || ''} brc="$lightQuatro" >
                                <ButtonText fontFamily="Poppins_500Medium" color="$lightQuatro">{botao2}</ButtonText>
                            </AlertDialogCloseButton>
                        </ButtonGroup>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        )
    }
    export function ModalConfirmar({titulo, children, ...rest}: IAlertDialogBrancoConfirmarProps){

        return(
            <Modal bg="$white"{...rest}>
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
                    <ModalCloseButton bg="$lightSete" px={20} pt={10}>
                        <Text fontFamily="Poppins_500Medium" color="$white" >Ok</Text>
                    </ModalCloseButton>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}