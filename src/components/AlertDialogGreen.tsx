import {
    AlertDialog,
    AlertDialogBackdrop,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogCloseButton,
    AlertDialogFooter,
    AlertDialogBody,
    Image,
    Text,
    ButtonGroup,
    Button,
    ButtonText,
  } from '@gluestack-ui/themed';
import { ReactNode } from 'react';


interface IAlertDialogGreenProps{
    titulo: string,
    botao1?: string,
    botao2?: string,
    children: ReactNode
}
const fecharIcon = require('../assets/FecharIcon.png')

export default function AlertDialogGreen({titulo, botao1='Sim', botao2='Não', children}: IAlertDialogGreenProps){
    return(
        <AlertDialog bg="$white" isOpen={false} >
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
                        <Button variant="solid" bg="$lightSete">
                            <ButtonText>{botao1}</ButtonText>
                        </Button>
                        <Button variant="outline" brc="$lightQuatro">
                            <ButtonText color="$lightQuatro">{botao2}</ButtonText>
                        </Button>
                    </ButtonGroup>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}