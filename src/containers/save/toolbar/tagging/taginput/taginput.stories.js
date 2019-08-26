import React from 'react'
import Downshift from 'downshift'
import { storiesOf } from '@storybook/react'
import TagInput from './taginput'

storiesOf('Tagging | TagInput', module).add('focused with tags', () => (
  <Downshift
    render={({ getInputProps }) => (
      <div style={{position: 'relative'}}>
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
storiesOf('Tagging | TagInput', module).add('with error', () => (
  <Downshift
    render={({ getInputProps }) => (
      <div style={{position: 'relative'}}>
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
