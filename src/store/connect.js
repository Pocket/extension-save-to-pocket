import { bindActionCreators } from 'redux'
import * as actionCreators from './combineActions'

/* Connect
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function mapStateToProps(state) {
    return {
        active: state.active,
        tabs: state.tabs,
        saves: state.saves,
        setup: state.setup,
        tags: state.tags,
        recommendations: state.recommendations
    }
}

export function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch)
}
