import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { composeEventHandlers } from '../../tools/events';
import { keys, matches } from '../../internal/keyboard';
/*import toggleClass from '../../tools/toggleClass';*/

import styles from './Button.module.css'
console.log(styles)

const Button = React.forwardRef(function Button(
	{
		children,
		as,
		className,
		disabled,
		small,
		size,
		kind,
		href,
		isExpressive,
		isSelected,
		tabIndex,
		type,
		renderIcon: ButtonImageElement,
		dangerDescription,
		iconDescription,
		hasIconOnly,
		onClick,
		onBlur,
		onFocus,
		onMouseEnter,
		onMouseLeave,
		...other
	},
	ref
) {
	const [isHovered, setIsHovered] = useState(false);
	const [isFocused, setIsFocused] = useState(false);

	const handleFocus = (evt) => {
		if (hasIconOnly) {
			setIsHovered(!isHovered);
			setIsFocused(true);
		}
	};

	const handleBlur = () => {
		if (hasIconOnly) {
			setIsHovered(false);
			setIsFocused(false);
		}
	};

	const handleMouseEnter = (evt) => {
		if (hasIconOnly) {
			setIsHovered(true);
		}
	};

	const handleMouseLeave = () => {
	};

	const handleClick = (evt) => {
	};

	useEffect(() => {
		const handleEscKeyDown = (event) => {
			if (matches(event, [keys.Escape])) {
				setIsHovered(false);
			}
		};
		document.addEventListener('keydown', handleEscKeyDown);
		return () => document.removeEventListener('keydown', handleEscKeyDown);
	}, []);

	const buttonClasses = classNames(className, {
		[styles.btn]: true,
		[styles['btn-sm']]: (size === 'small' && !isExpressive) || (size === 'sm' && !isExpressive) || (small && !isExpressive),
		[styles['btn-md']]: (size === 'field' && !isExpressive) || (size === 'md' && !isExpressive),
		// V11: change lg to xl
		[styles['btn-lg']]: size === 'lg',
		// V11: change xl to 2xl
		[styles['btn-xl']]: size === 'xl',
		[styles[`btn-${kind}`]]: kind,/*
		[`${prefix}--btn--disabled`]: disabled,
		[`${prefix}--btn--expressive`]: isExpressive,*/
		[styles['btn-iconOnly']]: hasIconOnly,/*
		[`${prefix}--btn--selected`]: hasIconOnly && isSelected && kind === 'ghost',*/
	});

	const commonProps = {
		tabIndex,
		className: buttonClasses,
		ref,
	};

	const buttonImage = !ButtonImageElement ? null : <ButtonImageElement aria-label={iconDescription} className={styles['btn-icon']} aria-hidden='true' />;

	const dangerButtonVariants = ['danger', 'danger--tertiary', 'danger--ghost'];

	let component = 'button';
	const assistiveId = 'danger-description';
	let otherProps = {
		disabled,
		type,
		'aria-describedby': dangerButtonVariants.includes(kind) ? assistiveId : null,
		'aria-pressed': hasIconOnly && kind === 'ghost' ? isSelected : null,
	};
	const anchorProps = {
		href,
	};

	let assistiveText;
	if (hasIconOnly) {
	} else {
		assistiveText = null;
	}

	if (as) {
		component = as;
		otherProps = {
			...otherProps,
			...anchorProps,
		};
	} else if (href && !disabled) {
		component = 'a';
		otherProps = anchorProps;
	}
	return React.createElement(
		component,
		{
			onMouseEnter: composeEventHandlers([onMouseEnter, handleMouseEnter]),
			onMouseLeave: composeEventHandlers([onMouseLeave, handleMouseLeave]),
			onFocus: composeEventHandlers([onFocus, handleFocus]),
			onBlur: composeEventHandlers([onBlur, handleBlur]),
			onClick: composeEventHandlers([handleClick, onClick]),
			...other,
			...commonProps,
			...otherProps,
		},
		assistiveText,
		children,
		buttonImage
	);
});

Button.displayName = 'Button';

Button.defaultProps = {
	tabIndex: 0,
	type: 'button',
	disabled: false,
	kind: 'primary',
	size: 'default',
	isExpressive: false,
};

export default Button;
