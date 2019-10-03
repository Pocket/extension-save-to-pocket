import { combineReducers } from 'redux'
import { setup } from 'containers/webkit/background/_setup'
import { active, tabs } from 'containers/webkit/background/_tabs'
import { saves } from 'containers/webkit/save/_save'
import { tags } from 'containers/webkit/save/toolbar/tagging/_tagging'
import { recommendations } from 'containers/webkit/save/recommendations/_recommendations'
import { survey } from 'containers/webkit/save/survey/_survey'

export default combineReducers({
  setup,
  active,
  tabs,
  saves,
  tags,
  recommendations,
  survey
})
