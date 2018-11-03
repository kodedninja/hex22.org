var html = require('choo/html')
var ov = require('object-values')
var format = require('../components/format')

module.exports = home

function home (state, emit) {
  	return html`
		<div class="1 db">
			<a href="${state.page().v('bannerurl')}" class="1 db nbb ${state.page().v('banner') ? 'ba p1 py2 tac mb2' : ''}">
				${state.page().v('banner')}
			</a>
			<div class="1 db">
				${format(state.page().v('text'))}
			</div>
		</div>
	`
}
