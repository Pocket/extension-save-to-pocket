import React from 'react'
import { svgStyles } from './style'

export const Disconnected = (styles) => {
    return (
        <svg style={svgStyles(styles)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47 92">
            <path d="M12.5 46.5V26H0L23.5 0 47 26H34.5v18l-6.9-2.8-4.8 2.4-3.5-5.2zm7.2-14.9l4.5 6.8 3.2-1.6 3.1 1.2V22H38L23.5 6 9 22h7.5v13.5z"/>
            <path d="M23.5 92L0 66h12.5V52.2l7.2-7.2 4.2 5.2 3.5-2.6 7.1 4.3V66H47zM9 70l14.5 16L38 70h-7.5V54.2l-2.9-1.7-4.5 3.4-3.8-4.8-2.8 2.8V70H9z"/>
        </svg>
    )
}
