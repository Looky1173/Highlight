import Updater from './components/Updater/Updater';
import Header from './components/Header';
import ThemeSelector from './components/ThemeSelector';

import { useState } from 'react';

import { GeistProvider, CssBaseline } from '@geist-ui/react';
import { Page, Button, Link, Modal, useModal, Text, Spacer, Popover } from '@geist-ui/react';
import { Settings } from '@geist-ui/react-icons';

// Check for updates on startup
window.api.send('toMainUpdates');

function App() {
	const { visible: aboutVisible, setVisible: setAboutVisible, bindings: aboutModal } = useModal();
	const [theme, setTheme] = useState('light');

	const [settingsVisible, setSettingsVisible] = useState(false);
	const settingsPopoverChangeHandler = (next) => {
		setSettingsVisible(next);
	};
	const settingsPopover = () => (
		<div style={{ minWidth: 'max-content' }}>
			<Popover.Item title>
				<span>Settings</span>
			</Popover.Item>
			<Popover.Item>
				<ThemeSelector onThemeChange={(next) => setTheme(next)} />
			</Popover.Item>
			<Popover.Item line />
			<Popover.Item>
				<span onClick={() => setAboutVisible(true)}>About Highlight</span>
			</Popover.Item>
			<Popover.Item line />
			<Popover.Item>
				<span onClick={() => setSettingsVisible(false)}>Close</span>
			</Popover.Item>
		</div>
	);

	return (
		<GeistProvider themeType={theme}>
			<CssBaseline />
			<Header>
				<Header.Left>
					<Text h3 style={{ marginBottom: '0' }}>
						Highlight
					</Text>
				</Header.Left>
				<Header.Right>
					<Popover content={settingsPopover} visible={settingsVisible} onVisibleChange={settingsPopoverChangeHandler} placement='bottomEnd'>
						<Settings />
					</Popover>
				</Header.Right>
			</Header>
			<Page dotBackdrop>
				<Modal width='700px' {...aboutModal}>
					<Modal.Title>About</Modal.Title>
					<Modal.Subtitle>Highlight (C) 2021</Modal.Subtitle>
					<Modal.Content>
						<Updater />
					</Modal.Content>
					<Modal.Action passive onClick={() => setAboutVisible(false)}>
						Close
					</Modal.Action>
				</Modal>
			</Page>
		</GeistProvider>
	);
}

export default App;
