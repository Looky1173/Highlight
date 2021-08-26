import React from 'react';
import { useTheme, Select } from '@geist-ui/react';
import { Moon, Sun } from '@geist-ui/react-icons';

import styled from 'styled-components';

const ThemeSelector = ({ onThemeChange }) => {
	const theme = useTheme();
	const changeHandler = (val) => {
		onThemeChange && onThemeChange(val);
	};

	return (
		<>
			<Select scale={0.5} pure value={theme.type} onChange={changeHandler} title='Switch themes' style={{ width: 'min-content', minWidth: 'unset' }}>
				<Select.Option label>Defaults</Select.Option>
				<Select.Option value='light'>
					<SelectContent>
						<Sun size={14} />
						Light
					</SelectContent>
				</Select.Option>
				<Select.Option value='dark'>
					<SelectContent>
						<Moon size={14} />
						Dark
					</SelectContent>
				</Select.Option>
			</Select>
		</>
	);
};

const SelectContent = styled.span`
	width: auto;
	height: 18px;
	display: flex;
	justify-content: center;
	align-items: center;

	& svg {
		margin-right: 0.5rem;
	}
`;

export default ThemeSelector;
