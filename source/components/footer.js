const html = require('choo/html')

const nav = [
	{title: 'Projects', url: '/projects'},
	{title: 'Peer-to-Peer', url: '/p2p'},
	{title: 'Writing', url: '/writing'},
	{title: 'Music', url: '/0x22'},
]

module.exports = function (state, emit) {
	return html`
		<div class="p0-5 px1 1 pf b0 bt footer">
			<div class="fl 1/2 dib m-1">
				${nav.map(link)}
			</div>
			<div class="fl 1/2 dib m-1">
				<div class="brw">dat://1b9594143dae9cd607c799db493eab099514923ea4256ac847ed667d23015974/</div>
			</div>
		</div>
  	`

	function link(state, id) {
		return html`
			<span>
				${id != 0 ? ' + ' : ''} <a href="${state.url}" class="nbb">${state.title}</a>
			</span>
		`
	}
}
