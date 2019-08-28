import React from 'react'
import Downshift from 'downshift'
import { storiesOf } from '@storybook/react'
import TagInput from './taginput'

storiesOf('Modules | Tagging', module).add('input', () => (
  <Downshift
    render={({ getInputProps }) => (
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
  />
))
storiesOf('Modules | Tagging', module).add('limit exceeded', () => (
  <Downshift
    render={({ getInputProps }) => (
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
  />
))
