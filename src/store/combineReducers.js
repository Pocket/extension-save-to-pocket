import { combineReducers } from 'redux'
import { setup } from '../containers/background/_setup'
import { active, tabs } from '../containers/background/_tabs'
import { saves } from '../containers/save/_save'
import { tags } from '../containers/save/toolbar/tagging/_tagging'
import { recommendations } from '../containers/save/recommendations/_recommendations'
import { survey } from '../containers/save/survey/_survey'

export default combineReducers({
  setup,
  active,
  tabs,
  saves,
  tags,
  recommendations,
  survey
})
