import React from 'react'
import { svgStyles } from './style'

export const Close = (width = '16px', height= '16px') => {
    return(
        <svg style={svgStyles({width, height})} viewBox="0 0 50 50" >
            <polygon  points="44,13.649 36.349,6 24.999,17.35 13.649,6 6,13.651 17.349,25 6,36.35 13.649,44 24.999,32.65   36.35,44 44,36.35 32.649,25 "></polygon>
        </svg>
    )
}
