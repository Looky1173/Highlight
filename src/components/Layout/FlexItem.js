import styled from 'styled-components';

const FlexItem = styled.div`
	grid-column-end: ${({ width = 1 }) => `span ${width}`};
	grid-row-end: ${({ height = 1 }) => `span ${height}`};
	display: flex;
	${({ order }) => order && `order: ${order}`};
	${({ grow }) => grow && `flex-grow: ${grow}`};
	${({ shrink }) => shrink && `flex-shrink: ${shrink}`};
	${({ basis }) => basis && `flex-basis: ${basis}`};
	${({ flex }) => flex && `flex: ${flex}`};
    ${({ noFlex }) => noFlex && `display: block`};
	${({ align }) => align && `align-self: ${align}`};
	${({ left }) => left && `justify-content: flex-start`};
	${({ center }) => center && `justify-content: center`};
	${({ right }) => right && `justify-content: flex-end`};
	${({ top }) => top && `align-items: flex-start`};
	${({ middle }) => middle && `align-items: center`};
	${({ bottom }) => bottom && `align-items: flex-end`};
	${/* prettier-ignore */ ({ centered }) => centered && `
    justify-content: center;
    align-items: center;
    `};
`;

export default FlexItem;
