var choo = require('choo')
var resize = require('choo-resize')

// our app
var app = choo()
app.use(require('enoki/choo')())
app.use(require('./plugins/scroll'))
app.use(require('./plugins/project_filter'))
app.use(resize(true))

app.route('*', require('./views/wrapper'))

// start
if (!module.parent) app.mount('main')
else module.exports = app
