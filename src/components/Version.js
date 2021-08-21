import { useEffect, useState } from 'react';
import Skeleton from './Skeleton/index';

const Version = () => {
	const [version, setVersion] = useState(null);
	useEffect(() => {
		window.api.send('toMain', ['get-version']);
		window.api.receive('fromMain', function (data) {
			if (data[0] === 'version') {
				setVersion(data[1]);
			}
		});
	}, []);

	return (
		<div>
			<div style={version ? {} : { display: 'flex' }}>
				<b>Version: </b>
				{version ? version : <Skeleton margin='none' style={{marginLeft: '.5rem', width: '40px', alignSelf: 'center'}} />}
			</div>
		</div>
	);
};

export default Version;
