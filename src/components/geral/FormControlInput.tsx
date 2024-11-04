import { FormControl, Input, Text } from "@gluestack-ui/themed-native-base";
import { StyledShadowBox } from "../../screen/login/CadastroScreen";
import { ITextareaProps } from "@gluestack-ui/textarea/lib/typescript/types";
import React from "react";

interface Props extends ITextareaProps{
    label: string,
    loginOuCadastro?: boolean,
    onChange?: any,
    mbb: string
}

export default function FormControlInput({label, loginOuCadastro=false, onChange, mbb, ...rest} : Props ){
    
  return (
      <FormControl mb={mbb} {...rest} w="100%" alignItems={!loginOuCadastro ? "center" : "flex-start"}>

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
            onChange={onChange ? onChange : ''}
            {...rest}
          />
        </StyledShadowBox>
      </FormControl>
    );
}

