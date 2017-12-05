import React from 'react'
import { svgStyles } from './style'

export const Cog = (styles) => {
    return(
        <svg style={svgStyles(styles)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M16 9V7l-2.1-.3a6.1 6.1 0 0 0-.8-2L14.4 3l-1.5-1.4-1.6 1.3a6 6 0 0 0-2-.8L9 0H7l-.3 2.1a5.9 5.9 0 0 0-2 .9L3 1.6 1.6 3.1l1.3 1.7a6 6 0 0 0-.8 2L0 7v2l2.2.3a6.1 6.1 0 0 0 .8 1.9l-1.4 1.7L3 14.4 4.8 13a6 6 0 0 0 1.9.8L7 16h2l.3-2.2a5.9 5.9 0 0 0 1.9-.8l1.7 1.3 1.4-1.4-1.3-1.7a6 6 0 0 0 .8-2zm-8 1.5A2.5 2.5 0 1 1 10.5 8 2.5 2.5 0 0 1 8 10.5z"/>
        </svg>
    )
}
