import classNames from 'classnames';
import React from 'react';

import styles from './UIShell.module.css';

const SideNavItem = ({ className: customClassName, children, large = false }) => {
	const className = classNames({
		[styles['side-nav-item']]: true,
		[styles['side-nav-item-large']]: large,
		[customClassName]: !!customClassName,
	});
	return <li className={className}>{children}</li>;
};

export default SideNavItem;
