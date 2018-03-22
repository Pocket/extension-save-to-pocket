import React from 'react'
import { svgStyles } from './style'

export const CarretDown = styles => {
    return (
        <svg
            style={svgStyles(styles)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 14 16">
            <path d="M13.64,4.33a1.32,1.32,0,0,0-1.75,0L7,9.26,2.11,4.33a1.32,1.32,0,0,0-1.75,0,1.07,1.07,0,0,0,0,1.6L6,11.67A1.29,1.29,0,0,0,7,12a1.29,1.29,0,0,0,1-.33l5.69-5.74A1.07,1.07,0,0,0,13.64,4.33Z" />
        </svg>
    )
}
