var Component = require('nanocomponent')
var html = require('choo/html')
var format = require('./format')
var mediumZoom = require('medium-zoom')

module.exports = class Content extends Component {
	constructor() {
		super()

		this.text = ''
	}

	createElement(text) {
		this.text = text
		return html`
			<div class="1 db">
				${format(text)}
			</div>
		`
	}

	formatimages() {
		var element = this.element
		var images = [...element.querySelectorAll('img')].forEach(function (image) {
			if (image.parentNode.nodeName !== 'A') {
				mediumZoom(image, {
					margin: 60,
					background: '#fff',
					container: element
				})
			}
		})
	}

	load(el) {
		this.formatimages()
	}

	afterupdate(el) {
		this.formatimages()
	}

	update(text) {
		return this.text !== text
	}
}
