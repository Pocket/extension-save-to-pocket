import { combineReducers } from 'redux'
import { setup } from 'containers/webkit/_old/background/_setup'
import { active, tabs } from 'containers/webkit/_old/background/_tabs'
import { saves } from 'containers/webkit/_old/save/_save'
import { tags } from 'containers/webkit/_old/save/toolbar/tagging/_tagging'
import { recommendations } from 'containers/webkit/_old/save/recommendations/_recommendations'
import { survey } from 'containers/webkit/_old/save/survey/_survey'

export default combineReducers({
  setup,
  active,
  tabs,
  saves,
  tags,
  recommendations,
  survey
})
