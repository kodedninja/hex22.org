var html = require('choo/html')
var format = require('../components/format')

module.exports = index

function index (state, emit) {
  var targetPage = state.page(state.page().v('target'))
  var targetTitle = targetPage.v('title')
  
  var fields = state.page().v('fields') || []
  var subfields = state.page().v('subfields') || []
  
	// get, filter and sort all sub pages
  var entries = targetPage.children().toArray()
		.filter(filter)
		.sort(sort)

  return html`
    <div class="1 db">
      <div style="margin-bottom: 2.25rem">
        <u>Index of ${targetTitle}</u>
      </div>
      <ul class="1 db">
        ${!!entries.length ? entries.map(renderItem) : empty()}
      </ul>
    </div>
  `

  function renderItem(item, id) {
    var child = state.page(item.url)
    var fieldsLength = fields.length + subfields.length
  
    return html`
      <li class="1 db clean">
        <a href="${item.url}" class="1 dx nbb py0-25">
          ${fields.map(renderField.bind(this, true))}
          ${subfields.map(renderField.bind(this, false))}
        </a>
      </li>
    `

    function renderField (sub, fieldName, index) {
      return html`
        <div class="tofe ofh wsnw ${sub ? 'fxs0' : 'tcgrey'} mr0-5 lc-mr0">
          ${child.v(fieldName)}
        </div>
      `
    }
  }
  
	function empty () {
		return html`
			<div class="tac">
				<div class="mb0-5">This index is empty.</div>
			</div>
		`
	}

  function sort (a, b) {
    var dateA = state.page(a.url).v('date')
    var dateB = state.page(b.url).v('date')
    return (dateA <= dateB ? 1 : (dateB <= dateA ? -1 : 0))
  }

  function filter (entry) {
    if (!state.page(entry.url).v('date')) return false
    if (state.site.info && state.site.info.isOwner) return true

    var isVisible = state.page(entry.url).v('visible')
    return isVisible === undefined ||  isVisible === true
  }
}
