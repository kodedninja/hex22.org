var html = require('choo/html')
var path = require('path')

var views = require('./')
var format = require('../components/format')

module.exports = wrapper

function wrapper (state, emit) {
  var view = views[state.page().v('view')] || views.notfound
  var title = state.page().v('title') || 'Not Found'

  emit('DOMTitleChange', title + ' / hex22')

  return html`
    <body>
      <div class="w-1 db mw800 mxa p1 pt2 mb1">
        ${header()}
        ${view(state, emit)}
      </div>
    </body>
  `

  function header() {
		var isIndex = state.href === '/'
    return html`
      <nav class="w-1 db py2 mt1 mb2 m-mt0 clear-float mw400 mxa">
        <ul class="w-1 db fl clean">
          <li class="fl dib clean w-1">
            ${isIndex ? (
              html`<h1 class="fwn tac f1">🙂</h1>`
            ) : (
              html`
                <div class="w-1 db">
                  <a href="/" tabindex="1" class="pa">Index</a>
                  <div class="w-1 tac dib">0x22</div>
                </div>
              `
            )}
          </li>
          ${navigation()}
        </ul>
      </nav>
    `

    function navigation () {
      return html`
        <div class="dib fr">
          ${[].map(link)}
        </div>
      `

      function link (link, index) {
        var className = index > 0 ? 'ml1' : '';
        return html`
          <li class="dib clean">
            ${isActive(link.v('url')) ? (
              html`<h1 class="fwn ${className}">${link.v('title')}</h1>`
            ) : (
              html`<a href="${link.v('url') + '/'}" title="${link.v('title')}" class="${className}">${link.v('title')}</a>`
            )}
          </li>
        `
       }

       function isActive (pathLink) {
         return state.href === pathLink
       }
    }
  }
}
