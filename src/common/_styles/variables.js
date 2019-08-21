import { COLORS } from './colors'
const { $black } = COLORS

export const MEDIA_QUERIES = {
  phablet: '(min-width: 550px)', //' Larger than phablet'
  tablet: '(min-width: 750px)', //' Larger than tablet'
  desktop: '(min-width: 1000px)', //' Larger than desktop'
  desktophd: '(min-width: 1200px)' //' Larger than Desktop HD'
}
export const TYPOGRAPHY = {
  $fontstackDefault:
    '"proxima-nova",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",Helvetica,sans-serif'
}
export const LAYOUT = {
  $navHeight: ' 50px',
  $bannerHeight: ' 60px',
  $borderRadius: ' 6px'
}
const $softShadowHigh = `0 20px 40px rgba(${$black}, 0.1)`
const $softShadow = `0 15px 30px rgba(${$black}, 0.2)`
const $softShadowActive = `0 10px 20px rgba(${$black}, 0.25)`
const $softShadowHeader = `0 10px 40px rgba(${$black}, 0.1)`
export const SHADOWS = {
  $softShadow,
  $softShadowActive,
  $softShadowHeader,
  $softShadowHigh,

  $hardShadow: `0 5px 8px rgba(${$black}, 0.3)`,
  $hardShadowActive: `0 3px 4px rgba(${$black}, 0.5)`,

  $smallShadowHigh: `0 5px 7px rgba(${$black}, 0.05)`,
  $smallShadow: `0 4px 6px rgba(${$black}, 0.1)`,
  $smallShadowActive: `0 3px 5px rgba(${$black}, 0.15)`,

  $tinyShadowHigh: `0 2px 3px rgba(${$black}, 0.05)`,
  $tinyShadow: `0 1px 2px rgba(${$black}, 0.15)`,
  $tinyShadowActive: `0 1px 1px rgba(${$black}, 0.2)`,
  $tinyShadowHeader: `0 6px 9px rgba(${$black}, 0.1)`,

  $cardShadow: $softShadow,
  $cardShadowActive: $softShadowActive,
  $cardShadowHigh: $softShadowHigh,

  $headerShadow: $softShadowHeader,
  $headerSubShadow: `inset 0 1px 3px rgba(${$black}, 0.1)`,
  $headerSubShadowOff: `inset 0 0 0 rgba(${$black}, 0)`
}
export const TRANSITIONS = {
  $transitionVertical: ' 150ms cubic-bezier(0.455, 0.03, 0.515, 0.955)'
}
export const ZINDEX = {
  $infopanel: ' 6',
  $bookmarks: ' 5',
  $settings: ' 4',
  $tooltip: ' 3',
  $fixed: ' 2',
  $above: ' 1'
}
