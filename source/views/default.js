var html = require('choo/html')
var format = require('../components/format')
var footer = require('../components/footer')

module.exports = view

function view (state, emit) {
  return html`
    <main class="db 1 fl">
	  <div class="pfeed 1 bb">
	    <div class="f1"><a class="nbb mr1" href="/">/</a> ${state.page.title}</div>
	  </div>
	  <div class="pfeed 1 bb">
	    <div class="f2">${format(state.page.text)}</div>
	  </div>
	  ${footer()}
    </main>
  `
}
