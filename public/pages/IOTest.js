let IOTest = {
	before_render: async () => {
		utils.handle_css(['common', 'IOTest']);
	},
	render: async () => {
		return `<h1>/#/io-test</h1>`;
	},
	after_render: async () => {
		console.log('/#/io-test rendered');
	},
};

export default IOTest;
