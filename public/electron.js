const { app, BrowserWindow, ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');
const isDev = require('electron-is-dev');
const path = require('path');

// Conditionally include the dev tools installer to load React Dev Tools
// let installExtension, REACT_DEVELOPER_TOOLS;

/*
if (isDev) {
	const devTools = require('electron-devtools-installer');
	installExtension = devTools.default;
	REACT_DEVELOPER_TOOLS = devTools.REACT_DEVELOPER_TOOLS;
}
*/

function createWindow() {
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
			enableRemoteModule: false,
			preload: path.join(__dirname, 'preload.js'),
		},
	});

	// Load from localhost if in development
	// Otherwise load index.html file
	mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);

	// Open DevTools if in dev mode
	if (isDev) {
		mainWindow.webContents.openDevTools({ mode: 'detach' });
	}
}

// Create a new browser window by invoking the createWindow
// function once the Electron application is initialized.
// Install REACT_DEVELOPER_TOOLS as well if isDev
app.whenReady().then(() => {
	/*
	if (isDev) {
		installExtension(REACT_DEVELOPER_TOOLS)
			.then((name) => console.log(`Added Extension:  ${name}`))
			.catch((error) => console.log(`An error occurred: , ${error}`));
	}
	*/

	createWindow();
});

// Add a new listener that tries to quit the application when
// it no longer has any open windows. This listener is a no-op
// on macOS due to the operating system's window management behavior.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

// Add a new listener that creates a new browser window only if
// when the application has no visible windows after being activated.
// For example, after launching the application for the first time,
// or re-launching the already running application.
app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

// The code above has been adapted from a starter example in the Electron docs:
// https://www.electronjs.org/docs/tutorial/quick-start#create-the-main-script-file

ipcMain.on('toMain', (event, data) => {
	switch (data[0]) {
		case 'get-version':
			event.reply('fromMain', ['version', app.getVersion()]);
			break;
	}
});

let isCheckingForUpdates = false;

ipcMain.on('toMainUpdates', (event, data) => {
	console.log('Update check requested...')
	if (!isDev) {
		if (!isCheckingForUpdates) {
			isCheckingForUpdates = true;
			autoUpdater.checkForUpdates();
		}
		autoUpdater.on('update-available', () => {
			event.reply('fromMainUpdates', { status: 'update-available' });
		});
		autoUpdater.on('update-not-available', () => {
			event.reply('fromMainUpdates', { status: 'update-not-available' });
			isCheckingForUpdates = false;
		});
		autoUpdater.on('download-progress', (data) => {
			event.reply('fromMainUpdates', {
				status: 'download-progress',
				progress: { percent: data.percent, bytesPerSecond: data.bytesPerSecond, total: data.total, transferred: data.transferred },
			});
		});
		autoUpdater.on('update-downloaded', () => {
			event.reply('fromMainUpdates', { status: 'update-downloaded' });
			isCheckingForUpdates = false;
		});
		autoUpdater.on('error', (error) => {
			event.reply('fromMainUpdates', { status: 'error', error: error });
			isCheckingForUpdates = false;
		});
	} else {
		// During development, do not check for updates
		setTimeout(function () {
			console.log('Replying to update request...')
			event.reply('fromMainUpdates', { status: 'update-not-available' });
			isCheckingForUpdates = false;
		}, 3000);
	}
});

ipcMain.on('toMainInstallUpdate', () => {
	autoUpdater.quitAndInstall();
});
