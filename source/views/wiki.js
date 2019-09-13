var html = require('choo/html')
var format = require('../components/format')
var ov = require('object-values')

module.exports = view

function view (state, emit) {
	return html`
		<div class="w-1 db">
			<div class="w-1 db mb1 f1 ul">
				<h1 class="fwn">${state.page().v('title')}</h1>
			</div>
			<div class="w-1 db mb1">
				${format(state.page().v('text'))}
			</div>
			<div class="w-1 db">
				<ul class="clean">
					${pages().map(renderPage)}
				</ul>
			</div>
		</div>
	`

	function renderPage(p) {
		var page = state.page(p.url)
		return html`
			<li>
				<a href="${p.url + '/'}" class="nbb">
					<h3 class="di mr0-5">${page.v('title')}</h3>
					<span>${page.v('short')}</span>
				</a>
			</li>
		`
	}

	function pages() {
		return ov(state.content).filter(p => p.showonwiki).sort((a, b) => a.title.localeCompare(b.title))
	}
}
