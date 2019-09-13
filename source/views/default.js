var html = require('choo/html')
var format = require('../components/format')

module.exports = view

function view (state, emit) {
	return html`
		<div class="w-1 db">
			<div class="w-1 db mb1 f1 ul">
				<h1 class="fwn">${state.page().v('title')}</h1>
			</div>
			<div class="w-1 db">
				${format(state.page().v('text'))}
			</div>
		</div>
	`
}
