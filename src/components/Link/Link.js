import React from 'react';
import classNames from 'classnames';

import styles from './Link.module.css';

const Link = ({ children, className, href, disabled, inline, visited, renderIcon: Icon, size, ...other }) => {
	const classes = classNames(styles.link, className, {
		[styles['link-disabled']]: disabled,
		[styles['link-inline']]: inline,
		[styles['link-visited']]: visited,
		[styles[`link-${size}`]]: size,
	});

	const Tag = disabled ? 'p' : 'a';
	const rel = other.target === '_blank' ? 'noopener' : null;
	return (
		<Tag href={disabled ? null : href} className={classes} rel={rel} {...other}>
			{children}
			{!inline && Icon && (
				<div className={styles['link-icon']}>
					<Icon />
				</div>
			)}
		</Tag>
	);
};

export default Link;
