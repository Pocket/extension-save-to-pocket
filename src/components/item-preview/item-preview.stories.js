import React from 'react'
import { ItemPreview as Preview } from './item-preview'

export default {
  title: 'Components',
  component: Preview,
};

const title = 'How to identify sketchy mushrooms'
const publisher = 'New York Times'
const thumbnail = 'http://placekitten.com/g/100/100'

export const ItemPreview = () => <Preview title={title} publisher={publisher} thumbnail={thumbnail} />
