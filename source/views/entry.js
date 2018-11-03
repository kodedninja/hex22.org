var html = require('choo/html')
var format = require('../components/format')
var Content = require('../components/content')

var content = new Content()

module.exports = view

function view (state, emit) {
	return html`
		<div class="1 db">
			<div class="1 db fwb f1 mb2 lh1">
				${state.page().v('title')}
			</div>
			<div class="1 db mb2">
				${state.page().v('date') ? datify(state.page().v('date')) : ''}
			</div>
			<div class="1 db">
				${content.render(state.page().v('excerpt') + '\n\n' + state.page().v('text'))}
			</div>
		</div>
	`

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

	// 2018-03-10 to March 2018
	function datify(str) {
		var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
		var parts = str.split('-')
		return months[parseInt(parts[1]) - 1] + ' ' + parts[0]
	}
}
