import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Authentication from 'pages/Authentication/Authentication';
import { ProtectedRoute, AdminProtectedRoute } from 'components';
import Home from 'pages/Home/Home';
import Statistics from 'pages/Statistics/Statistics';
import MyAccount from 'pages/MyAccount/MyAccount';
import Customers from 'pages/Customers';

//TODO : import lazy
const router = createBrowserRouter([
	{
		path: '/login',
		element: <Authentication />,
	},
	{
		path: '/',
		element: <ProtectedRoute />,
		children: [
			{ index: true, element: <Home /> },
			{ path: 'myaccount', element: <MyAccount /> },
			{ path: 'dashboard', element: <div>Dashboard</div> },
		],
	},
	{
		path: '/admin',
		element: <ProtectedRoute />,
	},
	{
		path: '/statistics',
		element: <AdminProtectedRoute />,
		children: [{ index: true, element: <Statistics /> }],
	},
	{
		path: '/customers/:id',
		element: <AdminProtectedRoute />,
		children: [{ index: true, element: <Customers /> }],
	},
]);

const AppRoute = () => {
	return <RouterProvider router={router} />;
};

export default AppRoute;
