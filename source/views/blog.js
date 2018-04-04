var html = require('choo/html')
var ov = require('object-values')
var format = require('../components/format');

module.exports = blog

function blog (state, emit) {
  var entries = ov(state.page.pages)

  return html`
    <div class="p1 db fl sm-mt4 1">
		<div class="f2 tac">
			${state.page.title}
		</div>
        <div class="p0-5 tac">
            ${format(state.page.text)}
        </div>
        <div class="db">
        	${entries.reverse().filter((entry) => state.content[entry.url].visible == true).map(entry)}
        </div>
    </div>
  `

  function entry (page) {
    page = state.content[page.url]
    return html`
      <a href="${page.url}" class="dib nbb p1 1/2 m-1 fl">
        <div class="f2">
          ${page.title}
        </div>
        <div class="tcgrey">
          ${page.date}
        </div>
        <div class="pt1">
          ${page.excerpt}
        </div>
      </a>
    `
  }
}
