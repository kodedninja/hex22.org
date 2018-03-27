var html = require('choo/html')
var ov = require('object-values')

module.exports = thumbnail

function thumbnail (state, emit) {
  var state = state || { }
  state.image = state.image || setImage()

  return html`
    <a
      href="${state.path}"
      class="dib p1 1/2 nbb fl"
    >
      ${state.image ? image() : ''}
      ${state.title ? title() : ''}
      ${state.description ? description() : ''}
    </a>
  `

  function title () {
    return html`
      <div class="pt1 f2 fwb">
        ${state.title || state.dirname}
      </div>
    `
  }

  function tags () {
    return html`
      <div class="ffmono tcgrey">
        ${state.tags.slice(0, 3).join(', ')}
      </div>
    `
  }

  function description () {
    return html`
      <div class="ffmono tcgrey">
        ${state.description}
      </div>
    `
  }

  function image () {
    return html`
      <div style="
        background-color: #eee;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        background-image: url(${state.image.path});
        padding-bottom: 100%;
        width: 100%;
      "></div>
    `
  }

  function setImage () {
    return state.files
      ? ov(state.files).filter(file => file.type === 'image')[0]
      : false
  }
}
