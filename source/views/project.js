var html = require('choo/html')
var ov = require('object-values')
var format = require('../components/format')

module.exports = project

function project (state, emit) {
	var state = state || { }
	var images = state.page.files
    	? ov(state.page.files).filter(file => file.type === 'image')
    	: false

	return html`
		<div class="1 db p1 mb4">
			<div class="db 3/5 mxa m-1">
				<div class="1/2 dib fl">
					<p>${state.page.title}</p>
					<p>
						${links()}
					</p>
				</div>
				<div class="1/2 dib fl">
					<p><span class="bb">${state.page.description}</span></p>
					${format(state.page.text)}
				</div>
				<div class="fl 1 db bt my2">
					${images ? images.map(image) : ''}
				</div>
			</div>
		</div>
	`

	function links() {
  	  var l = []
  	  if (state.page.github) l.push({t: 'Github ↗', url: state.page.github})
  	  if (state.page.website) l.push({t: 'Website ↗', url: state.page.website})
  	  if (state.page.npm) l.push({t: 'npm ↗', url: state.page.npm})

  	  return html`
  	  	<div class="1 db">
  			${l.map(link)}
  		</div>
  	  `

  	  function link(state, id) {
  		  return html`
  		  	<a href="${state.url}" class="mr1">${state.t}</a>
  		  `
  	  }
    }

	function image (image) {
      return html`
        <div class="1 my2">
          <img class="1 db" src="${image.path}" />
        </div>
      `
    }

  return html`
    <main class="db 1 fl">
      <div class="fl pfeed 1 bb">
	  <div class="f1"><a class="nbb mr1" href="/">/</a><a class="nbb mr1" href="/projects">Work</a><span class="mr1">/</span>${state.page.title}</div>
      </div>
	  <div class="fl p2 1 bb">
        <div class="f2">${state.page.description ? state.page.description : ''}</div>
      </div>
	  <div class="fl 1 f2">
        ${links()}
      </div>
	  <div class="p2 dib fl bb 1">
		  <div class="${images.length > 0 ? '2/5' : '1'} m-1 dib fl">
		  	<div class="f3">${format(state.page.text)}</div>
		  </div>
		  <div class="3/5 m-1 dib fl p1">
		  	${images ? images.map(image) : ''}
		  </div>
	  </div>
    </main>
  `



}
