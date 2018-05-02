var html = require('choo/html')
var ov = require('object-values')
var format = require('../components/format')
var footer = require('../components/footer')

module.exports = view

function view (state, emit) {
  var images = state.page.files ? ov(state.page.files).filter(file => file.type === 'image')[0] : false

  return html`
    <main class="db 1 fl">
	  <div class="pfeed 1 bb">
	    <div class="f1"><a class="nbb mr1" href="/">/</a><a class="nbb mr1" href="/0x22">0x22</a><span class="mr1">/</span> ${state.page.title}</div>
	  </div>
	  <div class="p2 bb">
	  	<div class="f2">${state.page.released ? 'Released on ' + state.page.released : ''}</div>
	  </div>
	  <div class="pfeed 1 bb">
	    <div class="f2">${format(state.page.text)}</div>
	  </div>
	  <div class="pfeed 1 bb">
	  	${tracks(state, emit)}
	  </div>
	  ${footer()}
    </main>
  `

  	function tracks(state, emit) {
	  return html`
	  	<div class="db 1 f2">
			<span>Tracks:</span>
			${state.page.tracks ? state.page.tracks.map(track) : ''}
		</div>
	  `

	  function track(track, id) {
		  return html`
		  	<div class="db 1">${id + 1}. ${track}</div>
		  `
	  }

	  function image (image) {
	    return html`
	      <div class="mb4">
	        <img class="1 db" src="${image.path}" />
	      </div>
	    `
	  }
	}
}
