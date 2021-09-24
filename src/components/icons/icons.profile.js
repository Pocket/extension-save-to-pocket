import React from 'react'
import { svgStyles } from './style'

export const Profile = styles => {
  return (
    <svg
      style={svgStyles(styles)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16">
      <path d="M1,13.8 C1,11.6663595 3.49496183,9 8,9 C12.5050382,9 15,11.6662177 15,13.8 C15,14.390659 14.439278,15 13.7272727,15 L2.27272727,15 C1.56072203,15 1,14.4006199 1,13.8 Z M8,7 C6.34314575,7 5,5.65685425 5,4 C5,2.34314575 6.34314575,1 8,1 C9.65685425,1 11,2.34314575 11,4 C11,5.65685425 9.65685425,7 8,7 Z"></path>
    </svg>
  )
}
