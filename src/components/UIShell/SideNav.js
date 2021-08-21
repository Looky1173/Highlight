import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import { CARBON_SIDENAV_ITEMS } from './_utils';
// TO-DO: comment back in when footer is added for rails
// import SideNavFooter from './SideNavFooter';

import styles from './UIShell.module.css';

const SideNav = React.forwardRef(function SideNav(props, ref) {
	const {
		expanded: expandedProp,
		defaultExpanded,
		isChildOfHeader,
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledBy,
		children,
		onToggle,
		className: customClassName,
		// TO-DO: comment back in when footer is added for rails
		// translateById: t,
		isFixedNav,
		isRail,
		expandOnHover,
		isPersistent,
		addFocusListeners,
		addMouseListeners,
		onOverlayClick,
		...other
	} = props;

	const { current: controlled } = useRef(expandedProp !== undefined);
	const [expandedState, setExpandedState] = useState(defaultExpanded);
	const [expandedViaHoverState, setExpandedViaHoverState] = useState(defaultExpanded);
	const expanded = controlled ? expandedProp : expandedState;
	const handleToggle = (event, value = !expanded) => {
		if (!controlled) {
			setExpandedState(value);
		}
		if (onToggle) {
			onToggle(event, value);
		}
		if ((controlled || isRail) && expandOnHover) {
			setExpandedViaHoverState(value);
		}
	};

	const accessibilityLabel = {
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledBy,
	};

	// TO-DO: comment back in when footer is added for rails
	// const assistiveText = expanded
	//   ? t('carbon.sidenav.state.open')
	//   : t('carbon.sidenav.state.closed');

	const className = classNames({
		[styles['side-nav']]: true,
		[styles['side-nav-expanded']]: expanded || expandedViaHoverState,
		[styles['side-nav-collapsed']]: !expanded && isFixedNav,
		[styles['side-nav-rail']]: isRail,
		[customClassName]: !!customClassName,
		[styles['side-nav-ux']]: isChildOfHeader,
		[styles['side-nav-hidden']]: !isPersistent,
		[styles['side-nav-doNotExpandOnHover']]: !expandOnHover,
	});

	const overlayClassName = classNames({
		[styles['side-nav-overlay']]: true,
		[styles['side-nav-overlay-active']]: expanded || expandedViaHoverState,
	});

	let childrenToRender = children;

	// if a rail, pass the expansion state as a prop, so children can update themselves to match
	if (isRail) {
		childrenToRender = React.Children.map(children, (child) => {
			// if we are controlled, check for if we have hovered over or the expanded state, else just use the expanded state (uncontrolled)
			let currentExpansionState = controlled ? expandedViaHoverState || expanded : expanded;
			// avoid spreading `isSideNavExpanded` to non-Carbon UI Shell children
			return React.cloneElement(child, {
				...(CARBON_SIDENAV_ITEMS.includes(child.type?.displayName)
					? {
							isSideNavExpanded: currentExpansionState,
					  }
					: {}),
			});
		});
	}

	let eventHandlers = {};

	if (addFocusListeners) {
		eventHandlers.onFocus = (event) => {
			if (!event.currentTarget.contains(event.relatedTarget)) {
				handleToggle(event, true);
			}
		};
		eventHandlers.onBlur = (event) => {
			if (!event.currentTarget.contains(event.relatedTarget)) {
				handleToggle(event, false);
			}
		};
	}

	if (addMouseListeners && isRail) {
		eventHandlers.onMouseEnter = () => handleToggle(true, true);
		eventHandlers.onMouseLeave = () => handleToggle(false, false);
	}

	return (
		<>
			{isFixedNav ? null : (
				<div className={overlayClassName} onClick={onOverlayClick} />
			)}
			<nav aria-hidden={!expanded} ref={ref} className={`${styles['side-nav-navigation']} ${className}`} {...accessibilityLabel} {...eventHandlers} {...other}>
				{childrenToRender}
			</nav>
		</>
	);
});

SideNav.defaultProps = {
	// TO-DO: comment back in when footer is added for rails
	// translateById: (id) => {
	//   const translations = {
	//     'carbon.sidenav.state.open': 'Close',
	//     'carbon.sidenav.state.closed': 'Open',
	//   };
	//   return translations[id];
	// },
	defaultExpanded: false,
	isChildOfHeader: true,
	isFixedNav: false,
	isPersistent: true,
	addFocusListeners: true,
	addMouseListeners: true,
};

export default SideNav;
