let Home = {
	before_render: async () => {
		utils.handle_css(['common', 'Home']);
	},
	render: async () => {
		return `<h1>/#/Home</h1>`;
	},
	after_render: async () => {
		console.log('/#/Home rendered');
	},
};

export default Home;
