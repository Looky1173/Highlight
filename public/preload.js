const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
	send: (channel, data) => {
		// whitelist channels
		let validChannels = ['toMain', 'toMainUpdates', 'toMainInstallUpdate'];
		if (validChannels.includes(channel)) {
			ipcRenderer.send(channel, data);
		}
	},
	receive: (channel, func) => {
		let validChannels = ['fromMain', 'fromMainUpdates'];
		if (validChannels.includes(channel)) {
			// Deliberately strip event as it includes `sender`
			ipcRenderer.once(channel, (event, ...args) => func(...args));
		}
	},
});
