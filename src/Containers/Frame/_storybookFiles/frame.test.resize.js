import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import random from 'lodash.random'
import { FrameObserver } from '../frame.observer'
import styled from 'react-emotion'
import { Colors } from 'Elements/Colors/colors'

const Box = styled('div')`
  display: block;
  background: ${props => props.backColor};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  color: #222;
  border-radius: 4px;
  padding: 10px;
  box-sizing: border-box;
  width: 321px;
  margin: 7px;
  transition: height ${props => props.trans}ms ${props => props.delay || 0}ms
    ease-in-out;
`

class Bounce extends Component {
  constructor(props) {
    super(props)
    this.state = { box1: 10, box2: 10, box3: 10 }
    setInterval(this.randomizeHeight, 5000)
    this.heightRef = React.createRef()
  }

  componentDidMount() {
    const node = this.heightRef.current
    this.frameObserver = new FrameObserver(node)
    this.frameObserver.observe()
    this.randomizeHeight()
  }

  componentWillUnmount() {
    this.frameObserver.disconnect()
  }

  randomizeHeight = () => {
    this.setState({
      box1: random(10, 200),
      box2: random(10, 200),
      box3: random(10, 200)
    })
  }

  render() {
    return (
      <div ref={this.heightRef}>
        <div>
          <Box
            backColor={Colors.emerald}
            trans={130}
            style={{ height: this.state.box2 + 'px' }}
          />
          <Box
            backColor={Colors.teal}
            trans={130}
            delay={100}
            style={{ height: this.state.box2 + 'px' }}
          />
          <Box
            backColor={Colors.mintGreen}
            trans={130}
            delay={150}
            style={{ height: this.state.box2 + 'px' }}
          />
        </div>
        <div>
          <Box
            backColor={Colors.amber}
            trans={150}
            style={{ height: this.state.box3 + 'px' }}
          />
        </div>
        <div>
          <Box
            backColor={Colors.hotCoral}
            trans={250}
            style={{ height: this.state.box1 + 'px' }}
          />
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  React.createElement(Bounce),
  document.getElementById('pocket-extension-root')
)
