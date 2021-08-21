import classNames from 'classnames';
import React from 'react';

import styles from './UIShell.module.css';

const SideNavLinkText = ({ className: customClassName, children, ...rest }) => {
	const className = classNames(styles['side-nav-link-text'], customClassName);
	return (
		<span {...rest} className={className}>
			{children}
		</span>
	);
};

export default SideNavLinkText;
