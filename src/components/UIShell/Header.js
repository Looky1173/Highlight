import classNames from 'classnames';
import React from 'react';

import styles from './UIShell.module.css';

const Header = ({ className: customClassName, children, ...rest }) => {
	const className = classNames(styles.header, customClassName);

	return (
		<header {...rest} className={className}>
			{children}
		</header>
	);
};

export default Header;
