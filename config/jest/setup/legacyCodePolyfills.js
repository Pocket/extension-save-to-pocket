window.define = () => []

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () { },
      removeListener: function () { }
    }
  }

window.localStorage = {
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
