const Utils = {
	parse_request_url: () => {
		let url = location.hash.slice(1).toLowerCase() || '/';
		return {
			resource: url.split('/')[1],
		};
	},

	toProperCase: string => {
		string = string
			.trim()
			.toLowerCase()
			.replace(/[^0-9a-z]/gi, ' ');
		return string.replace(/\w\S*/g, function (txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	},

	change_hash: hash => {
		window.location.hash = `/${hash}`;
		return;
	},

	inner_route: function inner_route(elements) {
		for (let anchor_tag of elements) {
			anchor_tag.addEventListener('click', this.route_handler.bind(this));

			live_events.push({
				element: anchor_tag,
				event: 'click',
				handler: this.route_handler,
			});
		}
		return;
	},

	route_handler: function route_handler(event) {
		event.stopPropagation();
		event.preventDefault();
		if (event.target.dataset?.where) {
			this.change_hash(event.target.dataset.where);
			return;
		}
	},

	handle_css: function handle_css(css_files_array) {
		const all_downloded_css = document.querySelectorAll('link[data-file]');
		const all_enabled_css = [];

		// loop all link tag (all link tag has data-file attr)
		for (const css_file of all_downloded_css) {
			// if css_files_array includes this data-file then enable and maintain array of enabled css
			if (css_files_array.includes(css_file.dataset.file)) {
				css_file.disabled = false;
				all_enabled_css.push(css_file.dataset.file);
			} else {
				// else disable
				css_file.disabled = true;
			}
		}

		// loop css_files_array and if it is not already enabled, download and apply
		for (const css_file of css_files_array) {
			if (all_enabled_css.includes(css_file) == false) {
				const head = document.getElementsByTagName('head')[0];
				let link = document.createElement('link');
				link.dataset.file = css_file;
				link.rel = 'stylesheet';
				link.type = 'text/css';
				link.setAttribute('href', `./css/${css_file}.css`);
				head.appendChild(link);
			}
		}
	},
};

export default Utils;
