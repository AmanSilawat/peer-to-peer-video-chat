let Profile = {
	before_render: async () => {
		utils.handle_css(['common', 'Profile']);
	},
	render: async () => {
		return `<h1>/#/profile</h1>`;
	},
	after_render: async () => {
		console.log('/#/profile rendered');
	},
};

export default Profile;
