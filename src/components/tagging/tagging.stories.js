import React from 'react'
import { Tagging as TaggingComponent } from './tagging'

export default {
  title: 'Components/Tagging',
};

const usedTags = ['test', 'space']
const markedTags = ['space']
const suggestedTags = ['pink elephants', 'lava lamps']
const storedTags = ['jamba','juice','donut','time','perturbedly','uxoriousness','chromogenic','creasiest','dartingness','rippingly','glabellar','auckland','wyoming','luanda','prebesetting','member','watershed','grooveless','inept','balletomane','desdemona','isodimorphous','fishybacking','vip']
const addTag = () => {}
const activateTag = () => {}
const deactivateTag = () => {}
const deactivateTags = () => {}
const removeTag = () => {}
const removeTags = () => {}
const closePanel = () => {}

export const Tagging = () => {
  return (
    <TaggingComponent
      usedTags={usedTags}
      markedTags={markedTags}
      suggestedTags={suggestedTags}
      storedTags={storedTags}
      addTag={addTag}
      activateTag={activateTag}
      deactivateTag={deactivateTag}
      deactivateTags={deactivateTags}
      removeTag={removeTag}
      removeTags={removeTags}
      closePanel={closePanel}
    />
  )
}

export const TaggingEmpty = () => {
  return (
    <TaggingComponent
      usedTags={[]}
      markedTags={markedTags}
      suggestedTags={suggestedTags}
      storedTags={storedTags}
      addTag={addTag}
      activateTag={activateTag}
      deactivateTag={deactivateTag}
      deactivateTags={deactivateTags}
      removeTag={removeTag}
      removeTags={removeTags}
      closePanel={closePanel}
    />
  )
}
