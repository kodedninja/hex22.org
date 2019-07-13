module.exports = scroll

function scroll (state, emitter) {
  emitter.on(state.events.NAVIGATE, function () {
    window.scrollTo(0, 0)
  })

  emitter.on(state.events.POPSTATE, function () {
    window.scrollTo(0, 0)
  })
}
