/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	env: {
		PROTOCOL: 'http://',
		HOSTNAME: 'localhost',
		PORT: 8080,
		PUT_SIGNUP_URL: 'http://localhost:8080/auth/signup',
		POST_LOGIN_URL: 'http://localhost:8080/auth/login',
	},
};
