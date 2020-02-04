var raw = require('choo/html/raw')
var MarkdownIt = require('markdown-it')
var md = new MarkdownIt({
	html: true,
	breaks: true
})
md.use(require('markdown-it-sup'))
md.use(require('markdown-it-footnote'))

module.exports = format

function format (str) {
  str = str || ''
  return raw(md.render(str))
}
