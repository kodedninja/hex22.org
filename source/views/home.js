var html = require('choo/html')
var ov = require('object-values')
var format = require('../components/format')
var thumbnail = require('../components/thumbnail')

module.exports = home

function home (state, emit) {
  return html`
    <div>
      	<div class="2/3 m-1 p1 fs2 tac mxa">
        	${text()}
    	</div>
	</div>
    `

  function sectionTitle (title) {
    return html`<div class="1 px1">${title}</div>`
  }

  function text () {
    return html`
      <div class="1 tac fl">
        ${format(state.page.text)}
      </div>
    `
  }
}
