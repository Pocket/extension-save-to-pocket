import React from 'react'
import { svgStyles } from './style'

export const Overflow = () => {
    return(
        <svg style={svgStyles({marginRight:0,width:'20px',height:'20px'})} viewBox="0 0 100 100">
           <path d="M15 40c5.46 0 10 4.54 10 10s-4.54 10-10 10S5 55.46 5 50s4.54-10 10-10zm60 10c0 5.46 4.54 10 10 10s10-4.54 10-10-4.54-10-10-10-10 4.54-10 10zm-35 0c0 5.46 4.54 10 10 10s10-4.54 10-10-4.54-10-10-10-10 4.54-10 10z"/>
        </svg>
    )
}
