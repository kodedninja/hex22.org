var html = require('choo/html')
var ov = require('object-values')
var path = require('path')
var bytespin = require('bytespin')

var views = require('./')
var footer = require('../components/footer')

module.exports = wrapper

var blink = bytespin({chars: '__ _ __ __ _ ', speed: 125})

function wrapper (state, emit) {
	state.page = state.content[state.href || '/'] || {}

	if (!state.site.loaded) return loading()
	var view = views[state.page.view] || views.notfound

	emit('DOMTitleChange', 'hex22' + state.page.url)

	if (state.page.url == '/') return view(state, emit)

    return html`
      <main>
	  	<div class="">
			<div class="1 p1 db">
				${title(state.content['/'])}
				${navigation({
					active: state.page ? state.page.path : '',
					links: state.content ? state.content : { }
				})}
			</div>
			<div class="content mw1600 mxa">
				${view(state, emit)}
			</div>
			${footer(state, emit)}
		</div>
      </main>
    `
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
			<div class="fl 1 db p2">
				<div class="fl db 1/2 fgiant tar"><div class="dib">${blink.render(true)}</div>hex22</div>
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
