import {
    AlertDialog,
    AlertDialogBackdrop,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogCloseButton,
    AlertDialogFooter,
    AlertDialogBody,
    Image,
  } from '@gluestack-ui/themed';
import { TextoNegrito, Titulo } from './Texto';

const fecharIcon = require('../assets/FecharIcon.png')

// todo - propriedades, botões, estrutura
export default function AlertDialogGreen({titulo, conteudo}){
    return(
        <AlertDialog bg="$white">
            <AlertDialogBackdrop />
            <AlertDialogContent>
                <AlertDialogHeader>
                    <Titulo>{titulo}</Titulo>
                    <AlertDialogCloseButton>
                        <Image source={fecharIcon}/>
                    </AlertDialogCloseButton>
                </AlertDialogHeader>
                <AlertDialogBody>
                    <TextoNegrito>{conteudo}</TextoNegrito>
                </AlertDialogBody>
                <AlertDialogFooter>

                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}