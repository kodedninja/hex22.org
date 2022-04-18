var html = require('choo/html')
var format = require('../components/format')

module.exports = home

function home (state, emit) {
  	return html`
		<div class="w-1 db">
			<div class="w-1 db">
			  <div class="mw400 mxa">
  				${format(state.page().v('text'))}
			  </div>
				<div class="w-1 db clear-float my1">
          <div class="w-50 m-w-100 pr0-2 m-px0 m-mb0-5 fl dib">
            ${format(state.page().v('left'))}
          </div>
          <div class="w-50 m-w-100 pl0-2 m-px0 fl dib">
            ${format(state.page().v('right'))}
          </div>
				</div>
				<div class="mw400 mxa">
  				${format(state.page().v('bottom'))}
				</div>
			</div>
		</div>
	`
}
