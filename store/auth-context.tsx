import React, { useContext, useState } from 'react';

let logoutTimer: NodeJS.Timeout;

const AuthContext = React.createContext({
	token: '',
	isLoggedIn: false,
	login: (token: string) => {},
	logout: () => {},
});

export const calculateRemainingTime = (expirationTime: string) => {
	const currentTime = new Date().getTime(); // in ms
	const adjExpirationTime = new Date(expirationTime).getTime();

	const remainingDuration = adjExpirationTime - currentTime;

	return remainingDuration;
};

export function AuthContextProvider(props: any) {
	let storedToken;
	if (typeof window !== 'undefined') {
		storedToken = localStorage.getItem('token');
	}
	const [token, setToken] = useState(storedToken);

	const userIsLoggedIn = !!token;

	function logoutHandler() {
		localStorage.removeItem('token');
		setToken(null);

		if (logoutTimer) {
			clearTimeout(logoutTimer);
		}
	}

	function loginHandler(token: any, expirationTime: string) {
		localStorage.setItem('token', token);
		localStorage.setItem('tokenTimeout', expirationTime);
		setToken(token);

		const remainingTime = calculateRemainingTime(expirationTime);

		logoutTimer = setTimeout(logoutHandler, remainingTime);
	}

	const contextValue:any = {
		token: token,
		isLoggedIn: userIsLoggedIn,
		login: loginHandler,
		logout: logoutHandler,
	};

	return (
		<AuthContext.Provider value={contextValue}>
			{props.children}
		</AuthContext.Provider>
	);
}

export default AuthContext;
