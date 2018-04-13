var html = require('choo/html')
var ov = require('object-values')
var format = require('../components/format')
var thumbnail = require('../components/thumbnail')

var footer = require('../components/footer')

module.exports = home

function home (state, emit) {

	var mobile = document.body.clientWidth < 900

  	return html`
 		<main>
	      	<div class="fl 1 db p2 tcwhite" style="background: #000;">
	        	<div class="fl db 1/2 fgiant tar">${state.content['/'].title}</div>
				<div class="db 1 fl mt1 f4">
					<div class="m-1 1/2 dib fr">
						${text()}
					</div>
				</div>
		  	</div>
			${footer()}
		</main>
	`

  function sectionTitle (title) {
    return html`<div class="1 px1">${title}</div>`
  }

  function text () {
    return html`
      <div class="1 ${mobile ? 'tar' : 'tal'} fl">
        ${format(state.page.text)}
      </div>
    `
  }
}
