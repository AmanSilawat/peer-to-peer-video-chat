let Call = {
	before_render: async () => {
		utils.handle_css(['common', 'Call']);
	},
	render: async () => {
		return `<h1>/#/call</h1>`;
	},
	after_render: async () => {
		console.log('/#/call rendered');
	},
};

export default Call;
