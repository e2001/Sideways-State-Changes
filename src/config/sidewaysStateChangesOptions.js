const options = Object.freeze({
  isWarnSamePathOnPropsAndSidewaysStore: false,
  deepCheckArray:false
})

const isGenerateDebugPath = Object.values(options).filter((item) => {
  return item === true
}).length > 0

export const sidewaysStateChangesOptions = Object.freeze(
  Object.assign({},
    options,
    {isGenerateDebugPath}
  ))
