import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import { styleReset } from '../components/_styles/reset'

const root = document.querySelector('#root')

ReactDOM.render(<App className={styleReset} />, root)
