const html = require('choo/html')

module.exports = function (state, emit) {
  return html`
	<div>
	    <div class="db p2 pb1 fl 1">
	        <div class="dib fl 1/2 m-1">
	            <a href="/about">Hunor Karamán</a> © 2018
	        </div>
	        <div class="dib fl 1/2 m-1">
	            <div class="fl">
	                Built with <a href="https://enoki.site" target="_blank">Enoki</a>. Set in <a href="https://rsms.me/inter" target="_blank">Inter UI</a>.<br>
	            </div>
	        </div>
	    </div>
		<div class="px2 pb2 brw fl db 1" style="font-size: 13px;">dat://1b9594143dae9cd607c799db493eab099514923ea4256ac847ed667d23015974/</div>
	</div>
  `
}
