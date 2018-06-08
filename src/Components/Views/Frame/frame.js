export function FrameInjector() {
  const frameID = 'save_to_pocket_extension_frame'

  let frame = document.createElement('iframe')
  let element, observer

  frame.id = frameID
  frame.style.border = 'none'
  frame.style.display = 'block'
  frame.style.height = '400px'
  frame.style.overflow = 'hidden'
  frame.style.position = 'fixed'
  frame.style.right = 0
  frame.style.top = 0
  frame.style.left = 'auto'
  frame.style.float = 'none'
  frame.style.width = '335px'
  frame.style.zIndex = 2147483647
  frame.style.background = 'transparent'
  frame.style.backgroundColor = 'rgba(0,0,255, 0.5)' //DEV ONLY
  frame.setAttribute('allowtransparency', true)

  function initFrame() {
    return new Promise((resolve, reject) => {
      const existingFrame = window.document.getElementById(frameID)
      if (existingFrame) return reject()

      // eslint-disable-next-line
      if (document.body) return resolve(appendIFrame())
      window.requestAnimationFrame(initFrame)
    })
  }

  function appendIFrame() {
    frame.src = './testcontent.html'
    element = window.document.body.appendChild(frame)
  }

  function handleMutatons(mutations) {
    mutations.forEach(mutation => {
      console.log(mutation)
    })
  }

  function render() {
    initFrame()
      .then(() => {
        observer = new MutationObserver(handleMutatons)
        // configuration of the observer:
        var config = { attributes: true, childList: true, characterData: true }
        // pass in the target node, as well as the observer options
        observer.observe(element, config)
      })
      .catch(reason => {
        console.warn(reason)
      })
  }

  function unloadFrame() {
    return new Promise(resolve => {
      observer.disconnect()
      element.remove()
      resolve()
    })
  }

  render()
}
