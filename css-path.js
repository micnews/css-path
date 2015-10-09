var trim = require('trim')

  , classSelector = function (className) {
      var selectors = className.split(/\s/g)
        , array = []

      for (var i = 0; i < selectors.length; ++i) {
        if (selectors[i].length > 0) {
          array.push('.' + selectors[i])
        }
      }

      return array.join('')
    }

  , nthChild = function (elm) {
      var childNumber = 0
        , childNodes = elm.parentNode.childNodes
        , index = 0

      for(; index < childNodes.length; ++index) {
        if (childNodes[index].nodeType === 1)
          ++childNumber

        if (childNodes[index] === elm)
          return childNumber
      }
    }

  , path = function (elm, rootNode, list) {

      var tag = elm.tagName.toLowerCase()
        , selector = [ tag ]
        , className = elm.getAttribute('class')
        , id = elm.getAttribute('id')

      if (id) {
        list.unshift( tag + '#' + trim(id) );
        var isUnique = rootNode.querySelectorAll(list.join('>')).length === 1;
        if (isUnique){
         return list;
        } else {
          list.shift();
          selector.push('#' + trim(id));
        }
      }

      if (className)
        selector.push( classSelector(className) )

      if (tag !== 'html' && tag !== 'body' && elm.parentNode) {
        selector.push(':nth-child(' + nthChild(elm) + ')')
      }

      list.unshift(selector.join(''))

      if (elm.parentNode && elm.parentNode !== rootNode && elm.parentNode.tagName) {
        path(elm.parentNode, rootNode, list)
      }

      return list
    }

module.exports = function (elm, rootNode) {
  return path(elm, rootNode, []).join(' > ')
}
