import React from 'react'
import { Button } from './button'

export default {
  title: 'Components/Buttons',
  component: Button,
};

export const Primary = () => {
  return (
    <Button type='primary'>Primary</Button>
  )
}

export const Secondary = () => {
  return (
    <Button type='secondary'>Secondary</Button>
  )
}

export const Inline = () => {
  return (
    <Button type='inline'>Inline</Button>
  )
}
