var html = require('choo/html')
var ov = require('object-values')
var path = require('path')

var views = require('./')
var format = require('../components/format')

module.exports = wrapper

function wrapper (state, emit) {
  if (!state.site.loaded) return loading()
  var view = views[state.page().v('view')] || views.notfound

  emit('DOMTitleChange', 'hex22 | ' + state.page().v('title'))

  return html`
    <body>
      <div class="1 db mw700 p1 mb1">
        ${header()}
        ${view(state, emit)}
      </div>
    </body>
  `

  function header() {
		var isIndex = state.href === '/'
    return html`
      <div class="1 db py2 mb3">
        <div class="1 db fl mb1">
          <div class="dib">
            <a href="/" class="${isIndex ? '' : 'nbb'}">${state.page('/').v('title')}</a>
          </div>
          ${navigation()}
        </div>
      </div>
    `

    function navigation () {
      return html`
        <div class="dib fr">
          ${[state.page('/blog'), state.page('/wiki')].map(link)}
        </div>
      `

      function link (link) {
        var activeClass = isActive(link.v('url')) ? '' : 'nbb'
        return html`
          <div class="dib">
            <a href="${link.v('url')}" title="${link.v('title')}" class="${activeClass} ml1">${link.v('title')}</a>
          </div>
        `
       }

       function isActive (pathLink) {
         return state.href
           .split(path.sep)
          .filter(str => str)[0] === path.basename(pathLink)
       }
    }
  }
}

function loading() {
  return html`
    <body>
      todo loading
    </body>
  `
}
