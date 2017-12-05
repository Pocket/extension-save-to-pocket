import React from 'react'
import { svgStyles } from './style'

export const Added = (styles) => {
    return (
        <svg style={svgStyles(styles)} viewBox="0 0 16 16">
            <path d="M8,0a8,8,0,1,0,8,8A8,8,0,0,0,8,0Zm5,9H9v4H7V9H3V7H7V3H9V7h4V9Z"/>
        </svg>
    )
}
