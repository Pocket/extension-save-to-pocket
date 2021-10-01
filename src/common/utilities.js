/* Utilities
/* -----------------------------------------------
/* These are single function utilities that rely on
/* no external libraries or files
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function arrayHasValues(checkArray) {
  return checkArray.filter(value => value && typeof value !== 'undefined')
}

export function getBool(value) {
  return (
    value === true ||
    value === 'true' ||
    value === 1 ||
    parseInt(value, 10) === 1
  )
}
