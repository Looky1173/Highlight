import { useEffect, useState } from 'react';

import { CheckmarkOutline32, Information32, WarningFilled32 } from '@carbon/icons-react';

import { Flexbox, FlexItem } from './Layout';
import { Tile } from './Tile';
import Spinner from './Spinner';
import Button from './Button';

const iconStyles = { width: '50px', height: '50px' };

const Updater = () => {
	const [disableInstallButton, setDisableInstallButton] = useState(false);
	const [isUpToDate, setIsUpToDate] = useState(false);
	const [isReadyToInstall, setIsReadyToInstall] = useState(false);
	const [updateError, setUpdateError] = useState(false);
	const [updateStatus, setUpdateStatus] = useState('Checking for updates...');
	const [updateDetails, setUpdateDetails] = useState(null);
	useEffect(() => {
		window.api.send('toMainUpdates');
		window.api.receive('fromMainUpdates', function (data) {
			switch (data['status']) {
				case 'update-available':
					setUpdateStatus('Working on update...');
					setUpdateDetails('A newer version of the app is available and will be downloaded soon');
					break;
				case 'update-not-available':
					setIsUpToDate(true);
					setUpdateStatus('The app is up-to-date');
					break;
				case 'download-progress':
					setUpdateStatus('Working on update...');
					setUpdateDetails(`Downloading update... (${data['progress']['total']}/${data['progress']['transferred']}B - ${data['progress']['percent']}%)`);
					break;
				case 'update-downloaded':
					setUpdateStatus('Update downloaded');
					setUpdateDetails('You need to restart the app to apply the update');
					setIsReadyToInstall(true);
					break;
				case 'error':
					setUpdateStatus('Uh, oh!');
					setUpdateDetails('An error occurred while trying to update! Check the console for details.');
					setUpdateError(true);
					console.error('UPDATE ERROR', data['error']);
					break;
			}
			console.log('UPDATE INFO', data);
		});
	}, []);

	function restartAndInstallUpdate() {
		setDisableInstallButton(true);
		window.api.send('toMainInstallUpdate');
	}

	function retryUpdate() {
		window.location.reload(false);
	}

	return (
		<Tile>
			<Flexbox wrap='wrap' gap='15px'>
				<FlexItem centered>{isUpToDate ? <CheckmarkOutline32 style={iconStyles} /> : updateError ? <WarningFilled32 style={{...iconStyles, color: 'red' }} /> : isReadyToInstall ? <Information32 style={iconStyles} /> : <Spinner style={iconStyles} />}</FlexItem>
				<FlexItem grow={1} noFlex>
					<h3>{updateStatus}</h3>
					{updateDetails && <span>{updateDetails}</span>}
				</FlexItem>
				{(isReadyToInstall || updateError) && (
					<FlexItem right middle>
						{!updateError ? (
							<Button
								onClick={restartAndInstallUpdate}
								disabled={disableInstallButton}
								style={{ maxWidth: '100%', width: '100%', justifyContent: 'center', paddingLeft: '1rem', paddingRight: '1rem' }}
								kind='primary'
							>
								Restart App and Install Update
							</Button>
						) : (
							<Button onClick={retryUpdate} style={{ maxWidth: '100%', width: '100%', justifyContent: 'center', paddingLeft: '1rem', paddingRight: '1rem' }} kind='primary'>
								Retry update
							</Button>
						)}
					</FlexItem>
				)}
			</Flexbox>
		</Tile>
	);
};

export default Updater;
