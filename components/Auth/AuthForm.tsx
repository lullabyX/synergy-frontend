import { GetServerSideProps } from 'next';
import { useContext, useRef, useState } from 'react';
import AuthContext from '../../store/auth-context';
import { useRouter } from 'next/router'


import classes from './AuthForm.module.css';

const AuthForm = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [errorMessage, setErrorMessage] = useState({});
	const [isLogin, setIsLogin] = useState(true);

	const authCtx = useContext(AuthContext);

	const emailInputRef = useRef<HTMLInputElement>(null);
	const passwordInputRef = useRef<HTMLInputElement>(null);
	const usernameInputRef = useRef<HTMLInputElement>(null);
	const confirmPasswordInputRef = useRef<HTMLInputElement>(null);

	let enteredUsername: string;
	let enteredEmail: string;
	let enteredPassword: string;
	let enteredConfirmPassword: string;

	const switchAuthModeHandler = () => {
		setIsLogin((prevState) => !prevState);
	};

	const submitHandler = async (event: any) => {
		event.preventDefault();

		if (
			emailInputRef.current !== null &&
			passwordInputRef.current !== null
		) {
			enteredEmail = emailInputRef.current.value;
			enteredPassword = passwordInputRef.current.value;
		}

		setIsLoading(true);
		if (isLogin) {
			const URL: string = (process.env.API + '/auth/login') as string;

			const response = await fetch(URL, {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify({
					email: enteredEmail,
					password: enteredPassword,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const data = await response.json();

			if (response.ok) {
				//redirect?
				const expirationTime = new Date(
					new Date().getTime() + +data.tokenTimeout * 3600000
				);
				authCtx.login(data.token, expirationTime.toISOString());
				console.log(data);
				localStorage.setItem('username',data.username);
				//console.log(response.headers);
				router.push('/dashboard');
			} else {
				setHasError(true);

				const errorMessage = data.message;
				alert(errorMessage);
				console.log(data);
			}
			setIsLoading(false);
		} else {
			if (
				usernameInputRef.current !== null &&
				confirmPasswordInputRef.current !== null
			) {
				enteredUsername = usernameInputRef.current.value;
				enteredConfirmPassword = confirmPasswordInputRef.current.value;
			}

			let URL: string = (process.env.API + '/auth/signup') as string;

			fetch(URL, {
				method: 'PUT',
				body: JSON.stringify({
					username: enteredUsername,
					email: enteredEmail,
					password: enteredPassword,
					confirmPassword: enteredConfirmPassword,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			})
				.then((res) => {
					if (res.ok) {
						//redirect?
						res.json().then((data) => {
							console.log(data);
						});
					} else {
						res.json().then((data) => {
							setHasError(true);

							const errorMessage = data.message;
							alert(errorMessage);
							console.log(data);
						});
					}
					setIsLoading(false);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	return (
		<section className={classes.auth}>
			<h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
			<form onSubmit={submitHandler}>
				{!isLogin && (
					<div className={classes.control}>
						<label htmlFor='username'>Username of Choice</label>
						<input
							type='text'
							id='username'
							required
							ref={usernameInputRef}
						/>
					</div>
				)}
				<div className={classes.control}>
					<label htmlFor='email'>Your Email</label>
					<input
						type='email'
						id='email'
						required
						ref={emailInputRef}
					/>
				</div>
				<div className={classes.control}>
					<label htmlFor='password'>Your Password</label>
					<input
						type='password'
						id='password'
						required
						ref={passwordInputRef}
					/>
				</div>
				{!isLogin && (
					<div className={classes.control}>
						<label htmlFor='confirmPassword'>
							Confirm Password
						</label>
						<input
							type='password'
							id='confirmPassword'
							required
							ref={confirmPasswordInputRef}
						/>
					</div>
				)}
				<div className={classes.actions}>
					{!isLoading && (
						<button>{isLogin ? 'Login' : 'Create Account'}</button>
					)}
					{isLoading && (
						<button disabled>
							{isLogin ? 'Logging in...' : 'Creating Account...'}
						</button>
					)}
					<button
						type='button'
						className={classes.toggle}
						onClick={switchAuthModeHandler}
					>
						{isLogin
							? 'Create new account'
							: 'Login with existing account'}
					</button>
				</div>
			</form>
		</section>
	);
};

export default AuthForm;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { req, res } = ctx;

	const { cookies } = req;
	console.log(cookies);

	res.setHeader('set-cookie', ['refreshToken=1', 'refreshTokenTimeout=1']);

	return { props: {} };
};
