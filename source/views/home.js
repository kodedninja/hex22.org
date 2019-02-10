var html = require('choo/html')
var ov = require('object-values')
var format = require('../components/format')

module.exports = home

function home (state, emit) {
  	return html`
		<div class="1 db">
			<div class="1 db">
				${format(state.page().v('text'))}
			</div>
		</div>
	`
}
