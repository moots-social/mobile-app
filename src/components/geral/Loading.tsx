import { Modal, ModalBackdrop, Spinner } from "@gluestack-ui/themed";

interface ILoadingProps{
    size?: number | "small" | "large" | undefined
}

export default function Loading({size="large", ...rest}: ILoadingProps){
    return (
        <Modal {...rest}>
            <ModalBackdrop/>
            <Spinner size={size} color="$lightSeis"/>
        </Modal>
        )
}