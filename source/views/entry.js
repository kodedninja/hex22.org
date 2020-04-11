var html = require('choo/html')
var format = require('../components/format')
var Content = require('../components/content')

var content = new Content()

module.exports = view

function view (state, emit) {
	var excerpt = state.page().v('excerpt') ? (state.page().v('excerpt') + '\n\n') : ''
	return html`
		<div class="w-1 db">
			<h1 class="w-1 db f1 mb0-5 fwn">
				${state.page().v('title')}
			</h1>
			<div class="w-1 db">
				${content.render(excerpt + state.page().v('text'))}
			</div>
			<div class="w-1 db mt1 mb1 f2">
				${`${datify(state.page().v('date'))} / ${state.page().v('location')}`}
			</div>
      <form class="w-1 db dx mb0-5" action="https://formsubmit.io/send/karamanhunor@protonmail.com" method="POST">
        <input name="_redirect" type="hidden" value="https://hex22.org/message/">
        <input name="_formsubmit_id" type="text" style="display:none">
        <input name="entry" type="hidden" value="${state.page().v('title')}">
        <input name="message" type="text" placeholder="Tell me what you think..." class="input-clean fxg" required>
        <input type="submit" value="Send" class="input-clean fxs0 px0-1 cp">
      </form>
      <div class="f2">
        <details>
          <summary>Note</summary>
          This will send me an email via <a href="https://formsubmit.io/">Formsubmit</a>, but no personal data will be saved. If you want to give me a chance to respond, don't forget to mention who you are and to be nice.
        </details>
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
