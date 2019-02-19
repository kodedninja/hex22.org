module.exports = function (state, emitter) {
  state.applyTransition = false
  state.events.APPLY_TRANSITION = 'transition:apply'

  emitter.on(state.events.APPLY_TRANSITION, function () {
    state.applyTransition = true
    emitter.emit('render')
  })
}
