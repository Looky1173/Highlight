import React, { Component, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import Link from '../Link';
import { Checkbox16, CheckboxCheckedFilled16, ChevronDown16 } from '@carbon/icons-react';
import { keys, matches } from '../../internal/keyboard';
import { composeEventHandlers } from '../../tools/events';

import styles from './Tile.module.css';

export class Tile extends Component {

	static defaultProps = {
		light: false,
	};

	render() {
		const { children, className, light, ...other } = this.props;
		const tileClasses = classNames(
			styles.tile,
			{
				[styles['tile-light']]: light,
			},
			className
		);
		return (
			<div className={tileClasses} {...other}>
				{children}
			</div>
		);
	}
}

/*
export class ClickableTile extends Component {
	state = {};

	static defaultProps = {
		clicked: false,
		handleClick: () => {},
		handleKeyDown: () => {},
		light: false,
	};

	handleClick = (evt) => {
		evt.persist();
		this.setState(
			{
				clicked: !this.state.clicked,
			},
			() => {
				this.props.handleClick(evt);
			}
		);
	};

	handleKeyDown = (evt) => {
		evt.persist();
		if (matches(evt, [keys.Enter, keys.Space])) {
			this.setState(
				{
					clicked: !this.state.clicked,
				},
				() => {
					this.props.handleKeyDown(evt);
				}
			);
		} else {
			this.props.handleKeyDown(evt);
		}
	};

	static getDerivedStateFromProps({ clicked }, state) {
		const { prevClicked } = state;
		return prevClicked === clicked
			? null
			: {
					clicked,
					prevClicked: clicked,
			  };
	}

	render() {
		const {
			children,
			href,
			className,
			handleClick,
			handleKeyDown,
			clicked,
			light,
			...other
		} = this.props;

		const classes = classNames(
			`${prefix}--tile`,
			`${prefix}--tile--clickable`,
			{
				[`${prefix}--tile--is-clicked`]: this.state.clicked,
				[`${prefix}--tile--light`]: light,
			},
			className
		);

		return (
			<Link href={href} className={classes} {...other} onClick={this.handleClick} onKeyDown={this.handleKeyDown}>
				{children}
			</Link>
		);
	}
}

export function SelectableTile(props) {
	const {
		children,
		id,
		tabIndex = 0,
		value,
		name,
		title,
		iconDescription,
		className,
		handleClick,
		handleKeyDown,
		onClick = () => {},
		onChange = () => {},
		onKeyDown = () => {},
		light,
		disabled,
		selected,
		...other
	} = props;

	// TODO: replace with onClick when handleClick prop is deprecated
	const clickHandler = handleClick || onClick;

	// TODO: replace with onClick when handleClick prop is deprecated
	const keyDownHandler = handleKeyDown || onKeyDown;

	const [isSelected, setIsSelected] = useState(selected);
	const input = useRef(null);
	const classes = classNames(
		`${prefix}--tile`,
		`${prefix}--tile--selectable`,
		{
			[`${prefix}--tile--is-selected`]: isSelected,
			[`${prefix}--tile--light`]: light,
			[`${prefix}--tile--disabled`]: disabled,
		},
		className
	);
	const inputClasses = classNames(`${prefix}--tile-input`, {
		[`${prefix}--tile-input--checked`]: isSelected,
	});

	// TODO: rename to handleClick when handleClick prop is deprecated
	function handleOnClick(evt) {
		evt.preventDefault();
		evt.persist();
		setIsSelected(!isSelected);
		clickHandler(evt);
		onChange(evt);
	}

	// TODO: rename to handleKeyDown when handleKeyDown prop is deprecated
	function handleOnKeyDown(evt) {
		evt.persist();
		if (matches(evt, [keys.Enter, keys.Space])) {
			evt.preventDefault();
			setIsSelected(!isSelected);
			onChange(evt);
		}
		keyDownHandler(evt);
	}

	function handleChange(event) {
		setIsSelected(event.target.checked);
		onChange(event);
	}

	useEffect(() => {
		setIsSelected(selected);
	}, [selected]);

	return (
		<>
			<input
				ref={input}
				tabIndex={-1}
				id={id}
				className={inputClasses}
				value={value}
				onChange={!disabled ? handleChange : null}
				type='checkbox'
				disabled={disabled}
				name={name}
				title={title}
				checked={isSelected}
			/>
			<label
				htmlFor={id}
				className={classes}
				tabIndex={!disabled ? tabIndex : null}
				{...other}
				onClick={!disabled ? handleOnClick : null}
				onKeyDown={!disabled ? handleOnKeyDown : null}
			>
				<span className={`${prefix}--tile__checkmark ${prefix}--tile__checkmark--persistent`}>{isSelected ? <CheckboxCheckedFilled16 /> : <Checkbox16 />}</span>
				<span className={`${prefix}--tile-content`}>{children}</span>
			</label>
		</>
	);
}
SelectableTile.defaultProps = {
	value: 'value',
	title: 'title',
	selected: false,
	tabIndex: 0,
	light: false,
};

export class ExpandableTile extends Component {
	state = {};

	static defaultProps = {
		tabIndex: 0,
		expanded: false,
		tileMaxHeight: 0,
		tilePadding: 0,
		onBeforeClick: () => true,
		handleClick: () => {},
		tileCollapsedIconText: 'Interact to expand Tile',
		tileExpandedIconText: 'Interact to collapse Tile',
		light: false,
	};

	static getDerivedStateFromProps(
		{ expanded, tileMaxHeight, tilePadding },
		state
	) {
		const { prevExpanded, prevTileMaxHeight, prevTilePadding, expanded: currentExpanded, tileMaxHeight: currentTileMaxHeight, tilePadding: currentTilePadding } = state;
		const expandedChanged = prevExpanded !== expanded;
		const tileMaxHeightChanged = prevTileMaxHeight !== tileMaxHeight;
		const tilePaddingChanged = prevTilePadding !== tilePadding;
		return !expandedChanged && !tileMaxHeightChanged && !tilePaddingChanged
			? null
			: {
					expanded: !expandedChanged ? currentExpanded : expanded,
					tileMaxHeight: !tileMaxHeightChanged ? currentTileMaxHeight : tileMaxHeight,
					tilePadding: !tilePaddingChanged ? currentTilePadding : tilePadding,
					prevExpanded: expanded,
					prevTileMaxHeight: tileMaxHeight,
					prevTilePadding: tilePadding,
			  };
	}

	componentDidMount = () => {
		if (this.tile) {
			const getStyle = window.getComputedStyle(this.tile, null);

			if (this.aboveTheFold) {
				this.setState({
					tileMaxHeight: this.aboveTheFold.getBoundingClientRect().height,
					tilePadding: parseInt(getStyle.getPropertyValue('padding-top'), 10) + parseInt(getStyle.getPropertyValue('padding-bottom'), 10),
				});
			}
		}
	};

	componentDidUpdate = (prevProps) => {
		if (prevProps.expanded !== this.props.expanded) {
			this.setMaxHeight();
		}
	};

	setMaxHeight = () => {
		if (this.state.expanded ? this.tileContent : this.aboveTheFold) {
			this.setState({
				tileMaxHeight: this.state.expanded ? this.tileContent.getBoundingClientRect().height : this.aboveTheFold.getBoundingClientRect().height,
			});
		}
	};

	handleClick = (evt) => {
		if (!this.props.onBeforeClick(evt) || evt.target.tagName === 'INPUT') {
			return;
		}
		evt.persist();
		this.setState(
			{
				expanded: !this.state.expanded,
			},
			() => {
				this.setMaxHeight();
				this.props.handleClick(evt);
			}
		);
	};

	handleKeyUp = (evt) => {
		if (evt.target !== this.tile) {
			if (matches(evt, [keys.Enter, keys.Space])) {
				evt.preventDefault();
			}
		}
	};

	getChildren = () => {
		return React.Children.toArray(this.props.children);
	};

	render() {
		const {
			tabIndex,
			className,
			expanded,
			tileMaxHeight,
			tilePadding,
			handleClick,
			onClick,
			onKeyUp,
			tileCollapsedIconText,
			tileExpandedIconText,
			tileCollapsedLabel,
			tileExpandedLabel,
			onBeforeClick,
			light,
			...other
		} = this.props;

		const { expanded: isExpanded } = this.state;

		const classes = classNames(
			`${prefix}--tile`,
			`${prefix}--tile--expandable`,
			{
				[`${prefix}--tile--is-expanded`]: isExpanded,
				[`${prefix}--tile--light`]: light,
			},
			className
		);

		const tileStyle = {
			maxHeight: isExpanded ? null : this.state.tileMaxHeight + this.state.tilePadding,
		};

		const childrenAsArray = this.getChildren();

		return (
			<button
				type='button'
				ref={(tile) => {
					this.tile = tile;
				}}
				style={tileStyle}
				className={classes}
				aria-expanded={isExpanded}
				title={isExpanded ? tileExpandedIconText : tileCollapsedIconText}
				{...other}
				onKeyUp={composeEventHandlers([onKeyUp, this.handleKeyUp])}
				onClick={composeEventHandlers([onClick, this.handleClick])}
				tabIndex={tabIndex}
			>
				<div
					ref={(tileContent) => {
						this.tileContent = tileContent;
					}}
				>
					<div
						ref={(aboveTheFold) => {
							this.aboveTheFold = aboveTheFold;
						}}
						className={`${prefix}--tile-content`}
					>
						{childrenAsArray[0]}
					</div>
					<div className={`${prefix}--tile__chevron`}>
						<span>{isExpanded ? tileExpandedLabel : tileCollapsedLabel}</span>
						<ChevronDown16 />
					</div>
					<div className={`${prefix}--tile-content`}>{childrenAsArray[1]}</div>
				</div>
			</button>
		);
	}
}

export class TileAboveTheFoldContent extends Component {
	render() {
		const { children } = this.props;

		return <span className={`${prefix}--tile-content__above-the-fold`}>{children}</span>;
	}
}

export class TileBelowTheFoldContent extends Component {
	render() {
		const { children } = this.props;

		return <span className={`${prefix}--tile-content__below-the-fold`}>{children}</span>;
	}
}
*/