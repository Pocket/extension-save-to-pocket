import React from 'react'
import { TagChip } from './tag.chip'

// Chip list
const TagChips = ({ tags, activeTags, handleChipClick, handleChipRemove }) => {
  return tags.map((tag, index) => {
    const isActive = activeTags.includes(tag)
    return (
      <TagChip
        key={index}
        handleChipClick={handleChipClick}
        handleChipRemove={handleChipRemove}
        isActive={isActive}
        tag={tag}
      />
    )
  })
}

export default TagChips
