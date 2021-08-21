import classNames from 'classnames';
import React from 'react';

import styles from './UIShell.module.css';

const Content = ({ className: customClassName, withSideNav, isSideNavExpanded, children, tagName, ...rest }) => {
	const className = classNames(styles.content, {[styles['content-withSideNav']]: withSideNav, [styles['content-withSideNavExpanded']]: isSideNavExpanded}, customClassName);
	return React.createElement(
		tagName,
		{
			...rest,
			className,
		},
		children
	);
};

Content.defaultProps = {
	tagName: 'main',
};

export default Content;
