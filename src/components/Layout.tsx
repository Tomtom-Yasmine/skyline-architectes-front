import { Outlet } from 'react-router-dom';
import React from 'react';

const Layout = () => {
	return (
		<div className="flex p-8 gap-16 min-h-screen">
			<div className="w-56 rounded-3xl bg-azul-500 min-h-full">TODO LEFT MENU</div>
			<div className="w-3/4">
				<header className="w-full h-24">TODO HEADER</header>
				<Outlet />
			</div>
		</div>
	);
};

export default Layout;
