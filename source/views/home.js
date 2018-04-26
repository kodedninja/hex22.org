var html = require('choo/html')
var ov = require('object-values')
var format = require('../components/format')
var thumbnail = require('../components/thumbnail')

var footer = require('../components/footer')

module.exports = home

function home (state, emit) {

	var mobile = document.body.clientWidth < 900

  	return html`
	<main class="db 1 fl">
	  <div class="pfeed 1 bb">
		<div class="f1">${state.page.title}</div>
	  </div>
	  <div class="pfeed 1 bb">
		<div class="f1">currently: freelance, engineering <a href="/p2p">peer-to-peer tools</a>, school</div>
	  </div>
	  <div class="pfeed 1 bb">
		<div class="f1">previously: <a href="https://pictogon.com/">pictogon</a></div>
	  </div>
	  <div class="p2 1 bb">
		<div class="f1"><a href="https://github.com/kodedninja" target="_blank">github</a></div>
	  </div>
	  <div class="p2 1 bb">
		<div class="f1"><a href="https://are.na/hunor-karaman" target="_blank">are.na</a></div>
	  </div>
	  <div class="p2 1 bb">
		<div class="f1"><a href="mailto:karamanhunor@protonmail.com">email</a></div>
	  </div>
	  <div class="pfeed 1 bb">
	    <div class="f2">${format(state.page.text)}</div>
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
