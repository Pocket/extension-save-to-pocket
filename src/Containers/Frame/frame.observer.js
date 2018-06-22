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

    this.setTransitionListener()
  }

  setTransitionListener = () => {
    this.node.addEventListener(
      'transitionend',
      () => {
        this.stopMonitor()
      },
      false
    )
  }

  getRect = function(element) {
    if (element._boundingClientRect) return element._boundingClientRect
    element._boundingClientRect = element.getBoundingClientRect()
    return element._boundingClientRect
  }

  handleMutations = mutations => {
    mutations.forEach(mutation => {
      const transition = window.getComputedStyle(mutation.target).transition

      if (transition === 'all 0s ease 0s') return this.updateHeight()
      this.startMonitor()
    })
  }

  startMonitor = () => {
    this.monitoring = true
    this.monitor()
  }

  stopMonitor = event => {
    this.monitoring = false
  }

  monitor = () => {
    if (!this.monitoring) return

    this.updateHeight()
    window.requestAnimationFrame(this.monitor)
  }

  calculateHeight = () => {
    const absoluteNodes = this.node.querySelectorAll('[data-positioned]')
    const absoluteHeights = Array.from(
      absoluteNodes,
      item => this.getRect(item).bottom
    )
    const allHeights = [this.node.offsetHeight, ...absoluteHeights]
    return Math.max(...allHeights) + 20
  }

  updateHeight = () => {
    const height = this.calculateHeight()
    const message = {
      action: 'frameResized',
      height: height
    }
    if (typeof chrome !== 'undefined') return sendMessage(null, message)
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
