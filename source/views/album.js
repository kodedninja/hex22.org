var html = require('choo/html')
var ov = require('object-values')
var format = require('../components/format')

module.exports = view

function view (state, emit) {
  var images = state.page.files ? ov(state.page.files).filter(file => file.type === 'image')[0] : false

  return html`
  	<div class="db fl 1">
		<div class="db 2/3 m-1 mxa p1">
			<div class="1 p1">
				<div class="f2">${state.page.title}</div>
				<span class="tcgrey db mb1">${state.page.released ? 'Released on ' + state.page.released : ''}</span>
			</div>
			<div class="c100 1 mt4 p1">
				${format(state.page.text)}
			</div>
			${tracks(state, emit)}
		</div>
	</div>
  `

  	function tracks(state, emit) {
	  return html`
	  	<div class="db 1/2 m-1 mxa ba" style="background: #eee; border-color: #eee;">
			${images ? image(images) : ''}
			<div class="p1 ">
				${state.page.tracks ? state.page.tracks.map(track) : ''}
			</div>
		</div>
	  `

	  function track(track) {
		  return html`
		  	<div class="db 1">- ${track}</div>
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
