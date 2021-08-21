import classNames from 'classnames';
import React from 'react';
import Link from './Link';

import styles from './UIShell.module.css'

const HeaderName = ({
  children,
  className: customClassName,
  prefix,
  href,
  ...rest
}) => {
  const className = classNames(styles['header-name'], customClassName);
  return (
    <Link {...rest} className={className} href={href}>
      {prefix && (
        <>
          <span className={styles['header-name-prefix']}>
            {prefix}
          </span>
          &nbsp;
        </>
      )}
      {children}
    </Link>
  );
};

HeaderName.defaultProps = {
  prefix: 'IBM',
};

export default HeaderName;