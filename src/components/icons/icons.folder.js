import React from 'react'
import { svgStyles } from './style'

export const Folder = (styles) => {
    return(
        <svg style={svgStyles(styles)} viewBox="0 0 16 16">
            <path opacity='0.8' d="M14.9,5H15V3a1,1,0,0,0-1-1H10L9,1H2A1,1,0,0,0,1,2V5H1.1a1,1,0,0,0-1,1.1l0.8,7a1,1,0,0,0,1,.9H14.1a1,1,0,0,0,1-.9l0.8-7A1,1,0,0,0,14.9,5ZM3,3H8L9,4h4V5H3V3Zm10,9H3L2,7H14Z"/>
        </svg>
    )
}
