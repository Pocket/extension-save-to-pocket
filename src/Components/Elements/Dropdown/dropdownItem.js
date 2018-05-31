import styles from './dropdown.scss'
import React from 'react'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

export default function dropdownItem(entryObject, index) {
  let entryClass = cx({
    divider: entryObject.divider
  })

  return (
    <li key={index} className={entryClass}>
      <button className={styles.toolbarButton} onClick={entryObject.method}>
        {entryObject.icon} {entryObject.copy}
      </button>
    </li>
  )
}
