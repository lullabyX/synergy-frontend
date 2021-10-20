import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import UserProfile from '../components/Profile/UserProfile';
import AuthContext from '../store/auth-context';

const ProfilePage = () => {
	const authCtx = useContext(AuthContext);
	const router = useRouter();
	const [isRedirect, setIsRedirect] = useState(true);

	useEffect(() => {
		let isLoggedIn = authCtx.isLoggedIn;
		if (!isLoggedIn) {
			router.push('/auth/login');
		} else {
			setIsRedirect(false);
		}
	}, []);

	if (isRedirect) {
		return <p>Redirecting...</p>;
	}
	return <UserProfile />;
};

export default ProfilePage;
