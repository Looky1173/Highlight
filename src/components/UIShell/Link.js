import React from 'react';

/**
 * Link is a custom component that allows us to supporting rendering elements
 * other than `a` in our markup. The goal is to allow users to support passing
 * in their own components to support use-cases like `react-router` or
 * `@reach/router`
 */
const Link = React.forwardRef(function Link(props, ref) {
  const {
    element,
    isSideNavExpanded,
    ...rest
  } = props;
  return React.createElement(element, { ...rest, ref });
});

Link.displayName = 'Link';
Link.defaultProps = {
  element: 'a',
};

export default Link;