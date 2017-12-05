import {sendMessageToAllTabs} from '../../../common/interface'

function frameObserver(store, onChange){
    let currentState

    function handleChange() {
        let nextState = selectPanelHeight(store.getState())
        if (nextState !== currentState) {
            currentState = nextState
            onChange(currentState)
        }
    }

    let unsubscribe = store.subscribe(handleChange)
    handleChange()
    return unsubscribe
}

function selectPanelHeight(state){

    const activeTab = state.tabs[state.active]
    if(typeof activeTab === 'undefined') return 0

    const hash          = activeTab.hash
    const status        = activeTab.status
    const recs          = state.recommendations[hash]
    const recCount      = (recs) ? recs.feed.length : 0

    const tags          = state.tags[hash]
    const tagsSize      = (tags) ? tags.used.join(',').split('').length : 0
    const tagHeight     = Math.max(tagsSize/27, 0)*32

    const suggestions   = (tags && tags.suggested) ? tags.suggested.length : 0
    const suggestionsHeight = count => {
        if(count > 1 && count < 4) return 40
        if(count > 3 && count < 7) return 80
        if(count > 6) return 120
        return 0
    }

    const dropDownHeight = (activeTab.dropDownActive) ? 185 : 0

    const statusHeight = {
        error:      95,
        saved:      95,
        saving:     95,
        removing:   50,
        removed:    50,
        archiving:  50,
        archived:   50,
    }

    const recHeights = {
        0: 65,
        1: 160,
        2: 270,
        3: 380
    }

    const recsHeight = (state.setup.on_save_recommendations)
        ? recHeights[recCount]
        : 0

    const combinedHeight =
        statusHeight[status]
        + recsHeight
        + tagHeight
        + suggestionsHeight(suggestions)

    const finalHeight = Math.max(dropDownHeight, combinedHeight)

    return finalHeight || 0
}


export class Framer {

    constructor( store ){ this.store = store }

    checkDimensions( frameHeight ){
        sendMessageToAllTabs({
            type: 'frameShift',
            value: frameHeight
        })
    }

    watch(){
        frameObserver( this.store, this.checkDimensions )
    }
}
