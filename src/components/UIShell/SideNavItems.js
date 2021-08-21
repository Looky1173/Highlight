import classNames from 'classnames';
import React from 'react';
import { CARBON_SIDENAV_ITEMS } from './_utils';

import styles from './UIShell.module.css';

const SideNavItems = ({ className: customClassName, children, isSideNavExpanded }) => {
	const className = classNames([styles['side-nav-items']], customClassName);
	const childrenWithExpandedState = React.Children.map(children, (child) => {
		if (React.isValidElement(child)) {
			// avoid spreading `isSideNavExpanded` to non-Carbon UI Shell children
			return React.cloneElement(child, {
				...(CARBON_SIDENAV_ITEMS.includes(child.type?.displayName)
					? {
							isSideNavExpanded,
					  }
					: {}),
			});
		}
	});
	return <ul className={className}>{childrenWithExpandedState}</ul>;
};

export default SideNavItems;
