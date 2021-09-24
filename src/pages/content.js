console.log('General Content Script')

chrome.runtime.onMessage.addListener(function (request) {
  const { action: name, payload: message } = request
  console.log({ name, message })
})
