var html = require('choo/html')
var ov = require('object-values')
var xt = require('xtend')
const format = require('../components/format')

var thumbnail = require('../components/thumbnail')

module.exports = projects

function projects (state, emit) {
  var entries = ov(state.page.pages)
  if (state.filter) entries = entries.filter((page) => {
	  page = state.content[page.url]
	  return (page.tags && page.tags.indexOf('selected') != -1)
  })

  var w = (typeof window !== 'undefined') ? document.body.clientWidth : 0
  var divisor = w > 1500 ? 3 : 2
  var rows = '1/' + divisor

  entries = slice(entries, divisor)

  return html`
    <div class="p1 1 fl">
	  <div class="1 db fl tac f4">
		  <div class="f2 tac mb2">
			  ${state.page.title}
		  </div>
		  <div>
		  	<a href="#" class="${state.filter ? '' : 'strike'}" onclick="${only_selected}">selected</a> / <a href="#" class="${state.filter ? 'strike' : ''}" onclick="${only_mess}">mess</a>
		  </div>
	  </div>
	  <div class="1 p1 pr db">
		  ${entries.map(row)}
	  </div>
    </div>
  `

  function row(r, emit) {
	  return html`
	  	<div class="db 1 ${w > 900 ? 'my0-5' : ''} pr fl">
			${r.map(pp)}
		</div>
	  `
  }

  function pp(page, emit) {
      var page = state.content[page.url] || {};

      return html`
        <a
          href="${page.url}"
          class="dib m-1 nbb fl ${rows} ${w <= 900 ? 'my0-5' : ''}"
        >
          ${page.title ? title() : ''}
          ${page.description ? description() : ''}
        </a>
      `

      function title () {
        return html`
          <div class="pt1 f3">
            ${page.title || page.dirname}
          </div>
        `
      }

      function description () {
        return html`
          <div class="ffm tcgrey brw">
            ${page.description}
          </div>
        `
      }
  }

  function slice(a, d) {
	  // rewrite this asap
	  var res = [], current = []

	  if (d == 2) {
		  for (var id in a) {
			  current.push(a[id])
			  if (id != 0 && id%2 != 0 || id == a.length - 1) {
				  res.push(current)
				  current = []
			  }
		  }
		  return res
	  } else {
		  for (var id in a) {
			  current.push(a[id])
			  if ((id + 1)%3 == 0 || id == a.length - 1) {
				  res.push(current)
				  current = []
			  }
		  }
		  return res
	  }
  }

  function only_selected(e) {
	e.preventDefault();
	emit('change-selected', true)
  }

  function only_mess(e) {
	e.preventDefault();
	emit('change-selected', false)
  }
}
