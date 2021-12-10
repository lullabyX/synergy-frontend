import Link from 'next/link';
import Head from 'next/head';
import { Fragment, useContext } from 'react';
import AuthContext from '../../store/auth-context';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
	const authCtx = useContext(AuthContext);
	return (
		<div>
			<Head>
				<title>SYNERGY</title>
			</Head>
			<header className={classes.header}>
				<Link href='/' passHref>
					<div className={classes.logo}>SYNERGY</div>
				</Link>
				<nav>
					<ul>
						{!authCtx.isLoggedIn && (
							<li>
								<Link href='/auth/login'>Login</Link>
							</li>
						)}
						{authCtx.isLoggedIn && (
							<Fragment>
								<li>
									<Link href='/profile'>Profile</Link>
								</li>
								<li>
									<button onClick={authCtx.logout}>Logout</button>
								</li>
							</Fragment>
						)}
					</ul>
				</nav>
			</header>
		</div>
	);
};

export default MainNavigation;
