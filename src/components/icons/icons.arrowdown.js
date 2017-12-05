import React from 'react'
import { svgStyles } from './style'

export const ArrowDown = (styles) => {
    return(
        <svg style={svgStyles(styles)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8">
            <polygon points="0 3 0 0 4 5 8 0 8 3 4 8 0 3"/>
        </svg>
    )
}
