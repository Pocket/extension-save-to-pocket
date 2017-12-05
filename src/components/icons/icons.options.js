import React from 'react'
import { svgStyles } from './style'

export const Options = (styles) => {
    return(
        <svg style={svgStyles(styles)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90">
          <path d="M45 0C20.1 0 0 20.1 0 45s20.1 45 45 45 45-20.1 45-45S69.9 0 45 0zm0 86.5C22.1 86.5 3.5 67.9 3.5 45S22.1 3.5 45 3.5 86.5 22.1 86.5 45 67.9 86.5 45 86.5z"/>
          <circle cx="45" cy="45" r="3.5"/>
          <circle cx="30" cy="45" r="3.5"/>
          <circle cx="60" cy="45" r="3.5"/>
        </svg>
    )
}
