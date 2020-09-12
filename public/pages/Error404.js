import utils from './../services/utils.js';

let Error404 = {
	before_render: async () => {
		utils.handle_css(['Error404']);
	},

	render: async () => {
		return `
		<div class="text"><p>404</p></div>
		<div class="container">
		  <!-- caveman left -->
		  <div class="caveman">
			<div class="leg">
			  <div class="foot"><div class="fingers"></div></div>      
			</div>
			<div class="leg">
			  <div class="foot"><div class="fingers"></div></div>      
			</div>
			<div class="shape">
			  <div class="circle"></div>
			  <div class="circle"></div>
			</div>
			<div class="head">
			  <div class="eye"><div class="nose"></div></div>
			  <div class="mouth"></div>
			</div>
			<div class="arm-right"><div class="club"></div></div>    
		  </div>
		  <!-- caveman right -->
		  <div class="caveman">
			<div class="leg">
			  <div class="foot"><div class="fingers"></div></div>      
			</div>
			<div class="leg">
			  <div class="foot"><div class="fingers"></div></div>      
			</div>
			<div class="shape">
			  <div class="circle"></div>
			  <div class="circle"></div>
			</div>
			<div class="head">
			  <div class="eye"><div class="nose"></div></div>
			  <div class="mouth"></div>
			</div>
			<div class="arm-right"><div class="club"></div></div>    
		  </div>
		</div>
		
		<a data-where='home' href="#">
		  <div id="link">
			<p>Go back to home</p>
		  </div>
		</a>`;
	},

	after_render: async () => {
		document.body.classList = [];
		// handling all anchor_tag's
		utils.inner_route(document.querySelectorAll('a'));
	},
};

export default Error404;
