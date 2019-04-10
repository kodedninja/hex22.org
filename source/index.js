var choo = require('choo')

require('./design')

// our app
var app = choo()
app.use(require('@kodedninja/enoki/choo')())
app.use(require('./plugins/scroll'))
app.use(require('./plugins/transition'))

app.route('*', require('./views/wrapper'))

// start
if (!module.parent) app.mount('body')
else module.exports = app
