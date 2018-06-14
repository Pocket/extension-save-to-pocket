import { sendMessage } from 'Common/interface'
import debounce from 'lodash.debounce'

export class FrameObserver {
  constructor(node, localCB = false) {
    this.node = node
    this.localCB = localCB
    this.observer = new MutationObserver(this.handleMutations)
    this.mutationConfig = {
      attributes: true,
      attributeOldValue: false,
      characterData: false,
      characterDataOldValue: false,
      childList: true,
      subtree: true
    }

    this.stopMonitor = debounce(this.stopMonitor, 500, {
      leading: false,
      trailing: true
    })
    this.startMonitor = debounce(this.startMonitor, 300, {
      leading: true,
      trailing: false
    })
  }

  handleMutations = mutations => {
    const stopper = this.stopMonitor
    mutations.forEach(mutation => {
      const target = mutation.target
      target.addEventListener(
        'transitionend',
        {
          handleEvent: function(event) {
            stopper()
            target.removeEventListener(event.type, this, false)
          }
        },
        false
      )
      this.startMonitor()
    })
  }

  startMonitor = () => {
    this.monitoring = true
    this.monitor()
  }

  stopMonitor = () => {
    this.monitoring = false
  }

  monitor = () => {
    if (!this.monitoring) return
    this.updateHeight()
    window.requestAnimationFrame(this.monitor)
  }

  updateHeight = () => {
    const message = {
      action: 'frameResized',
      height: this.node.offsetHeight + 20
    }
    if (typeof chrome !== 'undefined') sendMessage(null, message)
    return window.parent.postMessage(message, '*')
  }

  observe = () => {
    this.observer.observe(this.node, this.mutationConfig)
    this.updateHeight()
  }

  disconnect = () => {
    this.observer.disconnect()
  }
}
