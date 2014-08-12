# css-path

Get the unique css-path to a DOM-element

[![NPM](https://nodei.co/npm/css-path.png?downloads&stars)](https://nodei.co/npm/css-path/)

[![NPM](https://nodei.co/npm-dl/css-path.png)](https://nodei.co/npm/css-path/)

[![browser support](https://ci.testling.com/micnews/css-path.png)](https://ci.testling.com/micnews/css-path)


## Installation

```
npm install css-path
```

## Example

### Input

```javascript
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
```

### Output

```
You can get the css-selector for an element not attached to the document
div.beep.boop > h1.foo:nth-child(1) > span.hello:nth-child(2)

Getting the same element now shows a different path
html > body > div.beep.boop:nth-child(1) > h1.foo:nth-child(1) > span.hello:nth-child(2)

You can also choose a base element
h1.foo:nth-child(1) > span.hello:nth-child(2)
or perhaps just skip the body-element
div.beep.boop:nth-child(1) > h1.foo:nth-child(1) > span.hello:nth-child(2)

Setting the id attribute make the path shorter
h1#epic > span.hello:nth-child(2)
```

## Licence

Copyright (c) 2014 Mic Network, Inc

This software is released under the MIT license:

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
