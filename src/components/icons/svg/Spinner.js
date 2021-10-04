import React from 'react'

export default ({ children, ...rest }) => (
  <svg
    {...rest}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect
      x="10.576"
      width="2.847"
      height="7.729"
      rx="1.424"
      fill="currentColor"
      fillOpacity=".4"
    />
    <rect
      x="10.576"
      y="16.271"
      width="2.847"
      height="7.729"
      rx="1.424"
      fill="currentColor"
      fillOpacity=".3"
    />
    <rect
      x="24"
      y="10.576"
      width="2.847"
      height="7.729"
      rx="1.424"
      transform="rotate(90 24 10.576)"
      fill="currentColor"
      fillOpacity=".4"
    />
    <rect
      x="7.729"
      y="10.576"
      width="2.847"
      height="7.729"
      rx="1.424"
      transform="rotate(90 7.729 10.576)"
      fill="currentColor"
      fillOpacity=".3"
    />
    <rect
      x="21.419"
      y="19.551"
      width="2.642"
      height="7.927"
      rx="1.321"
      transform="rotate(135 21.42 19.551)"
      fill="currentColor"
      fillOpacity=".3"
    />
    <rect
      x="10.054"
      y="8.186"
      width="2.642"
      height="7.927"
      rx="1.321"
      transform="rotate(135 10.054 8.186)"
      fill="currentColor"
      fillOpacity=".3"
    />
    <rect
      x="4.449"
      y="21.419"
      width="2.642"
      height="7.927"
      rx="1.321"
      transform="rotate(-135 4.449 21.42)"
      fill="currentColor"
      fillOpacity=".3"
    />
    <rect
      x="15.815"
      y="10.054"
      width="2.642"
      height="7.927"
      rx="1.321"
      transform="rotate(-135 15.815 10.054)"
      fill="currentColor"
    />
    {children}
  </svg>
)
