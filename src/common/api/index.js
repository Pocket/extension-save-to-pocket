import { request } from './_request/request'
import { saveToPocket } from './saving/save'
import { getOnSaveTags, syncItemTags, fetchStoredTags } from './saving/tags'
import { removeItem } from './saving/remove'
import { authorize } from './auth/authorize'
import { getGuid } from './auth/guid'

export {
  authorize,
  saveToPocket,
  getOnSaveTags,
  request,
  removeItem,
  getGuid,
  syncItemTags,
  fetchStoredTags
}
