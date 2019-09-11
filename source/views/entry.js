var html = require('choo/html')
var format = require('../components/format')
var Content = require('../components/content')

var content = new Content()

module.exports = view

function view (state, emit) {
	var excerpt = state.page().v('excerpt') ? (state.page().v('excerpt') + '\n\n') : ''
	return html`
		<div class="1 db">
			<h1 class="1 db f1 mb0-5 fwn ul">
				${state.page().v('title')}
			</h1>
			<div class="1 db mb1 f2">
				${state.page().v('date') ? datify(state.page().v('date')) : ''}
			</div>
			<div class="1 db">
				${content.render(excerpt + state.page().v('text'))}
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
