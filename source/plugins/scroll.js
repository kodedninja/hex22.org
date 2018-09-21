module.exports = scroll

function scroll (state, emitter) {
  state.header_open = false;
  emitter.on(state.events.NAVIGATE, function () {
    window.scrollTo(0, 0)
    state.header_open = false;
    emitter.emit('render')
  })
}
