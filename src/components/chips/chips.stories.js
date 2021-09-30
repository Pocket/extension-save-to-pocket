import React from 'react';
import { Chips } from './chips'

export default {
  title: 'Components/Chips',
  component: Chips,
};

export const Standard = () => {
  return (
    <Chips
      tags={['tag1', 'tag2', 'tag3']}
      marked={[]}
      toggleActive={() => {}}
    />
  )
}

export const Marked = () => {
  return (
    <Chips
      tags={['tag1', 'tag2', 'tag3']}
      marked={['tag2']}
      toggleActive={() => {}}
    />
  )
}
