import React from 'react'
import { svgStyles } from './style'

export const Moon = (styles) => {
    return(
        <svg style={svgStyles(styles)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path d="M5.9,0A8.2,8.2,0,0,0,2,1C5.9,1.3,8.9,4.1,8.9,8a8,8,0,0,1-5.5,7.6,8.2,8.2,0,0,0,2.4.4A8.1,8.1,0,0,0,14,8,8.1,8.1,0,0,0,5.9,0Z"/>
        </svg>
    )
}
