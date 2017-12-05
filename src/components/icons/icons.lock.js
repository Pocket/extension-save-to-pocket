import React from 'react'
import { svgStyles } from './style'

export const Lock = (styles) => {
    return(
        <svg style={svgStyles(styles)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path d="M5,6V5A2,2,0,0,1,7,3H9a2,2,0,0,1,2,2V6h3V3.6A3.6,3.6,0,0,0,10.4,0H5.6A3.6,3.6,0,0,0,2,3.6V6H5Z"/>
            <path d="M2,7v7a2,2,0,0,0,2,2h8a2,2,0,0,0,2-2V7H2Zm7,6a1,1,0,0,1-2,0V10a1,1,0,0,1,2,0v3Z"/>
        </svg>
    )
}
