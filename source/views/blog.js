var html = require('choo/html')
var removeMarkdown = require('remove-markdown')

module.exports = blog

function blog (state, emit) {
	// get, filter and sort all entries
  var entries = state.page().children().toArray()
		.filter(entryFilterPublic)
		.sort(entrySort)

  var years = {}

	entries.forEach(function (entry) {
    var year = entry.date ? entry.date.split('-')[0] : 1999
    if (!years[year]) {
      years[year] = []
    }
    years[year].push(entry)
  })

  return html`
    <div class="w-1 db mw500 mxa">
      <ul class="w-1 db clear-float clean">
        ${Object.keys(years).reverse().map(function (year) {
          return html`
            <div class="tac my1">
              <h2 class="dib fwb bcgrey py4px px8px brpill">
                ${year}
              </h2>
            </div>
            ${years[year].map(entry)}
          `
        })}
      </ul>
      <div class="tac mt1">
        Not in the mood to read? → <a href="/wiki/">Take a walk in the Wiki</a>
      </div>
    </div>
  `

  function entry (page) {
    page = state.page(page.url)
    var title = page.v('title') || ''

    return html`
			<li class="w-100 db clean mb1">
			  <a href="${page.v('url') + '/'}" class="nbb hover">
			    <span class="fwb db">${title.trim()}</span>
  			  <span class="db tcgrey tcblack-h">${removeMarkdown(page.v('excerpt') || '')}</span>
		    </a>
      </li>
  	`

    // 2018-03-10 to March 2018
    function datify (str) {
      var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      var parts = str.split('-')
      return months[parseInt(parts[1]) - 1] + ' ' + parts[0]
    }
  }

  function empty () {
		return html`
			<div class="tac">
				<div class="mb0-5">There's nothing here.</div>
				<div><a href="/blog">Back to ${state.page().v('title')}</a></div>
			</div>
		`
	}

  function entrySort (a, b) {
    var dateA = state.page(a.url).v('date')
    var dateB = state.page(b.url).v('date')
    return (dateA <= dateB ? 1 : (dateB <= dateA ? -1 : 0))
  }

  function entryFilterPublic (entry) {
    if (!state.page(entry.url).v('date')) return
    if (state.site.info && state.site.info.isOwner) return true
    return state.page(entry.url).v('visible') === true
  }
}
