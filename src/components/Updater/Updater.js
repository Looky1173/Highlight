import { useEffect, useState, useRef } from 'react';

import { Button, Spinner, Fieldset, Grid } from '@geist-ui/react';
import { Info, CheckInCircle, AlertCircleFill } from '@geist-ui/react-icons';

import styles from './Updater.module.css';

const Updater = () => {
	const _isMounted = useRef(true);

	const [version, setVersion] = useState(null);

	const [disableInstallButton, setDisableInstallButton] = useState(false);
	const [isUpToDate, setIsUpToDate] = useState(false);
	const [isReadyToInstall, setIsReadyToInstall] = useState(false);
	const [updateError, setUpdateError] = useState(false);
	const [updateStatus, setUpdateStatus] = useState('Checking for updates...');
	const [updateDetails, setUpdateDetails] = useState(null);

	const checkForUpdates = () => {
		setDisableInstallButton(false);
		setIsUpToDate(false);
		setIsReadyToInstall(false);
		setUpdateError(false);
		setUpdateStatus('Checking for updates...');
		setUpdateDetails(null);

		window.api.send('toMainUpdates');
		console.log('send');
		window.api.receive('fromMainUpdates', function (data) {
			if (_isMounted.current) {
				console.log('receive');
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
						setUpdateDetails(`Downloading update... (${data['progress']['total']}/${data['progress']['transferred']}B - ${Math.round(data['progress']['percent'])}%)`);
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
			}
		});
	};

	useEffect(() => {
		checkForUpdates();
		window.api.send('toMain', ['get-version']);
		window.api.receive('fromMain', function (data) {
			if (data[0] === 'version') {
				setVersion(data[1]);
			}
		});
		return () => {
			_isMounted.current = false;
		};
	}, []);

	const restartAndInstallUpdate = () => {
		setDisableInstallButton(true);
		window.api.send('toMainInstallUpdate');
	};

	return (
		<Fieldset>
			<Grid.Container gap={2} style={{ padding: '0' }}>
				<Grid className={styles['centered']}>
					<div className={styles['update-icon']}>
						{isUpToDate ? <CheckInCircle /> : updateError ? <AlertCircleFill color='red' /> : isReadyToInstall ? <Info /> : <Spinner style={{ width: '50px', height: '50px' }} />}
					</div>
				</Grid>
				<Grid>
					<h3 style={{ margin: '0' }}>{updateStatus}</h3>
					{updateDetails && <span>{updateDetails}</span>}
				</Grid>
			</Grid.Container>
			<Fieldset.Footer>
				{version && `You are on version ${version}`}
				{(isReadyToInstall || updateError) && (
					<>
						{!updateError ? (
							<Button auto scale={1 / 2} onClick={restartAndInstallUpdate} loading={disableInstallButton} type='success'>
								Restart app and install update
							</Button>
						) : (
							<Button auto scale={1 / 2} onClick={checkForUpdates} type='secondary'>
								Retry update
							</Button>
						)}
					</>
				)}
				{!(isReadyToInstall || updateError) && (
					<Button auto scale={1 / 2} onClick={checkForUpdates} disabled={!isUpToDate}>
						Check for updates
					</Button>
				)}
			</Fieldset.Footer>
		</Fieldset>
	);
};

export default Updater;
