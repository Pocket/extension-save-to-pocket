import React from 'react'
import ReactDOM from 'react-dom'
import SaveApp from './save.app'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<SaveApp />, div)
  ReactDOM.unmountComponentAtNode(div)
})
