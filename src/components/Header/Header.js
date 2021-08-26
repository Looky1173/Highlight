import { useTheme } from '@geist-ui/react';
import { createContext, useContext } from 'react';

import styled from 'styled-components';

const HeaderContext = createContext();

const Header = ({ children }) => {
	const theme = useTheme();
	console.log(theme);
	return (
		<HeaderContext.Provider value={{}}>
			<HeaderWrapper theme={theme}>
				<HeaderContent>{children}</HeaderContent>
			</HeaderWrapper>
		</HeaderContext.Provider>
	);
};

const HeaderWrapper = styled.div`
	backdrop-filter: saturate(180%) blur(5px);
	position: sticky;
	top: 0;
	display: flex;
	justify-content: center;
	width: 100%;
	max-width: 100%;
	background-color: ${(p) => (p.theme.type === 'light' ? `hsla(0,0%,100%,0.8);` : `rgba(0,0,0,0.5);`)};
	z-index: 101;
	min-height: 80px;
	box-shadow: ${(p) => (p.theme.type === 'light' ? `inset 0 -1px 0 0 rgba(0,0,0,0.1);` : `inset 0 -1px 0 0 hsla(0,0%,100%,0.1);`)};
`;

const HeaderContent = styled.header`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;
	margin: auto;
	padding-left: 24px;
	padding-right: 24px;
`;

function useHeaderContext() {
	var context = useContext(HeaderContext);

	if (!context) {
		throw new Error('Child components of Header cannot be rendered outside the Header component!');
	}

	return context;
}

const Left = ({ children }) => {
	const context = useHeaderContext();

	return <HeaderLeft>{children}</HeaderLeft>;
};

const Middle = ({ children }) => {
	const context = useHeaderContext();

	return <HeaderChildren>{children}</HeaderChildren>;
};

const Right = ({ children }) => {
	const context = useHeaderContext();

	return <HeaderRight>{children}</HeaderRight>;
};

const HeaderChildren = styled.div`
	flex: 1 1;
	display: flex;
	justify-content: center;
	align-items: center;

	& > * {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}
`;

const HeaderLeft = styled(HeaderChildren)`
    & > * {
        margin-right: auto;
        justify-content: flex-start;
    }
`;

const HeaderRight = styled(HeaderChildren)`
    & > * {
        margin-left: auto;
        justify-content: flex-end;
    }
`;

Header.Left = Left;
Header.Middle = Middle;
Header.Right = Right;

export default Header;
