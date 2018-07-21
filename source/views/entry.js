var html = require('choo/html')
var format = require('../components/format')

module.exports = view

function view (state, emit) {
	return html`
		<div class="1 db p1 mb4">
			<div class="1/3 mxa m-1">
				<div class="mb4">${state.page.title} <span class="fr tcgrey">${state.page.date ? state.page.date : ''}</span></div>
				<div class="1 db">
					${format(state.page.excerpt)}
					${format(state.page.text)}
				</div>
			</div>
		</div>
	`
}
