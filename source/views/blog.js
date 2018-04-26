var html = require('choo/html')
var ov = require('object-values')
var format = require('../components/format')
var footer = require('../components/footer')

module.exports = blog

function blog (state, emit) {
  var entries = ov(state.page.pages)

  return html`
    <main class="db 1 fl">
	  <div class="pfeed 1 bb">
	    <div class="f1"><a class="nbb mr1" href="/">/</a> ${state.page.title}</div>
	  </div>
	  <div class="1 db">
	  ${entries.sort((a, b) => (state.content[a.url].date > state.content[b.url].date ? 1 : (state.content[b.url].date > state.content[a.url].date ? -1 : 0)))
		  .reverse()
		  .filter((entry) => (state.site.info && state.site.info.isOwner) || state.content[entry.url].visible == true)
		  .map(entry)}
	  </div>
	  ${footer()}
    </main>
  `

  function entry (page) {
    page = state.content[page.url]
    return html`
      <a href="${page.url}" class="dib nbb bb p2 1">
        <div class="f1 fl">
          ${page.title}
        </div>
		<div class="fr tcgrey f1">${page.date}</div>
      </a>
    `
  }
}
