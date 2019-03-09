var html = require('choo/html')
var ov = require('object-values')
var format = require('../components/format')

module.exports = blog

function blog (state, emit) {
	// get, filter and sort all entries
  var entries = state.page().children().toArray()
		.filter(entryFilterPublic)
		.sort(entrySort)

	var entriesPerPage = state.page().v('entriesPerPage') || 5
  var page = state.query.page ? (state.query.page - 1) : 0

	var currentEntries = entries.slice(page * entriesPerPage, (page + 1) * entriesPerPage)

  return html`
    <div class="1 db">
      <ul class="1 db clear clean">
        ${!!currentEntries.length ? currentEntries.map(entry) : empty()}
      </ul>
      ${pagination()}
    </div>
  `

  function entry (page) {
    page = state.page(page.url)
    return html`
			<li class="mb2 1 db clear fl clean">
        <a href="${page.v('url')}" class="fl db nbb 1">
          <div class="1 db fl mb0-5 clear">
            <h3 class="dib fl mr1 fwn ul">
              ${page.v('title')}
            </h3>
            <div class="fr f2 tar lh1 m-fl dib">
              ${datify(page.v('date'))}
            </div>
          </div>
          <div class="1 db fl">
            ${format(page.v('excerpt'))}
          </div>
        </a>
      </li>
  	`

    // 2018-03-10 to March 2018
    function datify(str) {
      var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      var parts = str.split('-')
      return months[parseInt(parts[1]) - 1] + ' ' + parts[0]
    }
  }

	function pagination () {
		var pages = Math.ceil(entries.length / entriesPerPage)

		if (pages > 1) {
			var disableNew = page <= 0
			var newHref = page - 1 !== 0 ? `/blog?page=${page}` : '/blog'
			var disableOld = page >= pages - 1
			return html`
				<ul class="tac">
					<li class="clear dib">
						<a href="${newHref}" class="nbb${disableNew ? ' disabled tcgrey' : ''}">← New</a>
					</li>
					${Array.from({length:pages}).map(renderLink)}
					<li class="clear dib">
						<a href="/blog?page=${page + 2}" class="nbb${disableOld ? ' disabled tcgrey' : ''}">Old →</a>
					</li>
				</ul>
			`
		}

		function renderLink (_, id) {
			var activeClass = id === page ? ' tcgrey disabled' : ''
			var href = id !== 0 ? `/blog?page=${id + 1}` : '/blog'
			return html`
				<li class="clear dib">
					<a href="${href}" class="nbb${activeClass}">${id + 1}</a>
				</li>
			`
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
    return (state.content[a.url].date <= state.content[b.url].date ? 1 : (state.content[b.url].date <= state.content[a.url].date ? -1 : 0))
  }

  function entryFilterPublic (entry) {
    return (state.site.info && state.site.info.isOwner) || state.content[entry.url].visible == true
  }
}
