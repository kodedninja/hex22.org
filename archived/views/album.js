var html = require('choo/html')
var ov = require('object-values')
var format = require('../components/format')

module.exports = view

function view (state, emit) {
	var cover = state.page.files ? ov(state.page.files).filter(file => file.type === 'image')[0] : false

	return html`
		<div class="w-1 db p1 mb4">
			<div class="1/3 mxa m-1">
				<div class="mb4">0x22 ― ${state.page.title} <span class="fr">${state.page.released ? 'Released on ' + state.page.released : ''}</span></div>
				<div class="w-1 db bb">
					${format(state.page.text)}
				</div>
				<div class="w-1 db bb">
					${tracks(state, emit)}
				</div>
			</div>
		</div>
	`

  	function tracks(state, emit) {
	  return html`
	  	<div class="db 1">
			<p><span class="bb">Tracks</span></p>
			<p>
				${state.page.tracks ? state.page.tracks.map(track) : ''}
			</p>
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
	        <img class="w-1 db mxa" src="${image.path}" />
	      </div>
	    `
	  }
	}
}
