import React from 'react'
import Downshift from 'downshift'
import { storiesOf } from '@storybook/react'
import TagInput from './taginput'

storiesOf('Modules | Tagging', module).add('input', () => (
  <Downshift>
    {({ getInputProps }) => (
      <div style={{ position: 'relative' }}>
        <TagInput
          setBlur={() => {}}
          setFocus={() => {}}
          addTag={() => {}}
          getInputProps={getInputProps}
          handleRemoveAction={() => {}}
          handleDirection={() => {}}
          makeTagsInactive={() => {}}
          setValue={() => {}}
          inputRef={() => {}}
          value={'test value'}
          focused={true}
          hasTags={true}
        />
      </div>
    )}
  </Downshift>
))
storiesOf('Modules | Tagging', module).add('limit exceeded', () => (
  <Downshift>
    {({ getInputProps }) => (
      <div style={{ position: 'relative' }}>
        <TagInput
          error={true}
          setBlur={() => {}}
          setFocus={() => {}}
          addTag={() => {}}
          getInputProps={getInputProps}
          handleRemoveAction={() => {}}
          handleDirection={() => {}}
          makeTagsInactive={() => {}}
          setValue={() => {}}
          inputRef={() => {}}
          value={'test value'}
          focused={true}
          hasTags={true}
        />
      </div>
    )}
  </Downshift>
))
