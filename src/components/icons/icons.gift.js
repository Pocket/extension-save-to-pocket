import React from 'react'
import { svgStyles } from './style'

export const Gift = (styles) => {
    return(
        <svg style={svgStyles(styles)} viewBox="0 0 16 16" >
            <path d="M6.5 5a.5.5 0 1 1-.5.5.5.5 0 0 1 .5-.5m0-1A1.5 1.5 0 1 0 8 5.5 1.5 1.5 0 0 0 6.5 4z"/>
            <path d="M9 4a1 1 0 1 1-1 1 1 1 0 0 1 1-1m0-1a2 2 0 1 0 2 2 2 2 0 0 0-2-2z"/>
            <path d="M10 6H2v4h1v5h10v-5h1V6h-4zM3 7h3v2H3V7zm1 7v-4h2v4H4zm3 0V7h2v7H7zm5 0h-2v-4h2v4zm1-5h-3V7h3v2z"/>
        </svg>
    )
}
