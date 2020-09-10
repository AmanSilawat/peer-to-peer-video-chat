let Call = {
	render: async () => {
		return `<h1>/#/call</h1>`;
	},
	// All the code related to DOM interactions and controls go in here.
	// This is a separate call as these can be registered only after the DOM has been painted
	after_render: async () => {
		console.log('/#/call rendered');
	},
};

export default Call;
