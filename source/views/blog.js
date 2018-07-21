var html = require('choo/html')
var ov = require('object-values')
var format = require('../components/format')

module.exports = blog

function blog (state, emit) {
	var entries = ov(state.page.pages)

	return html`
		<div class="1 db p1 mb4">
			<div class="2/5 mxa m-1">
				${entries.sort((a, b) => (state.content[a.url].date > state.content[b.url].date ? 1 : (state.content[b.url].date > state.content[a.url].date ? -1 : 0)))
				  .reverse()
				  .filter((entry) => (state.site.info && state.site.info.isOwner) || state.content[entry.url].visible == true)
				  .map(entry)}
			</div>
		</div>
	`

  	function entry (page, id) {
		page = state.content[page.url]
		return html`
			<a href="${page.url}" class="dib nbb p2 1 bb ${id == 0 ? 'bt' : ''}">
				<div class="fl">
					${page.title}
				</div>
				<div class="fr tcgrey">${page.date}</div>
      		</a>
    	`
  	}
}
