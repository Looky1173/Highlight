import styled from 'styled-components';

const autoRows = ({ minRowHeight = '20px' }) => `minmax(${minRowHeight}, auto)`;

const frGetter = (value) => (typeof value === 'number' ? `repeat(${value}, 1fr)` : value);

const gap = ({ gap = '8px' }) => gap;

const flow = ({ flow = 'row' }) => flow;

const formatAreas = (areas) => areas.map((area) => `"${area}"`).join(' ');

const Grid = styled.div`
	display: grid;
	height: ${({ height = 'auto' }) => height};
	grid-auto-flow: ${flow};
	grid-auto-rows: ${autoRows};
	${({ rows }) => rows && `grid-template-rows: ${frGetter(rows)}`};
	grid-template-columns: ${({ columns = 12 }) => frGetter(columns)};
	grid-gap: ${gap};
	${({ columnGap }) => columnGap && `column-gap: ${columnGap}`};
	${({ rowGap }) => rowGap && `row-gap: ${rowGap}`};
	${({ areas }) => areas && `grid-template-areas: ${formatAreas(areas)}`};
	${({ justifyContent }) => justifyContent && `justify-content: ${justifyContent}`};
	${({ alignContent }) => alignContent && `align-content: ${alignContent}`};
`;

export default Grid;
