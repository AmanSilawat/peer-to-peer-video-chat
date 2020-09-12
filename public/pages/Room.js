let Room = {
	before_render: async () => {
		utils.handle_css(['common', 'Room']);
	},

	render: async () => {
		return `<h1>/#/room</h1>`;
	},

	after_render: async () => {
		console.log('/#/room rendered');
	},
};

export default Room;
