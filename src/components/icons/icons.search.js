import React from 'react'
import { svgStyles } from './style'

export const Search = (styles) => {
    return (
        <svg style={svgStyles(styles)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path d="M16,14.6l-6-6A5.5,5.5,0,1,0,8.6,10l6,6ZM2,5.5A3.5,3.5,0,1,1,5.5,9,3.5,3.5,0,0,1,2,5.5Z"/>
        </svg>
    )
}
