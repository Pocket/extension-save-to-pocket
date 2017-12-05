import React from 'react'
import { svgStyles } from './style'

export const Bookmark = (styles) => {
    return(
        <svg style={svgStyles(styles)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <rect x="5" y="4" width="6" height="1" />
              <rect x="5" y="6" width="1" height="1" />
              <rect x="7" y="6" width="1" height="1" />
              <rect x="9" y="6" width="1" height="1" />
              <rect x="5" y="8" width="4" height="1" />
              <path d="M12,2V13.3l-2.9-2L8,10.6l-1.1.8L4,13.3V2h8m0.4-2H3.6A1.6,1.6,0,0,0,2,1.6V14.4A1.6,1.6,0,0,0,3.6,16L8,13l4.4,3A1.6,1.6,0,0,0,14,14.4V1.6A1.6,1.6,0,0,0,12.4,0h0Z" />
        </svg>
    )
}
