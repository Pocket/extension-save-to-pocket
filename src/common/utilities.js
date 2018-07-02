/* Utilities
/* -----------------------------------------------
/* These are single function utilities that rely on
/* no external libraries or files
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function isValidUrl(passedString) {
  const validUrlTestPattern = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
  return validUrlTestPattern.test(passedString)
}

export function isValidAddress(passedString) {
  const validAddressPattern = /^(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
  return validAddressPattern.test(passedString)
}

export function createValidUrl(passedString) {
  const hasProtocol = /^(?:(?:https?|ftp):\/\/)/g
  return hasProtocol.test(passedString)
    ? passedString
    : 'http://' + passedString
}

export function domainForUrl(url) {
  const match = url.match(
    /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n?=]+)/im
  )
  return match[1]
}

export function baseDomainUrl(url) {
  const pathArray = url.split('/')
  const protocol = pathArray[0]
  const host = pathArray[2]
  return protocol + '//' + host
}

export function isFunction(x) {
  return Object.prototype.toString.call(x) === '[object Function]'
}

export function arrayHasValues(checkArray) {
  return checkArray.filter(value => value && typeof value !== 'undefined')
}

export function shallowQueryParams(source) {
  const array = []
  for (let key in source) {
    if (source[key]) {
      let type = Object.prototype.toString
        .call(source[key])
        .match(/\[object (\w+)\]/)[1]
      if (type === 'String' || type === 'Number') {
        array.push(
          encodeURIComponent(key) + '=' + encodeURIComponent(source[key])
        )
      }
    }
  }
  return array.join('&')
}

export function randomEntry(array) {
  return array[Math.floor(Math.random() * array.length)]
}

export function throttle(callback, wait, context = this) {
  let timeout = null
  let callbackArgs = null

  const later = () => {
    callback.apply(context, callbackArgs)
    timeout = null
  }

  return function() {
    if (!timeout) {
      callbackArgs = arguments
      timeout = setTimeout(later, wait)
    }
  }
}

export function getBool(value) {
  return value === 'true' || value === 1 || parseInt(value, 10) === 1
}

export function mergeDedupe(arrayOfArrays) {
  return [...new Set([].concat(...arrayOfArrays))]
}

// https://stackoverflow.com/questions/38750705/filter-object-properties-by-key-in-es6
export function filterAllowedFields(object, allowed) {
  return Object.keys(object)
    .filter(key => allowed.includes(key))
    .reduce((obj, key) => {
      return {
        ...obj,
        [key]: object[key]
      }
    }, {})
}
