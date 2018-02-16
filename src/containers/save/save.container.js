import styles from './save.scss' // Import Styles
import React, { Component } from 'react'
//
import Toolbar from './toolbar/toolbar.main'
import Recommendations from './recommendations/recommendations.main'
import { TransitionMotion, spring, presets } from 'react-motion' //

class SaveContainer extends Component {
    getDefaultStyles = () => {
        return [
            {
                data: {},
                key: 'toolbar',
                style: {
                    transform: -240,
                    opacity: 0
                }
            }
        ]
    }

    getStyles = () => {
        return this.props.isSaveActive && this.props.currentTab
            ? [
                  {
                      data: {},
                      key: 'toolbar',
                      style: {
                          transform: spring(0, { stiffness: 250, damping: 25 }),
                          opacity: spring(1, presets.stiff)
                      }
                  }
              ]
            : []
    }

    willEnter() {
        return { transform: -240, opacity: 0 }
    }
    willLeave() {
        return { transform: spring(-240), opacity: spring(0) }
    }
    render() {
        return (
            <TransitionMotion
                defaultStyles={this.getDefaultStyles()}
                styles={this.getStyles()}
                willEnter={this.willEnter}
                willLeave={this.willLeave}>
                {items => {
                    return (
                        <div>
                            {items.map(item => {
                                return (
                                    <div
                                        className={styles.hanger}
                                        key={item.key}
                                        style={{
                                            transform: `translateY(${
                                                item.style.transform
                                            }%) translateZ(0)`,
                                            opacity: item.style.opacity
                                        }}>
                                        <Toolbar
                                            tabId={this.props.tab_id}
                                            dropDownActive={
                                                this.props.currentTab
                                                    .dropDownActive
                                            }
                                            setDropDownStatus={
                                                this.props.setDropDownStatus
                                            }
                                            openPocket={this.props.openPocket}
                                            openOptions={this.props.openOptions}
                                            archive={this.props.archiveItem}
                                            remove={this.props.removeItem}
                                            activeTab={this.props.currentTab}
                                            type={this.props.currentTab.type}
                                            status={
                                                this.props.currentTab.status
                                            }
                                            active={this.props.active}
                                            tags={this.props.currentTags}
                                            activateTag={this.props.activateTag}
                                            deactivateTag={
                                                this.props.deactivateTag
                                            }
                                            deactivateTags={
                                                this.props.deactivateTags
                                            }
                                            addTag={this.props.addTag}
                                            closePanel={this.props.closePanel}
                                            removeTag={this.props.removeTag}
                                            removeTags={this.props.removeTags}
                                            storedTags={
                                                this.props.setup.tags_stored
                                            }
                                            inputFocused={
                                                this.props.inputFocused
                                            }
                                            setInputFocusState={
                                                this.props.setInputFocusState
                                            }
                                        />
                                        {this.props.showRecs && (
                                            <Recommendations
                                                hash={
                                                    this.props.currentTab.hash
                                                }
                                                recs={this.props.currentRecs}
                                                saveRecommendation={
                                                    this.props
                                                        .saveRecommendation
                                                }
                                            />
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    )
                }}
            </TransitionMotion>
        )
    }
}

export default SaveContainer
