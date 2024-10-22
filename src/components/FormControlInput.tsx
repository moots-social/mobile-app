import { FormControl, Input, Text } from "@gluestack-ui/themed-native-base";
import { StyledShadowBox } from "../screen/login/Cadastro";
import { ITextareaProps } from "@gluestack-ui/textarea/lib/typescript/types";

interface Props extends ITextareaProps{
    label: string,
    loginOuCadastro?: boolean
}

export default function FormControlInput({label, loginOuCadastro=false, ...rest} : Props ){
    return (
      <FormControl {...rest} w="100%" alignItems={!loginOuCadastro ? "center" : "flex-start"}>

        <FormControl.Label>
          <Text color="#7D7D7D" fontFamily="Poppins_600SemiBold">
            {label}
          </Text>
        </FormControl.Label>

        <StyledShadowBox w="100%">
          <Input
            borderRadius={30}
            fontFamily="Poppins_500Medium"
            bg="#FFFFFF"
            {...rest}
          />
        </StyledShadowBox>
      </FormControl>
    );
}

