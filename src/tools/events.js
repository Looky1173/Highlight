export const composeEventHandlers =
	(fns) =>
	(event, ...args) => {
		for (let i = 0; i < fns.length; i++) {
			if (event.defaultPrevented) {
				break;
			}
			if (typeof fns[i] === 'function') {
				fns[i](event, ...args);
			}
		}
	};
