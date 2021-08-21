import classNames from 'classnames';
import React from 'react';
import SideNavLinkText from './SideNavLinkText';
import Link from './Link';

import styles from './UIShell.module.css';

const SideNavMenuItem = React.forwardRef(function SideNavMenuItem(props, ref) {
	const { children, className: customClassName, isActive, ...rest } = props;
	const className = classNames(styles['side-nav-menu-item'], customClassName);
	const linkClassName = classNames({
		[styles['side-nav-link']]: true,
		[styles['side-nav-link-current']]: isActive,
	});

	return (
		<li className={className}>
			<Link {...rest} className={linkClassName} ref={ref}>
				<SideNavLinkText>{children}</SideNavLinkText>
			</Link>
		</li>
	);
});

export default SideNavMenuItem;
