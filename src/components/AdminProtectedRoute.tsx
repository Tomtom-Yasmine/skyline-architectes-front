import React from 'react';
import useAuth from 'hooks/useAuth';
import { Navigate } from 'react-router-dom';
import Layout from './Layout';
import { Role } from 'data.type';

const AdminProtectedRoute = () => {
	const auth = useAuth();

	if (auth?.info.user?.role !== Role.Admin)
		return (
			<Navigate
				to={{
					pathname: '/',
				}}
			/>
		);
	return <Layout />;
};

export default AdminProtectedRoute;
