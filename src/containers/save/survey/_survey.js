import { delay } from 'redux-saga'
import { put, call, takeEvery, race } from 'redux-saga/effects'
import { requireAuthorization } from '../../auth/_auth'
import { getGuid } from 'common/api/auth/guid'

import {
  getSetting,
  setSettings,
  removeSettings
} from 'common/interface'
import * as API from 'common/api'

// ACTIONS
export const surveyActions = {
  surveyRespond: data => ({ type: 'SURVEY_RESPONSE', data }),
  surveyCancel: () => ({ type: 'SURVEY_CANCEL' }),
  surveyHide: () => ({ type: 'SURVEY_HIDE' })
}

const initialState = {
  show: false,
  completed: false,
  canceled: false,
  parameters: {},
  fields: []
}

// REDUCERS
export const survey = (state = initialState, action) => {
  switch (action.type) {
    case 'SURVEY_SHOW': {
      return { ...state, show: true }
    }
    case 'SURVEY_HIDE': {
      return { ...state, show: false }
    }

    case 'SURVEY_COMPLETE': {
      return { ...state, show: true, completed: true }
    }

    case 'SURVEY_IGNORED':
    case 'SURVEY_CANCELED': {
      return { ...state, show: true, completed: true, canceled: true }
    }

    case 'SURVEY_INIT': {
      return { ...state, ...action.survey }
    }

    case 'SURVEY_RESET': {
      return initialState
    }

    default: {
      return state
    }
  }
}

// SAGAS
export function* wSurvey() {
  yield takeEvery('SURVEY_REQUEST', getSurvey)
}

export function* wSurveyResponse() {
  yield takeEvery('SURVEY_RESPONSE', submitSurvey)
}

export function* wSurveyCancel() {
  yield takeEvery('SURVEY_CANCEL', cancelSurvey)
}

function* getSurvey(action) {
  const impressionLimit = action.survey.parameters.impression_limit
  if (parseInt(getSetting('survey_count'), 10) >= impressionLimit) {
    return yield ignoreSurvey(action.survey)
  }

  yield put({ type: 'SURVEY_INIT', survey: action.survey })
  const survey_count = parseInt(getSetting('survey_count') || 0, 10)
  setSettings({ survey_count: survey_count + 1 })
  yield put({ type: 'SURVEY_SHOW' })
  yield sendAnalytics({})
}

function* submitSurvey(action) {
  // Build Payload
  const features = yield JSON.parse(getSetting('features_stored'))
  const { show_survey } = features
  const { key, value } = action.data
  const payload = {
    [key]: value,
    ...show_survey.parameters,
    survey_impressions: parseInt(getSetting('survey_count'), 10),
    survey_status: 'complete'
  }

  // Send Payload
  const { authToken } = yield race({
    authToken: call(requireAuthorization),
    timeout: call(delay, 10000)
  })

  if (authToken) {
    try {
      const data = yield call(API.sendSurvey, payload, authToken)
      if (data) {
        yield put({ type: 'SURVEY_COMPLETE' })
        yield sendAnalytics({
          identifier: 'click',
          cxt_index: key,
          cxt_option_id: value
        })
        removeSurvey({ ...features })
      } else {
        yield put({ type: 'SURVEY_FAILURE', error: 'timeout' })
      }
    } catch (error) {
      yield put({ type: 'SURVEY_FAILURE', error })
    }
  }
}

function* cancelSurvey() {
  // Build Payload
  const features = yield JSON.parse(getSetting('features_stored'))
  const { show_survey } = features
  const payload = {
    ...show_survey.parameters,
    survey_impressions: parseInt(getSetting('survey_count'), 10),
    survey_status: 'decline'
  }

  // Send Payload
  const { authToken } = yield race({
    authToken: call(requireAuthorization),
    timeout: call(delay, 10000)
  })

  if (authToken) {
    try {
      const data = yield call(API.sendSurvey, payload, authToken)
      if (data) {
        yield put({ type: 'SURVEY_CANCELED' })
        yield sendAnalytics({ identifier: 'dismiss' })
        removeSurvey({ ...features })
      } else {
        yield put({ type: 'SURVEY_FAILURE', error: 'timeout' })
      }
    } catch (error) {
      yield put({ type: 'SURVEY_FAILURE', error })
    }
  }
}

function* ignoreSurvey() {
  // Build Payload
  const features = yield JSON.parse(getSetting('features_stored'))
  const { show_survey } = features
  const payload = {
    ...show_survey.parameters,
    survey_impressions: parseInt(getSetting('survey_count'), 10),
    survey_status: 'ignore'
  }

  // Send Payload
  const { authToken } = yield race({
    authToken: call(requireAuthorization),
    timeout: call(delay, 10000)
  })

  if (authToken) {
    try {
      const data = yield call(API.sendSurvey, payload, authToken)
      if (data) {
        yield put({ type: 'SURVEY_IGNORED' })
        yield sendAnalytics({ identifier: 'ignore' })
        removeSurvey({ ...features })
      } else {
        yield put({ type: 'SURVEY_FAILURE', error: 'timeout' })
      }
    } catch (error) {
      yield put({ type: 'SURVEY_FAILURE', error })
    }
  }
}

function* sendAnalytics(details) {
  const { authToken } = yield race({
    authToken: call(requireAuthorization),
    timeout: call(delay, 10000)
  })

  const context = {
    view: 'extension_survey',
    section: 'intent_survey',
    action: 'pv_wt',
    ...details
  }

  if (authToken) {
    const guidResponse = yield getGuid()
    const guid = guidResponse.guid
    yield call(API.sendSurveyAnalytics, authToken, guid, [context])
  }
}

function removeSurvey(features) {
  delete features.show_survey
  setSettings({ features_stored: JSON.stringify(features) })
  removeSettings(['survey_count'])
}
