var Component = require('nanocomponent')
var html = require('choo/html')
var format = require('./format')
var mediumZoom = null
if (typeof window !== 'undefined') mediumZoom = require('medium-zoom')

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
		if (typeof window !== 'undefined') {
			this.formatimages()
		}
	}

	afterupdate(el) {
		if (typeof window !== 'undefined') {
			this.formatimages()
		}
	}

	update(text) {
		return this.text !== text
	}
}
