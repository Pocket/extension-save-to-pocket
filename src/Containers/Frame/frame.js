import {
  getURL,
  addMessageListener,
  removeMessageListener,
  sendMessage
} from 'Common/interface'
import { FrameInject } from './frame.inject'

let frame

// Set up listeners on tab
function handleAction(action, sender, sendResponse) {
  if (action.type === 'checkTab') {
    sendResponse('tabAvailable')
  }

  if (action.type === 'checkFrame') {
    sendResponse(true)
  }

  if (action.type === 'frameUnload') {
    unloadFrame()
  }

  if (action.type === 'frameResize') {
    frame.style.height = `${action.height}px`
  }
}

function unloadFrame() {
  removeMessageListener(handleAction)
  FrameInject().remove()
}

// Set up frame when file is injected
FrameInject()
  .inject({ url: getURL('/app.html'), showFrame: false })
  .then(frameElement => {
    frame = frameElement
    document.addEventListener('click', function() {
      sendMessage(null, { action: 'frameFocus', status: false })
    })

    sendMessage(null, { action: 'frameLoaded' })

    addMessageListener(handleAction)
  })
