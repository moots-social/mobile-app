import { FormControl, Input, Text } from "@gluestack-ui/themed-native-base";
import { StyledShadowBox } from "../screen/login/Cadastro";
import { ITextareaProps } from "@gluestack-ui/textarea/lib/typescript/types";

interface Props extends ITextareaProps{
    label: string,
}

export default function FormControlInput({label, ...rest} : Props ){
    return (
      <FormControl {...rest} w="100%" alignItems="center">

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
          />
        </StyledShadowBox>
      </FormControl>
    );
}