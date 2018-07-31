const html = require('choo/html')

const nav = [
	{title: 'Projects', url: '/projects'},
	{title: 'Writing', url: '/writing'},
	{title: 'Music', url: '/0x22'},
]

module.exports = function (state, emit) {
	return html`
		<div class="p0-5 px1 1 pf b0 bt footer">
			<div class="fl 1 dib m-1">
				${nav.map(link)}
			</div>
		</div>
  	`

	function link(page, id) {
		var active = isActive(page)
		return html`
			<div class="1/${nav.length} tac dib">
				<a href="${page.url}" class="nbb ${active ? 'bb' : ''}">${page.title}</a>
			</div>
		`

		function isActive() {
			return state.href.split('/').indexOf(page.url.replace('/', '')) != -1
			return state.href == page.url
		}
	}
}
