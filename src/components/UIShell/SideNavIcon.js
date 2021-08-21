import classNames from 'classnames';
import React from 'react';

import styles from './UIShell.module.css';

const SideNavIcon = ({ children, className: customClassName }) => {
  const className = classNames({
    [styles['side-nav-icon']]: true,
    [customClassName]: !!customClassName,
  });
  return <div className={className}>{children}</div>;
};

SideNavIcon.defaultProps = {
  small: false,
};

export default SideNavIcon;