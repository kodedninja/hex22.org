var html = require('choo/html')
var format = require('../components/format')

module.exports = view

function view (state, emit) {
  return html`
    <div class="1 db">
      <div class="tac">
				<div class="mb0-5">There's nothing here.</div>
				<div>
					<a href="/">Back to the Index</a>
				</div>
      </div>
    </div>
  `
}
