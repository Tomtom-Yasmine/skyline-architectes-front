import React from 'react';
import ClientHome from './ClientHome';
import AdminHome from './AdminHome';
import { useAuth } from 'hooks';

const Home = () => {
	const auth = useAuth();

	if (auth?.info.user?.role === 'USER') return <ClientHome />;
	return <AdminHome />;
};

export default Home;
