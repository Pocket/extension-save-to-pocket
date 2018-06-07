import { delay } from 'redux-saga'
import { put, takeEvery } from 'redux-saga/effects'
import {
  getSetting,
  setSettings,
  removeSettings
} from '../../../common/interface'
// import * as API from '../../../common/api'

// ACTIONS
export const surveyActions = {
  surveyRespond: data => ({ type: 'SURVEY_RESPONSE', data }),
  surveyCancel: () => ({ type: 'SURVEY_CANCEL' })
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
}

function* submitSurvey(action) {
  // Build Payload
  const features = yield JSON.parse(getSetting('features_stored'))
  const { show_survey } = features
  const payload = {
    ...action.data,
    ...show_survey.parameters,
    survey_impressions: parseInt(getSetting('survey_count'), 10),
    survey_status: 'complete'
  }

  // Send Payload
  console.log(payload)
  // Remove survey from features
  removeSurvey({ ...features })
  yield put({ type: 'SURVEY_COMPLETE' })
}

function* cancelSurvey() {
  // Submit cancel
  const features = JSON.parse(getSetting('features_stored'))
  const survey = features.survey
  console.log(survey)
  // Remove survey from features
  removeSurvey({ ...features })
  yield put({ type: 'SURVEY_CANCELED' })
}

function* ignoreSurvey() {
  // Submit ignore
  const features = JSON.parse(getSetting('features_stored'))
  const survey = features.survey
  console.log(survey)
  // Remove survey from features
  removeSurvey({ ...features })
  return yield put({ type: 'SURVEY_IGNORED' })
}

function removeSurvey(features) {
  delete features.show_survey
  setSettings({ features_stored: JSON.stringify(features) })
  removeSettings(['survey_count'])
}
