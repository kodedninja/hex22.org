var choo = require('choo')

// our app
var app = choo()
app.use(require('@kodedninja/enoki/choo')())
app.use(require('./plugins/scroll'))

app.route('*', require('./views/wrapper'))

// start
module.exports = app.mount('body')
