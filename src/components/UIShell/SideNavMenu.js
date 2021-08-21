import { ChevronDown20 } from '@carbon/icons-react';
import classNames from 'classnames';
import React from 'react';
import SideNavIcon from './SideNavIcon';
import { keys, match } from '../../internal/keyboard';

import styles from './UIShell.module.css';

export class SideNavMenu extends React.Component {
  static defaultProps = {
    defaultExpanded: false,
    isActive: false,
    large: false,
  };

  static getDerivedStateFromProps = (props, state) => {
    let derivedState = null;

    if (props.isSideNavExpanded === false && state.isExpanded === true) {
      derivedState = {
        isExpanded: props.isSideNavExpanded,
        wasPreviouslyExpanded: true,
      };
    } else if (
      props.isSideNavExpanded === true &&
      state.wasPreviouslyExpanded === true
    ) {
      derivedState = {
        isExpanded: props.isSideNavExpanded,
        wasPreviouslyExpanded: false,
      };
    }

    return derivedState;
  };

  constructor(props) {
    super(props);
    this.state = {
      isExpanded: props.defaultExpanded || false,
      wasPreviouslyExpanded: props.defaultExpanded || false,
    };
  }

  handleToggleExpand = () => {
    this.setState((state) => ({ isExpanded: !state.isExpanded }));
  };

  handleKeyDown = (event) => {
    if (match(event, keys.Escape)) {
      this.setState(() => ({ isExpanded: false }));
    }
  };

  render() {
    const {
      buttonRef,
      className: customClassName,
      children,
      renderIcon: IconElement,
      isActive,
      title,
      large,
    } = this.props;
    const { isExpanded } = this.state;

    let hasActiveChild;
    if (children) {
      // if we have children, either a single or multiple, find if it is active
      hasActiveChild = Array.isArray(children)
        ? children.some((child) => {
            if (
              child.props &&
              (child.props.isActive === true || child.props['aria-current'])
            ) {
              return true;
            }
            return false;
          })
        : children.props &&
          (children.props.isActive === true || children.props['aria-current']);
    }

    const className = classNames({
      [styles['side-nav-item']]: true,
      [styles['side-nav-item-active']]:
        isActive || (hasActiveChild && !isExpanded),
      [styles['side-nav-item-icon']]: IconElement,
      [styles['side-nav-item-large']]: large,
      [customClassName]: !!customClassName,
    });
    return (
      <li className={className} onKeyDown={this.handleKeyDown}>
        <button
          aria-expanded={isExpanded}
          className={styles['side-nav-submenu']}
          onClick={this.handleToggleExpand}
          ref={buttonRef}
          type="button">
          {IconElement && (
            <SideNavIcon>
              <IconElement />
            </SideNavIcon>
          )}
          <span className={styles['side-nav-submenu-title']}>{title}</span>
          <SideNavIcon className={styles['side-nav-submenu-chevron']} small>
            <ChevronDown20 />
          </SideNavIcon>
        </button>
        <ul className={styles['side-nav-menu']}>{children}</ul>
      </li>
    );
  }
}

const SideNavMenuForwardRef = React.forwardRef((props, ref) => {
  return <SideNavMenu {...props} buttonRef={ref} />;
});

SideNavMenuForwardRef.displayName = 'SideNavMenu';
export default SideNavMenuForwardRef;