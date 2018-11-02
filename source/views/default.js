var html = require('choo/html')
var format = require('../components/format')

module.exports = view

function view (state, emit) {
	return html`
		<div class="1 db">
			${title()}
			<div class="1 db">
				${format(state.page().v('text'))}
			</div>
		</div>
	`

	function title() {
		if (state.page().v('banner') == true) return html`
			<div class="1 db fwb f1 mb4 lh1">
				${state.page().v('title')}
			</div>
		`
		return html``
	}
}
