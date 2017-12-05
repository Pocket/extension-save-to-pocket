import { request } from './_request/request'
import { saveToPocket } from './saving/save'
import { getRecommendations } from './saving/recommendations'
import { getOnSaveTags, syncItemTags } from './saving/tags'
import { archiveItem } from './saving/archive'
import { removeItem } from './saving/remove'
import { authorize } from './auth/authorize'
import { getGuid } from './auth/guid'
import { getTrendingArticles } from './newtab/trendingArticles'
import { getTrendingTopics } from './newtab/trendingTopics'
import { sendAnalytics } from './analytics/analytics'


export {
    authorize,
    saveToPocket,
    getRecommendations,
    getOnSaveTags,
    request,
    archiveItem,
    removeItem,
    getGuid,
    getTrendingArticles,
    getTrendingTopics,
    sendAnalytics,
    syncItemTags
}
