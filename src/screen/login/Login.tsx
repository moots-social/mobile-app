import { Box, Text, VStack, config } from "@gluestack-ui/themed-native-base";
import React from "react";
import { configer } from "../../Config/gluestack-ui.config";
import { styled } from "@gluestack-style/react";

const StyledVStack = styled(VStack, {
  display: "flex",
  justifyContent: "flex-end",
  bg: configer.tokens.colorsProject.dark.quatro,
  width: '100%',
  height: "100%"
}); 


export default function Login() {
  return (
    <StyledVStack>
      <Box bg="white" borderTopLeftRadius={50} borderTopRightRadius={50} width="100%" height="50%" display="flex" alignItems="center">
        <Text fontFamily="Poppins_100Thin"> Realize o login e aproveite</Text>
      </Box>
    </StyledVStack>
  );
}
