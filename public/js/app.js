'use strict';

// log Error
window.onerror = function errorLog(error, url, line) {
	let error_log = { acc: 'error', page: window.location.href, data: 'ERR:' + error + ' URL:' + url + ' L:' + line };
	console.log(error_log);
};

import Call from './../pages/Call.js';
import Error404 from './../pages/Error404.js';
import IOTest from './../pages/IOTest.js';
import Login from './../pages/Login.js';
import Profile from './../pages/Profile.js';
import Room from './../pages/Room.js';
import SignUp from './../pages/SignUp.js';
import Home from './../pages/Home.js';

// services
import Utils from './../services/utils.js';

// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
	'/': Home,
	'/call': Call,
	'/io-test': IOTest,
	'/login': Login,
	'/profile': Profile,
	'/room': Room,
	'/sign-up': SignUp,
};

let live_events = []; // {selector:obj, event: 'event_name', handler: () => {}}

const router = async () => {
	// detach events
	for (const event_obj of live_events) {
		document.querySelector(event_obj.selector).removeEventListener(event_obj.event, event_obj.handler);
	}

	live_events = [];

	let content = document.querySelector('#content');

	// get the parsed URL from the addressbar
	let request = Utils.parse_request_url();

	// parse URL
	let parsed_url = request.resource ? '/' + request.resource : '/';

	// get the page from our route if it is there else 404
	let page = routes[parsed_url] ? routes[parsed_url] : Error404;
	content.innerHTML = await page.render();

	let after_render = await page.after_render();
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
