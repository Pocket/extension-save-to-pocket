import React from 'react'
import { svgStyles } from './style'

export const ArrowLeft = (styles) => {
    return(
        <svg style={svgStyles(styles)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8">
            <polygon points="5,0 8,0 3,4 8,8 5,8 0,4 "/>
        </svg>
    )
}
