var html = require('choo/html')
var ov = require('object-values')
var xt = require('xtend')
const format = require('../components/format')
var footer = require('../components/footer')

module.exports = projects

function projects (state, emit) {
  var entries = ov(state.page.pages).sort((a, b) => (a.url > b.url ? 1 : (b.url > a.url ? -1 : 0)))
  if (state.filter) entries = entries.filter((page) => {
	  page = state.content[page.url]
	  return (page.tags && page.tags.indexOf('selected') != -1)
  })

  var w = (typeof window !== 'undefined') ? document.body.clientWidth : 0
  var divisor = w > 1500 ? 3 : 2
  var rows = '1/' + divisor

  entries = slice(entries, divisor)

  return html`
    <main class="db 1 fl">
	  <div class="pfeed 1 bb">
	    <div class="f1"><a class="nbb mr1" href="/">/</a> ${state.page.title}</div>
	  </div>
	  <div class="1 db bb">
		<a href="#" class="${state.filter ? '' : 'strike'} f1 br 1/2 dib p1 tac nbb" onclick="${only_selected}">Selected</a>
		<a href="#" class="${state.filter ? 'strike' : ''} f1 1/2 dib p1 tac nbb" onclick="${only_mess}">Mess</a>
	  </div>
	  <div class="1 db">
	    ${entries.map(row)}
	  </div>
	  ${footer()}
    </main>
  `

  function row(r, emit) {
	  return html`
	  	<div class="db 1 bb">
			${r.map(pp)}
		</div>
	  `
  }

  function pp(page, id) {
      var page = state.content[page.url] || {};

      return html`
        <a
          href="${page.url}"
          class="dib m-1 nbb p2 f1 tac project ${rows} ${(w >= 900 && id%divisor < divisor - 1) ? 'br' : ''} ${(w < 900 && id%2 == 0) ? 'bb' : ''}"
        >
          ${page.title || page.dirname}
        </a>
      `

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
