global.matchMedia = () => ({
  matches: true
})

global.localStorage = {
  getItem(key) {
    return this[key]
  },
  setItem(key, value) {
    this[key] = value
  },
  removeItem(key) {
    delete this[key]
  },
  get(key) {
    return this[key]
  },
  set(key, value) {
    this[key] = value
  }
}

global.requestAnimationFrame = function(cb) {
  return setTimeout(cb, 0)
}
