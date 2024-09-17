import { Box, Text, VStack, config } from "@gluestack-ui/themed-native-base";
import React from "react";
import { configer } from "../../Config/gluestack-ui.config";
import { styled } from "@gluestack-style/react";

const StyledVStack = styled(VStack, {
  display: "flex",
  justifyContent: "start",
  p: 5,
  bg: configer.tokens.colorsProject.dark.quatro,
  width: '100%',
  height: "100%"
  
}); 


export default function Login() {
  return (
    <StyledVStack>
      <Box borderWidth={1} borderColor={"black"} width="100%" height="50%">
        <Text>Olá</Text>
      </Box>
    </StyledVStack>
  );
}
