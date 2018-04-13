var html = require('choo/html')
var format = require('../components/format')

module.exports = view

function view (state, emit) {
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
      	<div class="2/3 m-1 p1 db mxa my0">
			${format(state.page.excerpt)}
        	${format(state.page.text)}
			<a href="/writing" class="nbb f6">← Back</a>
      	</div>
    </div>
  `
}
