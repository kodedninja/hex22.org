var html = require('choo/html')
var ov = require('object-values')
var format = require('../components/format')

module.exports = home

function home (state, emit) {
  	return html`
		<div class="1 db">
			${title()}
			<div class="1 db">
				${format(state.page().v('text'))}
			</div>
		</div>
	`

  function title() {
		return html`
			<div class="1 db fwb f1 mb4 lh1">
				${state.page().v('banner')}
			</div>
		`
		return html``
	}
}
