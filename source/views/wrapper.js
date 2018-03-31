var html = require('choo/html')
var ov = require('object-values')
var path = require('path')

var views = require('./')

module.exports = wrapper

function wrapper (state, emit) {
	state.page = state.content[state.href || '/'] || state.content['/']

	if (!state.site.loaded) return loading()
	var view = views[state.page.view] || views.default

	if (state.page) emit('DOMTitleChange', 'hex22' + state.page.url)

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

function footer (state, emit) {
  return html`
	<div>
	    <div class="db p2 pb1 fl 1">
	        <div class="dib fl 1/2 m-1">
	            <a href="/about">Hunor Karamán</a> © 2018
	        </div>
	        <div class="dib fl 1/2 m-1">
	            <div class="fl">
	                Built with <a href="https://enoki.site" target="_blank">Enoki</a>. Set in <a href="https://rsms.me/inter" target="_blank">Inter UI</a>.<br>
	            </div>
	        </div>
	    </div>
		<div class="px2 pb2 brw fl db 1" style="font-size: 13px;">dat://1b9594143dae9cd607c799db493eab099514923ea4256ac847ed667d23015974/</div>
	</div>
  `
}


function loading() {
	return html`
		<main>
			<div class="loading"></div>
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
