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
};

export default Utils;
