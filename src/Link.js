import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {Link as RouterLink, withRouter} from "react-router-dom";

import { NavigationContext } from './Navigation';

/**
 * @description
 * Change transitions on the fly.
 *
 * @afterProps
 * \*Ref and other props are passed to [react router `<Link />`](https://reacttraining.com/react-router/web/api/Link).
 *
 * @example
 * import { Link, glide } from "react-tiger-transition";
 *
 * <Link to='/a' transition={glide}>
 *   A
 * </Link>
 *
 * <Link to='/b' transition={() => glide({...args})}>
 *   B
 * </Link>
 *
 * <Link to='/c' transition='my-css-animation'>
 *   C
 * </Link>
 *
 * @footer
 * \*Refer to [transitions API](transitions), for more details about transitions.
 *
 */
const Link = React.forwardRef(({
  match,
  location,
  history,
  staticContext,

  transition,
  children,
  onClick,
  to,
  ...other,
},ref) => {

  const {
    setTransition,
    defaultTransition,
    onTransition
  } = useContext(NavigationContext)

  return (
    <RouterLink
      onClick={() => {
        setTransition(transition || defaultTransition)
        if (typeof onClick === 'function') onClick();
      }}
      ref={ref}
      to={onTransition ? location.pathname : to}
      {...other}
    >
      {children}
    </RouterLink>
  )
})

Link.propTypes = {
  /**
   * Transition/animation to be applied when changing route.
   * String if using CSS animations.
   * Object or a function returning an object with props to be
   * passed to `<Transition />` component from react-transition-group.
   * Default value comes from context, defined in `<Navigation />` component.
   */
  transition: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.func,
  ]),
  /**
   * Function fired on link click.
   */
  onClick: PropTypes.func,
}

export default withRouter(Link)
