import { Image, Modal, ModalBackdrop, ModalContent } from "@gluestack-ui/themed";

interface IImageModalProps{
    uri: string
}

export default function ImagemModal({uri, ...rest}: IImageModalProps){
    return <Modal {...rest}>
        <ModalBackdrop />
            <Image source={uri} w="90%" h="80%" rounded={20}/>
    </Modal>
}