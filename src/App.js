// import Header from './components/Header.js';
//import Skeleton from './components/Skeleton';
import Button from './components/Button';
import { Add16, Home20, Help20 } from '@carbon/icons-react';

import Updater from './components/Updater';
import { Tile } from './components/Tile';
import { Content, PageContainer, Header, HeaderName, HeaderMenuButton, SideNav, SideNavMenu, SideNavMenuItem, SideNavItems, SideNavLink } from './components/UIShell';

import { HashRouter, Link, Route, Switch } from 'react-router-dom';

// When the application loads, check for updates and download them in the background
window.api.send('toMainUpdates');

const Home = () => {
	return (
		<div>
			<h1>Home</h1>
		</div>
	);
};

const Editor = () => {
	return (
		<div>
			<h1>Home</h1>
			<h2>Editor</h2>
		</div>
	);
};

const Cards = () => {
	return (
		<div>
			<h1>Home</h1>
			<h2>Cards</h2>
		</div>
	);
};

const About = () => {
	return (
		<div>
			<h1>About</h1>
			<Updater />
		</div>
	);
};

function App() {
	const expandOnHover = false;
	const withSideNav = true;
	return (
		<HashRouter>
			<div className='App'>
				<PageContainer
					render={({ windowHash, isSideNavExpanded, onClickSideNavExpand }) => (
						<>
							<Header>
								<HeaderMenuButton aria-label='Open menu' isCollapsible onClick={onClickSideNavExpand} isActive={isSideNavExpanded} />
								<HeaderName href='#' prefix='Highlight'>
									<Switch>
										<Route exact path='/'>
											Home
										</Route>
										<Route exact path='/home/editor'>
											Editor
										</Route>
										<Route exact path='/home/cards'>
											Cards
										</Route>
										<Route exact path='/about'>
											About
										</Route>
									</Switch>
								</HeaderName>
								<SideNav aria-label='Side navigation' isRail expandOnHover={expandOnHover} expanded={isSideNavExpanded} onOverlayClick={onClickSideNavExpand}>
									<SideNavItems>
										<SideNavMenu renderIcon={Home20} title='Home' isActive={(windowHash && windowHash.startsWith('/home')) || windowHash === '/'}>
											<SideNavMenuItem href='#/home/editor'>Editor</SideNavMenuItem>
											<SideNavMenuItem href='#/home/cards'>Cards</SideNavMenuItem>
										</SideNavMenu>
										<SideNavLink href='#/about' renderIcon={Help20} isActive={windowHash && windowHash.startsWith('/about')}>
											About
										</SideNavLink>
									</SideNavItems>
								</SideNav>
							</Header>

							<div style={withSideNav ? { overflowX: 'hidden' } : {}}>
								<Content withSideNav={withSideNav} isSideNavExpanded={isSideNavExpanded}>
									<Switch>
										<Route exact path='/' component={Home} />
										<Route exact path='/home/editor' component={Editor} />
										<Route exact path='/home/cards' component={Cards} />
										<Route exact path='/about' component={About} />
									</Switch>
								</Content>
							</div>
						</>
					)}
				/>
			</div>
		</HashRouter>
	);
}

export default App;
