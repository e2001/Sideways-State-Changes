function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/*!
 * Merge two or more objects together.
 * (c) 2017 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param   {Object}   objects  The objects to merge together
 * @returns {Object}            Merged values of defaults and options
 */
export const myMerge = function () {

  let extended = {};
  let deep = true;

  // Merge the object into the extended object
  var merge = function (obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        // If property is an object, merge properties
        if (deep && isObject(obj[prop])) {
          extended[prop] = myMerge(extended[prop], obj[prop]);
        } else {
          extended[prop] = obj[prop];
        }
      }
    }
  };

  // Loop through each object and conduct a merge
  for (let i=0; i < arguments.length; i++) {
    merge(arguments[i]);
  }

  return extended;

};
