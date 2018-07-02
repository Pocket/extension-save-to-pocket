export const FrameInject = function() {
  const frameID = 'save_to_pocket_extension_frame'

  let frame = document.createElement('iframe')
  let element
  let animationFrameRequest

  frame.id = frameID
  frame.style.border = 'none'
  frame.style.display = 'block'
  frame.style.height = '0'
  frame.style.overflow = 'hidden'
  frame.style.position = 'fixed'
  frame.style.right = 0
  frame.style.top = 0
  frame.style.left = 'auto'
  frame.style.float = 'none'
  frame.style.width = '340px'
  frame.style.zIndex = 2147483647
  frame.style.background = 'transparent'
  frame.setAttribute('allowtransparency', true)

  function initFrame(url) {
    return new Promise((resolve, reject) => {
      const existingFrame = window.document.getElementById(frameID)
      if (existingFrame) existingFrame.remove()
      if (document.body) return resolve(appendIFrame(url))
      animationFrameRequest = window.requestAnimationFrame(initFrame)
    })
  }

  function appendIFrame(url) {
    frame.src = url
    element = window.document.body.appendChild(frame)
    return element
  }

  function inject({ url = required('url'), showFrame = false }) {
    // DEV ONLY
    if (showFrame) {
      frame.style.background = `repeating-linear-gradient(
        45deg,
        rgba(255, 0, 0, 0.2),
        rgba(255, 0, 0, 0.2) 2px,
        rgba(255, 255, 255, 0.4) 2px,
        rgba(255, 255, 255, 0.4) 4px
      )`
    }
    return initFrame(url).catch(reason => console.warn(reason))
  }

  function remove() {
    window.cancelAnimationFrame(animationFrameRequest)
    const existingFrame = window.document.getElementById(frameID)
    if (existingFrame) existingFrame.remove()
  }

  function required(keyword) {
    throw new Error(`Prameter \`${keyword}\` is required`)
  }

  return { inject, remove }
}
