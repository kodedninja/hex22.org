var html = require('choo/html')
var format = require('../components/format')

module.exports = home

function home (state, emit) {
  	return html`
		<div class="w-1 db">
			<div class="w-1 db">
			  <div class="mw400 mxa">
  				${format(state.page().v('text'))}
			  </div>
			</div>
		</div>
	`
}
