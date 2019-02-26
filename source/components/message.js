var Component = require('nanocomponent')
var html = require('choo/html')
var assert = require('assert')
var xhr = require('xhr')

module.exports = class Message extends Component {
  constructor(url) {
    assert(typeof url === 'string', 'URL must be a string')
    super()
    this.url = url
    this.value = ''
    this.sending = false
    this.sent = false

    this.send = this.send.bind(this)
    this.onkey = this.onkey.bind(this)
  }

  createElement (entry) {
    var t = this
    return html`
      <div class="mt1">
        <form action="${this.url}" onsubmit="${this.send}" class="ba br50 1">
          ${!this.sending ? (!this.sent ? renderForm() : renderSent()) : renderSending()}
        </form>
      </div>
    `

    function renderForm () {
      return html`
        <div class="1 dx">
          <input name="message" type="text"
            placeholder="Tell me what you think..."
            onkeyup="${t.onkey}"
            autocomplete="off"
            class="input-clean pinput f2 fxg"
            value="${t.value}"
            required
          >
          <input type="submit" value="Send" class="input-clean f2 pyinput prinput cp${!t.value ? ' dn' : ''}">
        </div>
      `
    }

    function renderSending () {
      return html`
        <div class="f2 pinput">Sending...</div>
      `
    }

    function renderSent () {
      return html`
        <div class="f2 pinput">Sent!</div>
      `
    }
  }

  onkey (e) {
    this.value = e.target.value
    this.rerender()
  }

  send(e) {
    e.preventDefault()

    var t = this
    this.sending = true
    this.rerender()

    if (confirm('Are you sure this is not spam?')) {
      var form = e.currentTarget

      xhr({
        method: 'post',
        body: new FormData(form),

        uri: this.url
      }, function (err, resp, body) {
        // for some reason cors fails but it was sent
        t.sending = false
        t.sent = true
        t.rerender()
      })
    } else {
      this.sending = false
      this.rerender()
    }
  }

  update() {
    return true
  }
}
