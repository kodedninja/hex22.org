var path = require('path')
var stakit = require('stakit')
var stakitUtils = require('stakit/lib/utils')
var { render } = require('stakit-choo')
var nanocontent = require('nanocontent')
var { includeStyle, meta } = require('stakit/transforms')
var fromString = require('from2-string')
var nanositemap = require('nanositemap')
var inlineCriticalCss = require('stakit-critical-css')
var minify = require('stakit-posthtml/minify')
var removeMarkdown = require('remove-markdown')

var COPY_FILES = {
  [`${__dirname}/source/design/style.css`]: '/bundle.css',
  [`${__dirname}/_redirects`]: '/_redirects',
  [`${__dirname}/robots.txt`]: '/robots.txt',
  [`${__dirname}/favicon.ico`]: '/favicon.ico'
}

var METAS = {
	author: 'Hunor Karamán',
	keywords: 'kodedninja, hunor karaman, p2p, stakit, orkl',
	// Open Graph
	'og:title': 'hex22',
	'og:type': 'website',
	'og:url': 'https://hex22.org',
	// Twitter
	'twitter:card': 'summary',
	'twitter:creator': '@kodedninja',
	'twitter:site': '@kodedninja'
}
  
var app = require('./source')

var kit = stakit()
  .use(extendState)
  .use(stakit.copy(COPY_FILES))
  .use(watchContent)
  .use(writeSitemap)
  .use(copyContentFiles)
  // routes + render
  .routes(routesWith404)
  .render(render(app))
  // transforms
  .transform(customMeta)
  .transform(inlineCriticalCss, { src: '/bundle.css' })
  .transform(minify, {
    collapseBooleanAttributes: true,
    collapseWhitespace: true,
    removeEmptyAttributes: true
  })

module.exports = kit

function customMeta (ctx) {
  var description = removeMarkdown(ctx.state.content['/'].text.split('\n')[0])

  if (ctx.state.content[ctx.state.href] && ctx.state.content[ctx.state.href].excerpt) {
    description = removeMarkdown(ctx.state.content[ctx.state.href].excerpt)
  }
  
  return function () {
    return meta()({ ...METAS, description: description, 'og:description': description })
  }
}

function extendState (ctx) {
  var content = nanocontent.readSiteSync(path.resolve('./content'), { parent: true })

  ctx.state = {
    content: content,
    site: { loaded: true, p2p: false, preloaded: true }
  }
}

function routesWith404 (state) {
  var routes = Object.keys(state.content)
  routes.push('/404')
  return routes
}

function writeSitemap (ctx) {
  // Append ending slash to urls
  var paths = Object.keys(ctx.state.content).map(url => url[url.length - 1] === '/' ? url : url + '/')
  var sm = nanositemap('https://hex22.org', paths)
  ctx._files.push(stakitUtils.newFileStream(null, '/sitemap.xml', fromString(sm)))
}

// copies files from sub-pages and keeps the urls valid
function copyContentFiles (ctx) {
  var res = {}
  Object.keys(ctx.state.content).forEach(function (route) {
    var files = ctx.state.content[route].files
    Object.keys(files).forEach(function (filepath) {
      res[files[filepath].path] = path.join('/content', files[filepath].url)
    })
  })

  stakit.copy(res)(ctx)
}

// watch the content folder 
function watchContent (ctx) {
  ctx._watch = [ './content/**/*' ] 
}
