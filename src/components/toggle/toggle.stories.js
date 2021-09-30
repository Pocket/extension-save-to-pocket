import React from 'react'
import Toggle from './toggle'

export default {
  title: 'Components/Toggle',
  component: Toggle,
};

export const Active = () => <Toggle active={true} />
export const Inactive = () => <Toggle active={false} />
export const Darkmode = () => <Toggle darkMode={true} />
export const DarkmodeActive = () => <Toggle darkMode={true} active={true} />
