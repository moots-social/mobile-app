import { Modal, ModalBackdrop, Spinner } from "@gluestack-ui/themed";

interface ILoadingProps{
    size: number | "small" | "large" | undefined
}

export default function Loading({size="large", ...rest}: Partial<ILoadingProps>){
    return (
        <Modal {...rest}>
            <ModalBackdrop/>
            <Spinner size={size} color="$lightSeis"/>
        </Modal>
        )
}

export function BareLoading ({size="small", ...rest}: Partial<ILoadingProps>){
    return <Spinner size={size} color='$lightSeis' {...rest}/>
}