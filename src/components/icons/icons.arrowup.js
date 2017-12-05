import React from 'react'
import { svgStyles } from './style'

export const ArrowUp = (styles) => {
    return(
        <svg style={svgStyles(styles)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8">
            <polygon points="8 5 8 8 4 3 0 8 0 5 4 0 8 5"/>
        </svg>
    )
}
