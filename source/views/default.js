var html = require('choo/html')
var format = require('../components/format')

module.exports = view

function view (state, emit) {
	return html`
		<div class="1 db">
			${format(state.page().v('text'))}
		</div>
	`
}
