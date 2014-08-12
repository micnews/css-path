var test = require('tape')

  , document = require('global/document')
  , body = document.body

  , cssPath = require('./css-path')

test('the body element', function (t) {
  t.equal(cssPath(document.body), 'html > body')
  t.end()
})

test('elements not attached to the body', function (t) {
  var div = document.createElement('div')
    , span = document.createElement('span')

  t.equal(cssPath(div), 'div')

  div.setAttribute('class', 'beep boop')

  t.equal(cssPath(div), 'div.beep.boop')

  div.setAttribute('id', 'hello')

  t.equal(cssPath(div), 'div#hello')

  div.appendChild(span)

  t.equal(cssPath(span), 'div#hello > span:nth-child(1)')
  t.equal(cssPath(span, div), 'span:nth-child(1)')

  t.end()
})

test('attributes with some whitespace', function (t) {
  var elm = document.createElement('div')

  elm.setAttribute('class', ' foo\tbar\n')
  t.equal(cssPath(elm), 'div.foo.bar')

  elm.setAttribute('class', '')
  t.equal(cssPath(elm), 'div')

  elm.setAttribute('id', ' bong ')
  t.equal(cssPath(elm), 'div#bong')
  t.end()
})

test('elements attached to the body', function (t) {
  var div = document.createElement('div')
    , div2 = document.createElement('div')
    , text = document.createTextNode('hello, world!')

  // use insertBefore so that it works nice with testling
  body.insertBefore(div, body.childNodes[0])

  div.setAttribute('class', 'foo bar')

  t.equal(cssPath(div), 'html > body > div.foo.bar:nth-child(1)')

  body.insertBefore(text, body.childNodes[1])
  body.insertBefore(div2, body.childNodes[2])

  t.equal(cssPath(div2), 'html > body > div:nth-child(2)')
  t.equal(cssPath(div2, document.documentElement), 'body > div:nth-child(2)')
  t.equal(cssPath(div2, body), 'div:nth-child(2)')

  div.setAttribute('id', 'identifier')

  t.equal(cssPath(div), 'div#identifier')

  t.end()
})