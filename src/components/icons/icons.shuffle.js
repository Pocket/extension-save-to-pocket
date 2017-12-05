import React from 'react'
import { svgStyles } from './style'

export const Shuffle = () => {
    return (
        <svg style={svgStyles()} className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <title>Shuffle Collection</title>
          <path d="M74.9,34.4H81v9.9L98,27,81,10V21.3H74.9c-17.4,0-27.2,12.9-35.8,24.3S24.7,65.4,13.8,65.4H4V78.6h9.8c17.4,0,27.2-13.7,35.8-25.1S64.1,34.4,74.9,34.4ZM29.4,42L31.7,39c1.8-2.4,3.8-5,5.9-7.5-6.2-5.8-13.7-10.1-23.7-10.1H4V34.6s2.8-.1,9.8,0S24.9,37.5,29.4,42ZM81,65.5H74.9c-6.6,0-11.7-3.3-16.4-8.2l-1.4,1.9c-2.1,2.7-4.3,5.7-6.8,8.6C56.7,74,64.4,78.7,74.9,78.7H81V90L98,73,81,55.7v9.8Z"/>
        </svg>
    )
}
