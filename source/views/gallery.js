var html = require('choo/html')
var ov = require('object-values')
var format = require('../components/format')

module.exports = gallery

function gallery (state, emit) {
  var state = state || { }
  var images = state.page.files
    ? ov(state.page.files).filter(file => file.type === 'image')
    : false

  return html`
    <div class="db c100 p1 sm-mt4 fl">
      <div class="c3rd m-c100 dib fl mxa">
        <div class="t0 psst p1">
          <div class="f2 fwb lh1-25">
            ${state.page.title}
          </div>
          <div class="pt1 ffmono tcgrey">
            ${state.page.tags ? state.page.tags.join(', ') : ''}
          </div>
          <div class="pt1 db">
            ${format(state.page.text)}
          </div>
        </div>
      </div>
      <div class="c23rd m-c100 sm-mt4 dib fl">
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
