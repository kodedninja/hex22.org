var path = require('path')
var stakit = require('stakit')
var stakitUtils = require('stakit/lib/utils')
var { render } = require('stakit-choo')
var nanocontent = require('nanocontent')
var { includeStyle } = require('stakit/transforms')
var fromString = require('from2-string')
var nanositemap = require('nanositemap')

var app = require('./source')
var content = nanocontent.readSiteSync(path.resolve('./content'), { parent: true })

var extendState = {
  content: content,
  site: { loaded: true, p2p: false, preloaded: true }
}

var kit = stakit()
  .use(stakit.state(extendState))
  .use(stakit.copy({
    [`${__dirname}/source/design/style.css`]: '/bundle.css',
    [`${__dirname}/_redirects`]: '/_redirects',
    [`${__dirname}/robots.txt`]: '/robots.txt',
    [`${__dirname}/favicon.ico`]: '/favicon.ico'
  }))
  .use(writeSitemap)
  .use(copyContentFiles())
  .routes((state) => Object.keys(state.content))
  .render(render(app))
  .transform(includeStyle, '/bundle.css')

module.exports = kit

function writeSitemap (ctx) {
  var sm = nanositemap('https://hex22.org', Object.keys(content))
  ctx._files.push(stakitUtils.newFileStream(null, '/sitemap.xml', fromString(sm)))
}

function copyContentFiles () {
  var res = {}
  Object.keys(content).forEach(function (route) {
    var files = content[route].files
    Object.keys(files).forEach(function (filepath) {
      res[files[filepath].path] = path.join('/content', files[filepath].url)
    })
  })

  return stakit.copy(res)
}
