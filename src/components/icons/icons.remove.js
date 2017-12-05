import React from 'react'
import { svgStyles } from './style'

export const Remove = () => {
    return (
        <svg style={svgStyles()} viewBox="0 0 16 16">
            <path d="M12,2V0H4V2H1V4H15V2H12ZM5,1h6V2H5V1Z"/>
            <polygon points="3 15 13 15 13 5 3 5 3 15"/>
        </svg>
    )
}
