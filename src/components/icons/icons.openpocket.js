import React from 'react'
import { svgStyles } from './style'

export const OpenPocket = () => {
    return(
        <svg style={svgStyles()} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path d="M14.05,13.95v-4a1,1,0,0,0-2,0V13h-9V5H6A1,1,0,0,0,6,3h-4a1,1,0,0,0-1,1V14a1,1,0,0,0,1,1h11a1,1,0,0,0,1-1s0,0,0,0h0Z"/>
            <path d="M15.06,1h-5a1,1,0,1,0,0,2h1.58L6.17,8.28A1,1,0,1,0,7.56,9.72l5.5-5.31V6a1,1,0,0,0,2,0V2h0V1Z"/>
        </svg>
    )
}
