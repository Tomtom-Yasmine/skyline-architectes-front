import { Outlet } from 'react-router-dom';
import React from 'react';

const Layout = () => {
	return (
		<div className="flex p-8 pl-80 min-h-screen">
			<div
				style={{ height: 'calc(100vh - 4rem)' }}
				className="w-56 rounded-3xl bg-azul-500 h-screen fixed left-8"
			>
				TODO LEFT MENU
			</div>
			<div className="w-full">
				<header className="w-full h-24">TODO HEADER</header>
				<Outlet />
			</div>
		</div>
	);
};

export default Layout;
