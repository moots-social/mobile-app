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
import { TextoNegrito, Titulo } from './Texto';

const fecharIcon = require('../assets/FecharIcon.png')

// todo - propriedades, botões, estrutura
export default function AlertDialogGreen({titulo, children}){
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
                            <ButtonText>Sim</ButtonText>
                        </Button>
                        <Button variant="outline" brc="$lightQuatro">
                            <ButtonText color="$lightQuatro">Não</ButtonText>
                        </Button>
                    </ButtonGroup>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}