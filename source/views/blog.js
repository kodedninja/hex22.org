var html = require('choo/html')
var ov = require('object-values')
var format = require('../components/format')

module.exports = blog

function blog (state, emit) {
	var entries = state.page().children().toArray()

	return html`
		<ul class="1 db clear clean">
			${entries.sort((a, b) => (state.content[a.url].date > state.content[b.url].date ? 1 : (state.content[b.url].date > state.content[a.url].date ? -1 : 0)))
				.reverse()
				.filter((entry) => (state.site.info && state.site.info.isOwner) || state.content[entry.url].visible == true)
				.map(entry)}
		</ul>
	`

  	function entry (page) {
			page = state.page(page.url)
			return html`
				<li class="mb1 1 db clear fl clean">
					<a href="${page.v('url')}" class="fl db nbb 1">
						<div class="1 db fl mb0-5 clear">
							<h3 class="dib fl mr1">
								${page.v('title')}
							</h3>
		          <div class="fr f2 tar lh1 m-fl dib">
		            ${datify(page.v('date'))}
		          </div>
						</div>
						<div class="1 db fl">
							${format(page.v('excerpt'))}
						</div>
		      </a>
				</li>
	    `

			// 2018-03-10 to March 2018
			function datify(str) {
				var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
				var parts = str.split('-')
				return months[parseInt(parts[1]) - 1] + ' ' + parts[0]
			}
  	}
}
