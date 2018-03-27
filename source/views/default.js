var html = require('choo/html')
var format = require('../components/format')

module.exports = view

function view (state, emit) {
  return html`
    <div class="db 1 p1 fl">
      <div class="p1 pb0 2/3 m-1 mxa">
        <div class="f2">${state.page.title}</div>
      </div>
      <div class="2/3 m-1 p1 mxa">
        ${format(state.page.text)}
      </div>
    </div>
  `
}
