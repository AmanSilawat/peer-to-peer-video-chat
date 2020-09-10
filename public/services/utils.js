const Utils = {
	parse_request_url: () => {
		let url = location.hash.slice(1).toLowerCase() || '/';
		return {
			resource: url.split('/')[1],
		};
	},
};

export default Utils;
