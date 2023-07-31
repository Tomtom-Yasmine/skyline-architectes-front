import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Authentication from 'pages/Authentication/Authentication';
import { ProtectedRoute } from 'components';
import Home from 'pages/Home/Home';
import MyAccount from 'pages/MyAccount/MyAccount';

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
]);

const AppRoute = () => {
	return <RouterProvider router={router} />;
};

export default AppRoute;
