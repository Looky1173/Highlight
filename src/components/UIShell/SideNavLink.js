import classNames from 'classnames';
import React from 'react';
import Link from './Link';
import SideNavIcon from './SideNavIcon';
import SideNavItem from './SideNavItem';
import SideNavLinkText from './SideNavLinkText';

import styles from './UIShell.module.css';

const SideNavLink = React.forwardRef(function SideNavLink({ className: customClassName, children, renderIcon: IconElement, isActive, large, ...rest }, ref) {
	const className = classNames({
		[styles['side-nav-link']]: true,
		[styles['side-nav-link-current']]: isActive,
		[customClassName]: !!customClassName,
	});

	return (
		<SideNavItem large={large}>
			<Link {...rest} className={className} ref={ref}>
				{IconElement && (
					<SideNavIcon small>
						<IconElement />
					</SideNavIcon>
				)}
				<SideNavLinkText>{children}</SideNavLinkText>
			</Link>
		</SideNavItem>
	);
});

SideNavLink.defaultProps = {
	element: 'a',
	large: false,
};

// eslint-disable-next-line react/display-name
export const createCustomSideNavLink = (element) => (props) => {
	return <SideNavLink element={element} {...props} />;
};

export default SideNavLink;
