var html = require('choo/html')
var ov = require('object-values')
var format = require('../components/format')
var thumbnail = require('../components/thumbnail')

var footer = require('../components/footer')

module.exports = home

function home (state, emit) {
  	return html`
		<div class="1 db">
			<div class="f1 fwb mb3 lh1">
				${state.page().v('banner')}
			</div>
			<div class="1 db">
				${format(state.page().v('text'))}
			</div>
		</div>
	`
}
