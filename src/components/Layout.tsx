import { Outlet } from 'react-router-dom';
import React, { useState } from 'react';
import { Profile } from 'components';
import Search from './Search';
import { useAuth } from 'hooks';
import { User } from 'data.type';
import Sidebar from './Sidebar/Sidebar';

const Layout = () => {
	const auth = useAuth();

	const [user, setUser] = useState<User | undefined>(undefined);
	console.log(user, setUser);
	const [search, setSearch] = React.useState('');
	console.log(search);
	return (
		<div className="flex p-8 pl-80 min-h-screen">
			<Sidebar />
			<div className="w-full">
				<header className="w-full h-24">
					<div className="flex justify-between items-center h-full">
						<Search setSearch={setSearch} className="w-96 shrink" />
						{auth?.info.user?.role === 'USER' && <Profile />}
					</div>
				</header>
				<Outlet />
			</div>
		</div>
	);
};

export default Layout;
