import React from 'react';
import useAuth from 'hooks/useAuth';
import { Navigate } from 'react-router-dom';
import Layout from './Layout';

const ProtectedRoute = () => {
	const auth = useAuth();

	if (!auth?.info.isLogged)
		return (
			<Navigate
				to={{
					pathname: '/login',
				}}
			/>
		);
	return <Layout />;
};

export default ProtectedRoute;
