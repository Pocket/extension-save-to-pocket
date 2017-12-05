import React from 'react'
import { svgStyles } from './style'

export const Topsites = (styles) => {
    return(
        <svg style={svgStyles(styles)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <polygon points="8 5 14 11 16 11 8 3 0 11 2 11 8 5"/>
        </svg>
    )
}
