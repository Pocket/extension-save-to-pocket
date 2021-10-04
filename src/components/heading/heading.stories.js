import React from 'react'
import { Heading } from './heading'

export default {
  title: 'Components/Heading',
  component: Heading,
};

export const Saving = () => <Heading saveStatus='saving' />
export const Saved = () => <Heading saveStatus='saved' />
export const Removing = () => <Heading saveStatus='removing' />
export const Removed = () => <Heading saveStatus='removed' />
export const RemoveFailed = () => <Heading saveStatus='remove_failed' />
export const TagsSaving = () => <Heading saveStatus='tags_saving' />
export const TagsSaved = () => <Heading saveStatus='tags_saved' />
export const TagsSaveFailed = () => <Heading saveStatus='tags_failed' />
export const TagsError = () => <Heading saveStatus='tags_error' />
