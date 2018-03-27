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
    <div class="db 1 p2 sm-mt4 fl">
	  <div class="db 1 fl p1 tac">
		  <div class="f1 lh1-25">
			${state.page.title}
		  </div>
		  <div class="pt1 tcgrey">
			${state.page.description ? state.page.description : ''}
		  </div>
	  </div>
      <div class="1/3 m-1 dib fl">
        <div class="t0 psst">
          <div class="pt1 db">
            ${format(state.page.text)}
          </div>
        </div>
      </div>
      <div class="2/3 m-1 sm-mt4 dib fl">
        ${images ? images.map(image) : ''}
      </div>
    </div>
  `

  function image (image) {
    return html`
      <div class="p1">
        <img class="c12 db" src="${image.path}" />
      </div>
    `
  }
}
