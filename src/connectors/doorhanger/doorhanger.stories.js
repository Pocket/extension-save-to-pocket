import React from 'react'
import { Doorhanger } from './doorhanger'

export default {
  title: 'Connectors/Doorhanger',
  component: Doorhanger,
};

const itemPreview = {
  title: 'How to identify sketchy mushrooms',
  publisher: 'New York Times',
  thumbnail: 'http://placekitten.com/g/100/100'
}

export const Saving = () => <Doorhanger saveStatus={'saving'} itemPreview={itemPreview} />
export const Saved = () => <Doorhanger saveStatus={'saved'} itemPreview={itemPreview} />
export const Removing = () => <Doorhanger saveStatus={'remove'} itemPreview={itemPreview} />
export const Removed = () => <Doorhanger saveStatus={'removed'} itemPreview={itemPreview} />
