var Component = require('nanocomponent')
var html = require('choo/html')
var format = require('./format')
var medium_zoom = require('medium-zoom')

module.exports = class Content extends Component {
	constructor() {
		super()

		this.text = ''
	}

	createElement(text) {
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
				medium_zoom(image, {
					background: 'rgba(0, 0, 0, 1)',
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
