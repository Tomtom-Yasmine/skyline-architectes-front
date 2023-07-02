import React from 'react';
import useAuth from 'hooks/useAuth';
import { Outlet, Navigate } from 'react-router-dom';

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
	return <Outlet />;
};

export default ProtectedRoute;
