import styles from './header.scss'
import React from 'react'
import Loading from './loading'
import { localize } from '../../../../common/_locales/locales'

const hasRecs = recs => recs
const hasFeed = recs => recs && recs.feed && recs.feed.length > 0

export default function Header(recs) {
    return (
        <div>
            {!hasRecs(recs) && <Loading />}

            {hasRecs(recs) && (
                <div>
                    {hasFeed(recs) && (
                        <div className={styles.header}>
                            {recs.reason
                                ? `${localize('recommendations', 'more_on')} ${
                                      recs.reason
                                  }`
                                : localize('recommendations', 'explore')}
                        </div>
                    )}

                    {!hasFeed(recs) && (
                        <div className={styles.header}>
                            {localize('recommendations', 'more_stories_detail')}
                            <a
                                href="https://getpocket.com/a/recommended/?src=ext_recs"
                                rel="noopener noreferrer"
                                target="_blank">
                                {localize('recommendations', 'explore')}
                            </a>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
