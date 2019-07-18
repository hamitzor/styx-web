const extractFields = obj => {
  return Object.keys(obj).reduce((acc, key) => {
    const field = obj[key]
    if (field) {
      return { ...acc, [key]: field }
    }
    else {
      return { ...acc, [key]: '' }
    }
  }, {})
}

export { extractFields }