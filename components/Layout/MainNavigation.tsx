import Link from 'next/link';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
	return (
		<header className={classes.header}>
			<Link href='/' passHref>
				<div className={classes.logo}>Synergy</div>
			</Link>
			<nav>
				<ul>
					<li>
						<Link href='/auth/login'>Login</Link>
					</li>
					<li>
						<Link href='/profile'>Profile</Link>
					</li>
					<li>
						<button>Logout</button>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default MainNavigation;
