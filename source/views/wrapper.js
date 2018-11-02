var html = require('choo/html')
var ov = require('object-values')
var path = require('path')

var views = require('./')
var footer = require('../components/footer')
var format = require('../components/format')

module.exports = wrapper

function wrapper (state, emit) {
	if (!state.site.loaded) return loading()
	var view = views[state.page().v('view')] || views.notfound

	emit('DOMTitleChange', 'Hunor Karamán | ' + state.page().v('title'))

    return html`
      <body>
	  	<div class="1 db mw mxa p2">
			${header()}
		</div>
      </body>
    `

	function header() {
		return html`
			<div class="1 db py2">
				<div class="1 db fl mb1">
					<div class="dib">
						<a href="/" class="nbb">${state.page('/').v('title')}</a>
					</div>
					${navigation()}
				</div>
			</div>
		`

		function navigation () {
			return html`
				<div class="dib fr">
					${[state.page('/blog'), state.page('/about')].map(link)}
				</div>
			`

			function link (link) {
				var activeClass = isActive(link.v('url')) ? '' : 'tcgrey'
				return html`
					<div class="dib">
						<a href="${link.v('url')}" title="${link.v('title')}" class="${activeClass} nbb mr2">${link.v('title')}</a>
					</div>
				`
			 }

			 function isActive (pathLink) {
				 return state.href
				 	.split(path.sep)
					.filter(str => str)[0] === path.basename(pathLink)
			 }
		}
	}
}

function loading() {
	return html`
		<body>
			<div class="1 db">
				:)
			</div>
		</body>
	`
}
