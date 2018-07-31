var html = require('choo/html')
var ov = require('object-values')
var path = require('path')

var views = require('./')
var footer = require('../components/footer')
var format = require('../components/format')

module.exports = wrapper

var header_open = false

function wrapper (state, emit) {
	state.page = state.content[state.href || '/'] || {}

	if (!state.site.loaded) return loading()
	var view = views[state.page.view] || views.notfound

	emit('DOMTitleChange', 'Hunor Karamán | ' + state.page.title)

	// ${view(state, emit)}
    return html`
      <main>
	  	<div class="1 db fl">
			${header()}
			${view(state, emit)}
			${footer(state, emit)}
		</div>
      </main>
    `

	function header() {
		return html`
			<div class="1 fl db p0-5 px1 bb mb4 header ${!header_open ? 'collapsed' : ''}">
				<div class="1 db fl mb1">
					<a href="/" class="nbb">${state.content['/'].title}</a>
					<a href="#" class="nbb fr" onclick="${click}">Info ↓</a>
				</div>
				<div class="1 fl db">
					<div class="1/2 m-1 dib fl">
						${format(state.content['/'].info)}
					</div>
					<div class="1/4 m-1 dib fl">
						<p>Currently:</p>
						${format(state.content['/'].currently)}
					</div>
					<div class="1/4 m-1 dib fl">
						<p>Previously:</p>
						${format(state.content['/'].previously)}
					</div>
				</div>
			</div>
		`

		function click(e) {
			e.preventDefault()
			if (!header_open) {
				e.target.parentNode.parentNode.classList.remove('collapsed')
				e.target.innerHTML = 'Info ↑'
			} else {
				e.target.parentNode.parentNode.classList.add('collapsed')
				e.target.innerHTML = 'Info ↓'
			}

			header_open = !header_open
		}
	}
}


function title (state, emit) {
  return html`
    <div class="1/2 p1 dib f4 fl title">
      <a href="/" class="nbb">${state.title}</a>
    </div>
  `
}

function navigation (state, emit) {
  var active = state.active || ''
  return html`
    <div class="p1 dib 1/2 fl">
      <div class="fr f4">
		<div class="dib">
		  ${link(state.links['/projects'])}
		</div>
      </div>
    </div>
  `

  function link (link) {
    if (link.url == '/projects') {
        var activeClass = isActive(link.dirname) ? 'nbb' : ''
        return html`
        <div class="dib">
        	<a href="${link.url}" title="${link.title || link.dirname}" class="${activeClass}">${link.title || link.dirname}</a>
        </div>
        `
    }
  }

  function isActive (pathLink) {
    return active
      .split(path.sep)
      .filter(str => str)[0] ===
      path.basename(pathLink)
  }
}

function loading() {
	return html`
		<main>
			<div class="fl 1 db">
				<div class="1 fl db p0-5 px1 bb mb4 header collapsed">
					<div class="1 db fl mb1">
						<span class="nbb">Hunor Karamán</span>
						<span class="nbb fr">...</span>
					</div>
				</div>
				<div class="1 db p1 mb4">
					<div class="1/3 mxa m-1">
						...
					</div>
				</div>
			</div>
		</main>
	`
}

function getTitle (state) {
  var siteTitle = state.content['/'].title
  var pageTitle = state.page.title

  return siteTitle !== pageTitle
    ? siteTitle + ' | ' + pageTitle
    : siteTitle
}
