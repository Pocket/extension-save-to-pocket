import { isSystemPage } from './helpers.js'

test('verify system page', () => {
  expect(isSystemPage({ active: false })).toEqual(false)
  expect(isSystemPage({ active: true, url: 'https://getpocket.com'})).toEqual(false)
  expect(isSystemPage({ active: true, url: 'chrome://settings'})).toEqual(true)
})
