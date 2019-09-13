var path = require('path')
var stakit = require('stakit')
var stakitUtils = require('stakit/lib/utils')
var { render } = require('stakit-choo')
var nanocontent = require('nanocontent')
var { includeStyle } = require('stakit/transforms')
var fromString = require('from2-string')
var nanositemap = require('nanositemap')
var inlineCriticalCss = require('stakit-critical-css')
var minify = require('stakit-posthtml/minify')

var COPY_FILES = {
  [`${__dirname}/source/design/style.css`]: '/bundle.css',
  [`${__dirname}/_redirects`]: '/_redirects',
  [`${__dirname}/robots.txt`]: '/robots.txt',
  [`${__dirname}/favicon.ico`]: '/favicon.ico'
}

var app = require('./source')
var content = nanocontent.readSiteSync(path.resolve('./content'), { parent: true })

var extendState = {
  content: content,
  site: { loaded: true, p2p: false, preloaded: true }
}

var kit = stakit()
  .use(stakit.state(extendState))
  .use(stakit.copy(COPY_FILES))
  .use(writeSitemap)
  .use(copyContentFiles())
  // routes + render
  .routes(routesWith404)
  .render(render(app))
  // transforms
  .transform(inlineCriticalCss, { src: '/bundle.css' })
  .transform(minify, {
    collapseBooleanAttributes: true,
    collapseWhitespace: true,
    removeEmptyAttributes: true
  })

module.exports = kit

function routesWith404 (state) {
  var routes = Object.keys(state.content)
  routes.push('/404')
  return routes
}

function writeSitemap (ctx) {
  // Append ending slash to urls
  var paths = Object.keys(content).map(url => url + '/')
  var sm = nanositemap('https://hex22.org', paths)
  ctx._files.push(stakitUtils.newFileStream(null, '/sitemap.xml', fromString(sm)))
}

// copies files from sub-pages and keeps the urls valid
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
