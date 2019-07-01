import $ from 'jquery'

export function getTweetInfo(tweetActionElement) {
  // Find the Tweet container
  const $tweet = $(tweetActionElement).closest('article')
  // Fetch the single time element, from there we can grab the href from the parent to get the screen name and status id.
  const $link = $tweet.find('time').parent()
  const permaLink = $link.attr('href')

  return {
    element: $tweet[0],
    permaLink
  }
}