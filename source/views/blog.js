var html = require('choo/html')
var ov = require('object-values')
var format = require('../components/format')

module.exports = blog

function blog (state, emit) {
	var entries = state.page().children().toArray()

	return html`
		<div class="1 db">
			${entries.sort((a, b) => (state.content[a.url].date > state.content[b.url].date ? 1 : (state.content[b.url].date > state.content[a.url].date ? -1 : 0)))
				.reverse()
				.filter((entry) => (state.site.info && state.site.info.isOwner) || state.content[entry.url].visible == true)
				.map(entry)}
		</div>
	`

  	function entry (page) {
		page = state.page(page.url)
    console.log(page)
		return html`
			<a href="${page.v('url')}" class="dib nbb 1 mb2">
				<div class="1 db mb1">
					<div class="ffi fwb dib f2 m-1">
						${page.v('title')}
					</div>
					<div class="fr m-fl tcgrey dib my0-5">
						${datify(page.v('date'))}
					</div>
				</div>
				<div class="1 db fl">
					${format(page.v('excerpt'))}
				</div>
      		</a>
    	`

		// 2018-03-10 to March 2018
		function datify(str) {
			var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
			var parts = str.split('-')
			return months[parseInt(parts[1]) - 1] + ' ' + parts[0]
		}
  	}
}
