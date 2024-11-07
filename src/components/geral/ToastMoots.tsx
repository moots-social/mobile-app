import { CloseIcon, Icon, Pressable, Toast, ToastDescription, ToastTitle, VStack } from "@gluestack-ui/themed";

// todos os toasts da aplicação vão abrir na parte inferior da tela

export const abrirToast = (toast: any, action: string, children: string, titulo?: string, duration?: number, close=true)=>{
    toast.show({
        placement: 'bottom',
        duration: duration,
        render: ({ id })=>{
            const toastId = 'toast-' + id
            return(
                <Toast nativeID={toastId} action={action} variant="outline" w={350} >
                    <VStack flex={1}>
                        {titulo && <ToastTitle>{titulo}</ToastTitle>}
                        <ToastDescription fontFamily="Poppins_400Regular">
                            {children}
                        </ToastDescription>
                    </VStack>
                    {close && (
                        <Pressable mt="$1" onPress={() => toast.close(id)}>
                            <Icon as={CloseIcon} color="#000" />
                        </Pressable>
                    )}
                </Toast>
            )
        }
    })
}