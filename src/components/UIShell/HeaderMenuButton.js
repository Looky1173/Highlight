import { Close20, Menu20 } from '@carbon/icons-react';

import classNames from 'classnames';
import React from 'react';

import styles from './UIShell.module.css';

const HeaderMenuButton = ({ 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, className: customClassName, renderMenuIcon, renderCloseIcon, onClick, isActive, isCollapsible, ...rest }) => {
	const className = classNames({
		[customClassName]: !!customClassName,
		[styles['header-action']]: true,
		[styles['header-menu-trigger']]: true,
		[styles['header-action-active']]: isActive,
		[styles['header-menu-toggle']]: true,
		[styles['header-menu-toggle-hidden']]: !isCollapsible,
	});
	const accessibilityLabel = {
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledBy,
	};
	const menuIcon = renderMenuIcon ? renderMenuIcon : <Menu20 />;
	const closeIcon = renderCloseIcon ? renderCloseIcon : <Close20 />;

	return (
		<button {...rest} {...accessibilityLabel} className={className} title={ariaLabel} type='button' onClick={onClick}>
			{isActive ? closeIcon : menuIcon}
		</button>
	);
};

export default HeaderMenuButton;
