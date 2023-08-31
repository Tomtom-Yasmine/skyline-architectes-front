import { Outlet, matchPath, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { NavItem, UserStorage } from 'components';
import { Button, Profile } from 'components';
import { ReactComponent as Logo } from 'assets/images/logo.svg';
import { ReactComponent as FileIcon } from 'assets/icons/file_empty.svg';
import { ReactComponent as PinIcon } from 'assets/icons/pin_empty.svg';
import Search from './Search';
import { useApi } from 'hooks';
import { User } from 'data.type';
import Sidebar from './Sidebar/Sidebar';

const Layout = () => {
	const navigate = useNavigate();
	const api = useApi();

	const [user, setUser] = useState<User | undefined>(undefined);
  
  const [search, setSearch] = React.useState('');

	return (
		<div className="flex p-8 pl-80 min-h-screen">
			<Sidebar />
			<div className="w-full">
				<header className="w-full h-24">
					<div className="flex justify-between items-center h-full">
						<Search setSearch={setSearch} className="w-96 shrink" />
						<Profile />
					</div>
				</header>
				<Outlet />
			</div>
		</div>
	);
};

export default Layout;
