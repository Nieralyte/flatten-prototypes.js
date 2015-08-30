var _ = require('lodash-fp')
var $ = _.flow


function toPlainObjectDeep(depth, obj) {
  var newObj = _.toPlainObject(obj)
  
  if (depth > 0) {
    $(
      _.keys,
      
      _.each(function(key) {
        if (_.isObject(newObj[key]))
          newObj[key] = toPlainObjectDeep_(depth, newObj, key)
      })
    )(newObj)
  }
  
  
  function toPlainObjectDeep_(depth, obj, initKey) {
    var newObj = {}
    
    newObj[initKey] = _.toPlainObject(obj[initKey])
    
    if (depth > 1) {
      $(
        _.keys,
        
        _.each(function(key) {
          if (_.isObject(newObj[initKey][key])) {
            newObj[initKey][key] = toPlainObjectDeep_(
              depth - 1,
              newObj[initKey],
              key
            )
          }
        })
      )(newObj[initKey])
    }
    
    return newObj[initKey]
  }
  
  return newObj
}



module.exports = toPlainObjectDeep



