import { sendMessageToTab } from '../../../common/interface'

function frameObserver(store, onChange) {
  let currentState

  function handleChange() {
    let nextState = selectPanelHeight(store.getState())
    currentState = nextState
    onChange(currentState)
  }

  let unsubscribe = store.subscribe(handleChange)
  handleChange()
  return unsubscribe
}

function selectPanelHeight(state) {
  const activeTab = state.tabs[state.active]
  if (typeof activeTab === 'undefined') return 0

  const frameLoad = activeTab.frame === 'loaded' ? 0 : -1

  const status = activeTab.status
  const recs = state.recommendations[state.active]
  const recCount = recs ? recs.feed.length : 0

  const tags = state.tags[state.active]
  const tagsSize = tags && tags.used ? tags.used.join(',').split('').length : 0
  const tagHeight = Math.max(tagsSize / 27, 0) * 32

  const suggestions = tags && tags.suggested ? tags.suggested.length : 0
  const suggestionsHeight = count => {
    if (count > 1 && count < 4) return 40
    if (count > 3 && count < 7) return 80
    if (count > 6) return 120
    return 0
  }

  const dropDownHeight = activeTab.dropDownActive ? 185 : 0

  const surveyHeight = state.survey.show ? 260 : 0

  const statusHeight = {
    error: 195,
    saved: 195,
    saving: 195,
    removing: 150,
    removed: 150,
    archiving: 150,
    archived: 150
  }

  const recHeights = {
    0: 65,
    1: 160,
    2: 270,
    3: 380
  }

  const recsHeight = state.setup.on_save_recommendations
    ? recHeights[recCount]
    : 0

  const combinedHeight =
    frameLoad +
    statusHeight[status] +
    recsHeight +
    surveyHeight +
    tagHeight +
    suggestionsHeight(suggestions)

  const finalHeight = Math.max(dropDownHeight, combinedHeight)

  return finalHeight || 0
}

export class Framer {
  constructor(store) {
    this.store = store
  }

  checkDimensions = frameHeight => {
    const state = this.store.getState()
    const tabId = state.active
    if (tabId) {
      sendMessageToTab(tabId, {
        type: 'frameShift',
        value: frameHeight
      })
    }
  }

  watch() {
    frameObserver(this.store, this.checkDimensions)
  }
}
