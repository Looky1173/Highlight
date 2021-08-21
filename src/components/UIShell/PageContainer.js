import React, { useEffect, useState, useCallback } from 'react';

const PageContainer = ({ isSideNavExpanded, render: Children }) => {
	//state for expandable sidenav
	const [isSideNavExpandedState, setIsSideNavExpandedState] = useState(isSideNavExpanded);
	const [windowHash, setWindowHash] = useState(null);

	function setWindowHashState(){
		setWindowHash(window.location.hash.substring(1));
		console.log('HASH')
	}

	const handleHeaderMenuButtonClick = useCallback(() => {
		setIsSideNavExpandedState((prevIsSideNavExpanded) => !prevIsSideNavExpanded);
	}, [setIsSideNavExpandedState]);

	useEffect(() => {
		const setWindowHashState = (event) => {
			setWindowHash(window.location.hash.substring(1));
			console.log('HASH')
		}
		setWindowHashState();
		window.addEventListener('hashchange', setWindowHashState);

		return () => window.removeEventListener('hashchange', setWindowHashState);
	}, []);

	return <Children windowHash={windowHash} isSideNavExpanded={isSideNavExpandedState} onClickSideNavExpand={handleHeaderMenuButtonClick} />;
};

PageContainer.defaultProps = {
	isSideNavExpanded: false,
};

export default PageContainer;
