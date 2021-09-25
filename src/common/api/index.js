import { request } from './_request/request'
import { saveToPocket } from './saving/save'
import { getOnSaveTags, syncItemTags, fetchStoredTags } from './saving/tags'
import { archiveItem } from './saving/archive'
import { removeItem } from './saving/remove'
import { authorize } from './auth/authorize'
import { getGuid } from './auth/guid'
import {
  sendAnalytics,
  sendSpocAnalytics,
  sendSurveyAnalytics,
} from './analytics/analytics'
import { getFeatures } from './features/features'
import { sendSurvey } from './survey/survey'

export {
  authorize,
  saveToPocket,
  getOnSaveTags,
  request,
  archiveItem,
  removeItem,
  getGuid,
  sendAnalytics,
  sendSpocAnalytics,
  sendSurveyAnalytics,
  syncItemTags,
  fetchStoredTags,
  getFeatures,
  sendSurvey,
}
