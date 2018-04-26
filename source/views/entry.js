var html = require('choo/html')
var format = require('../components/format')
var footer = require('../components/footer')

module.exports = view

function view (state, emit) {
	return html`
      <main class="db 1 fl">
  	    <div class="pfeed 1 bb">
  	      <div class="f1"><a class="nbb mr1" href="/">/</a><a class="nbb mr1" href="/writing">Writing</a><span class="mr1">/</span>${state.page.title}</div>
  	    </div>
  	    <div class="pfeed 1 bb">
  	      <div class="f2">
		    ${format(state.page.excerpt)}
		  	${format(state.page.text)}
		  </div>
  	    </div>
  	    ${footer()}
      </main>
    `

  return html`
    <div class="db 1 p1 fl">
      <div class="p1 2/3 m-1 db mxa">
        <div class="f1">${state.page.title}</div>
			<div class="my1">
				<div class="dib">
					${state.page.date ? state.page.date : ''} ― ${state.page.location ? state.page.location : ''}
				</div>
			</div>
      	</div>
      	<div class="2/3 m-1 p1 db mxa my0 entry">
			${format(state.page.excerpt)}
        	${format(state.page.text)}
      	</div>
    </div>
  `
}
