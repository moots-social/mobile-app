import { Box, styled } from "@gluestack-ui/themed";
import { StyledShadowBox } from "./Contato";

export const RoundedBottom = styled(StyledShadowBox, {
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10
})
export const RoundedTop = styled(StyledShadowBox, {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
})
export const FullRounded = styled(StyledShadowBox, {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10
})
export const RoundedBottomSemSombra = styled(Box, {
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10
})
export const RoundedTopSemSombra = styled(Box, {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
})
export const FullRoundedSemSombra = styled(Box, {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10
})