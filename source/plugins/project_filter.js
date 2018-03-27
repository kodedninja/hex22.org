module.exports = (state, emitter) => {
	state.filter = true

	emitter.on('change-selected', (data) => {
		state.filter = data
		emitter.emit('render')
	})
}
