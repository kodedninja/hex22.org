var html = require('choo/html')
var format = require('../components/format')

module.exports = view

function view (state, emit) {
  return html`
    <div class="w-1 db">
      <div class="tac">
				<div class="mb0-5">Thank you for telling me your opinion. Have a great day!</div>
				<div>
					<a href="/">Back to the Index</a>
				</div>
      </div>
    </div>
  `
}
