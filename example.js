var document = require('global/document')

  , cssPath = require('./css-path')

  , elm = document.createElement('div')
  , elm2 = document.createElement('h1')
  , elm3 = document.createElement('span')

elm.setAttribute('class', 'beep boop')
elm2.setAttribute('class', 'foo')
elm3.setAttribute('class', 'hello')

elm.appendChild(elm2)
elm2.appendChild(document.createElement('span'))
elm2.appendChild(elm3)

console.log('You can get the css-selector for an element not attached to the document')
console.log(cssPath(elm3))

document.body.appendChild(elm)

console.log()
console.log('Getting the same element now shows a different path')
console.log(cssPath(elm3))

console.log()
console.log('You can also choose a base element')
console.log(cssPath(elm3, elm))
console.log('or perhaps just skip the body-element')
console.log(cssPath(elm3, document.body))

elm2.setAttribute('id', 'epic')

console.log()
console.log('Setting the id attribute make the path shorter')
console.log(cssPath(elm3))