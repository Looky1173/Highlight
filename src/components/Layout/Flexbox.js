import styled from 'styled-components';

const Flexbox = styled.div`
	display: flex;
    ${({ gap }) => gap && `gap: ${gap}`};
	${({ direction }) => direction && `flex-direction: ${direction}`};
    ${({ wrap }) => wrap && `flex-wrap: ${wrap}`};
    ${({ justifyContent }) => justifyContent && `justify-content: ${justifyContent}`};
    ${({ alignItems }) => alignItems && `align-items: ${alignItems}`};
    ${({ alignContent }) => alignContent && `align-content: ${alignContent}`};
`;

export default Flexbox;
