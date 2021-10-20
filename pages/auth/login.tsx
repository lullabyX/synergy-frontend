import { useRouter } from 'next/dist/client/router';
import { useContext, useEffect, useState } from 'react';
import AuthForm from '../../components/Auth/AuthForm';
import AuthContext from '../../store/auth-context';

const AuthPage = () => {
	const authCtx = useContext(AuthContext);
	const router = useRouter();
	const [isRedirect, setIsRedirect] = useState(false);

	useEffect(() => {
		let isLoggedIn = authCtx.isLoggedIn;
		if (isLoggedIn) {
			setIsRedirect(true);
			router.push('/profile');
		} else {
			setIsRedirect(false);
		}
	}, []);

	if (isRedirect) {
		return <p>Redirecting...</p>;
	}
	return <AuthForm />;
};

export default AuthPage;
