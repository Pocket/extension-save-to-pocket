import PropTypes from 'prop-types'
import React from 'react'
import { css } from 'linaria'

const iconStyle = css`
  display: inline-block;
  height: 1em;
  line-height: 0;
  vertical-align: middle;
  margin-top: -0.25em;

  svg {
    height: 100%;
  }
`

// Higher Order Component that wraps individual icon components. Is not intended
// to be imported directly. Styles applied to this component will be applied to
// all icons components.
const Icon = ({ children, className, id, title, description, ...rest }) => {
  const ariaTitle = title ? `${id}-title` : ''
  const ariaDescription = description ? `${id}-description` : ''

  return (
    <span className={`${iconStyle} icon ${className}`} {...rest}>
      {/* svg child is cloned so that we can insert aria attribute and accessibility
      tags based on prop values */}
      {React.cloneElement(
        children,
        {
          // note: only pass valid html/svg attributes here
          'aria-labelledby': `${ariaTitle} ${ariaDescription}`,
        },
        // accessibility tags are passed as children
        [
          title ? (
            <title id={`${id}-title`} key={`${id}-title`}>
              {title}
            </title>
          ) : null,
          description ? (
            <desc id={`${id}-description`} key={`${id}-description`}>
              {description}
            </desc>
          ) : null,
        ]
      )}
    </span>
  )
}

Icon.propTypes = {
  /**
   * The svg markup to be rendered, formatted as valid JSX. This is already provided
   * automatically when importing a named icon from `src/components/icons`.
   */
  children: PropTypes.node.isRequired,

  /**
   * CSS class name to apply to the wrapping span.
   */
  className: PropTypes.string,

  /**
   * Identifier for accessibility tags, if needed. Associates the icon with <title>
   * and <desc> tags if provided.
   */
  id: PropTypes.string,

  /**
   * Title tooltip/accessibility helper for the icon. Should be provided along with
   * an id if the icon is meaningful and not just presentational. Requires id prop.
   */
  title: function (props, propName, componentName, ...rest) {
    if (props[propName]) {
      PropTypes.string(props, propName, componentName, ...rest)

      // id is a prerequisite for title
      if (!props.id) {
        return new Error(
          `"id" prop is also required if ${propName} is passed to ${componentName}`
        )
      }
    }
  },

  /**
   * Description to associate with title/id to aid non-visual users, to provide
   * additional context to the title if necessary. Requires id and title props.
   */
  description: function (props, propName, componentName, ...rest) {
    if (props[propName]) {
      PropTypes.string(props, propName, componentName, ...rest)

      // id and title are a prerequisite for description
      if (!props.id || !props.title) {
        return new Error(
          `"id" and "title" props both required if ${propName} is passed to ${componentName}`
        )
      }
    }
  },
}

Icon.defaultProps = {
  className: '',
  id: '',
  title: null,
  description: null,
}

export default Icon
