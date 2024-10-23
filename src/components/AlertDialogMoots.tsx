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

  interface IAlertDialogBrancoProps{
      titulo: string,
      botao1?: string,
      botao2?: string,
      children: ReactNode
  }
  interface IAlertDialogBrancoConfirmarProps{
      titulo: string,
      children: ReactNode
  }

  const fecharIcon = require('../assets/FecharIcon.png')
  
  //   export function AlertDialogBranco({titulo, botao1='Sim', botao2='Não', children, ...rest}: IAlertDialogBrancoProps){
    
  //     return(
    //         <AlertDialog bg="$white" {...rest}>
    //             <AlertDialogBackdrop />
    //             <AlertDialogContent alignItems="center" w={240}>
    //                 <AlertDialogHeader flexDirection="column" w="100%" p={0}>
    //                     <AlertDialogCloseButton alignSelf="flex-end" mt={5} mr={5}>
    //                         <Image source={fecharIcon} w={10} h={10}/>
    //                     </AlertDialogCloseButton>
    //                     <Text fontSize={18} fontFamily='Poppins_700Bold' color="#303030">{titulo}</Text>
    //                 </AlertDialogHeader>
    //                 <AlertDialogBody>
    //                     <Text textAlign="center" fontSize={14} fontFamily='Poppins_600SemiBold' color="#505050">{children}</Text>
    //                 </AlertDialogBody>
    //                 <AlertDialogFooter>
    //                     <ButtonGroup>
    //                         <Button variant="solid" bg="$lightSete" onPress={()=>setIsAberto(false)}>
    //                             <ButtonText>{botao1}</ButtonText>
    //                         </Button>
    //                         <Button variant="outline" brc="$lightQuatro" onPress={()=>setIsAberto(false)}>
    //                             <ButtonText color="$lightQuatro">{botao2}</ButtonText>
    //                         </Button>
    //                     </ButtonGroup>
    //                 </AlertDialogFooter>
    //             </AlertDialogContent>
    //         </AlertDialog>
    //     )
    // }
    export function ModalConfirmar({titulo, children, ...rest}: IAlertDialogBrancoConfirmarProps){
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
                    <ModalCloseButton bg="$lightSete" px={20} pt={10}>
                        <Text fontFamily="Poppins_500Medium" color="$white" >Ok</Text>
                    </ModalCloseButton>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}