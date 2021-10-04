import React from 'react'
import { ItemPreview as Preview } from './item-preview'

export default {
  title: 'Components/ItemPreview',
  component: Preview,
};

const title = 'How to identify sketchy mushrooms'
const publisher = 'New York Times'
const thumbnail = 'http://placekitten.com/g/100/100'
const longTitle = 'Kindling the energy hidden in matter Tunguska event Jean-François Champollion hydrogen atoms a still more glorious dawn awaits billions upon billions.'

export const ItemPreview = () => <Preview title={title} publisher={publisher} thumbnail={thumbnail} />
export const NoThumbnail = () => <Preview title={title} publisher={publisher} />
export const LongTitle = () => <Preview title={longTitle} publisher={publisher} thumbnail={thumbnail} />
