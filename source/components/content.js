var Component = require('nanocomponent')
var html = require('choo/html')
var format = require('./format')

module.exports = class Content extends Component {
	constructor() {
		super()
		this.text = ''
	}

	createElement(text) {
		this.text = text
		return html`
			<div class="w-1 db">
				${format(text)}
			</div>
		`
	}

	// todo
	formatimages(element) {
    var galleries = [...element.querySelectorAll('.gallery')]
    galleries.forEach(function (group) {
      group.classList.add('clear-float', '1', 'db')

      var images = [...group.children]
      images.map(function (image) {
        var alt = image.getAttribute('alt') || ''
        var column = html`
          <div class="dib fl tile 1/${group.children.length}">
            ${image}
            <div class="tac f2">${alt}</div>
          </div>
        `
        group.appendChild(column)
      })
    })

		var images = [...element.querySelectorAll('img')].forEach(function (image) {
			if (image.parentNode.nodeName !== 'A') {
				var openable = html`<a href="${image.getAttribute('src')}">${image}</a>`
				image.parentNode.appendChild(openable)
				image.parentNode.removeChild(image)
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
