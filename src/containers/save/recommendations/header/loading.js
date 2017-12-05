import styles from './loading.scss'
import React from 'react'
import { localize } from '../../../../common/_locales/locales'

export default function Loader(){
    return (
        <div className={styles.panel}>
            <div className={styles.loader}>
                <div className={styles.animation}>
                    <div></div><div></div>
                </div>
            </div>
            {localize('recommendations','loading')}
        </div>
    )
}
