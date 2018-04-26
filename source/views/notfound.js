var html = require('choo/html')
var format = require('../components/format')
var footer = require('../components/footer')

module.exports = view

function view (state, emit) {
  return html`
    <main class="1 db fl">
	  <div class="pfeed 1 db f1 bb">
	  	404
	  </div>
	  ${footer()}
    </main>
  `
}
