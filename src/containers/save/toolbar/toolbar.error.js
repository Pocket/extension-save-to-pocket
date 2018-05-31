import styles from './toolbar.scss'
import React, { Component } from 'react'
import { localize } from '../../../Common/_locales/locales'

class ToolbarError extends Component {
  render() {
    return (
      <div className={styles.error}>
        {localize('error', 'page_not_saved_detail')}
      </div>
    )
  }
}

export default ToolbarError
