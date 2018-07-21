var html = require('choo/html')
var ov = require('object-values')
var format = require('../components/format')
var thumbnail = require('../components/thumbnail')

var footer = require('../components/footer')

module.exports = home

function home (state, emit) {
  	return html`
		<div class="1 db p1 mb4">
			<div class="1/3 mxa m-1">
				${format(state.page.text)}
			</div>
		</div>
	`
}
