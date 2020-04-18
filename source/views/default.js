var html = require('choo/html')
var format = require('../components/format')

module.exports = view

function view (state, emit) {
	return html`
		<div class="w-1 db mw500 mxa">
			<div class="w-1 db mb0-5">
				<h1>${state.page().v('title')}</h1>
			</div>
			<div class="w-1 db">
				${format(state.page().v('text'))}
			</div>
		</div>
	`
}
