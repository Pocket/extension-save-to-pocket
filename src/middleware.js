import { sendMessage } from 'common/interface'
import { SAVE_TO_POCKET_REQUEST } from 'actions'
import { OPEN_POCKET } from 'actions'
import { USER_LOG_OUT } from 'actions'
import { TAGS_SYNC } from 'actions'
import { ARCHIVE_ITEM_REQUEST } from 'actions'
import { REMOVE_ITEM_REQUEST } from 'actions'
import { COLOR_MODE_CHANGE } from 'actions'
import { SAVE_REC_REQUEST } from 'actions'
import { OPEN_REC } from 'actions'

// Actions coming from app that should be sent to background page
const outgoingActions = [
  OPEN_POCKET,
  USER_LOG_OUT,
  COLOR_MODE_CHANGE,
  SAVE_TO_POCKET_REQUEST,
  ARCHIVE_ITEM_REQUEST,
  REMOVE_ITEM_REQUEST,
  SAVE_REC_REQUEST,
  OPEN_REC,
  TAGS_SYNC
]

//eslint-disable-next-line no-unused-vars
export const outgoingMiddleware = store => next => action => {
  const actionType = action.type
  next(action)

  // whitelist actions that will need local storage
  const outgoingMessage = outgoingActions.indexOf(actionType)
  if (outgoingMessage >= 0) sendMessage(action)
}
