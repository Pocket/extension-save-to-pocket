import React from 'react'
import { svgStyles } from './style'

export const Save = (styles) => {
    return (
        <svg style={svgStyles(styles)} className="icon icon-save" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26">
            <path alt="Save to Pocket" d="M26,4a2,2,0,0,0-2-2H2A2,2,0,0,0,0,4v9c0,0.1,0,.2,0,0.4s0,0.4,0,.6c0,4,5.8,11,13,11s13-7,13-11c0-.2,0-0.4,0-0.6s0-.2,0-0.4V4Zm-5.5,7-6,6a1.9,1.9,0,0,1-2.9,0l-6-6A1.7,1.7,0,0,1,8,8.5l5,5,5-5a1.7,1.7,0,0,1,2.5,0h0A1.7,1.7,0,0,1,20.5,11Z" />
        </svg>
    )
}
