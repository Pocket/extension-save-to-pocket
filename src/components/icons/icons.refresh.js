import React from 'react'
import { svgStyles } from './style'

export const Refresh = () => {
    return(
        <svg style={svgStyles()} className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <path d="M94.9,52.3L66.3,66.5l7.6,5.1a32,32,0,0,1-41.6,5.1c-9.1-6-13.8-14.3-14.1-24.4L5,52.6c0.3,14.2,7.4,26.4,20.2,34.9a44.9,44.9,0,0,0,59.6-8.7L93,84.2ZM26.1,28.5a32.1,32.1,0,0,1,41.6-5.2c9.1,6.1,14.4,14,14.7,24.1L95,47.7c-0.3-14.2-7.4-26.7-20.2-35.2a44.9,44.9,0,0,0-59.6,8.7L7,15.8l-1.9,32L33.8,33.6Z" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.06"/>
        </svg>
    )
}
