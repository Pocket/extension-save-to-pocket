import { request } from './_request/request'
import { saveToPocket } from './saving/save'
import {
  getRecommendations,
  saveRecToPocket,
  openRecommendation
} from './saving/recommendations'
import { getSuggestedTags, syncItemTags, fetchStoredTags } from './saving/tags'
import { archiveItem } from './saving/archive'
import { removeItem } from './saving/remove'
import { authorize } from './auth/authorize'
import { getGuid } from './auth/guid'
import { getTrendingArticles } from './newtab/trendingArticles'
import { getTrendingTopics } from './newtab/trendingTopics'
import { sendAnalytics, sendSpocAnalytics } from './analytics/analytics'
import { getItem } from './saving/details'
import { getFeatures } from './features/features'

export {
  authorize,
  saveToPocket,
  getItem,
  getRecommendations,
  saveRecToPocket,
  openRecommendation,
  getSuggestedTags,
  request,
  archiveItem,
  removeItem,
  getGuid,
  getTrendingArticles,
  getTrendingTopics,
  sendAnalytics,
  sendSpocAnalytics,
  syncItemTags,
  fetchStoredTags,
  getFeatures
}
