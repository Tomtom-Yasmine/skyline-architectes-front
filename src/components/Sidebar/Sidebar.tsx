import React, { useEffect, useState } from 'react';
import { ReactComponent as Logo } from 'assets/images/logo.svg';
import { ReactComponent as FileIcon } from 'assets/icons/file_empty.svg';
import { ReactComponent as PinIcon } from 'assets/icons/pin_empty.svg';
import NavItem from './NavItem';
import { matchPath, useNavigate } from 'react-router-dom';
import { useApi } from 'hooks';
import { User, Role } from 'data.type';
import UserStorage from './UserStorage';
import Button from 'components/Form/Button';

const Sidebar = () => {
	const navigate = useNavigate();
	const api = useApi();

	const [user, setUser] = useState<User | undefined>(undefined);

	useEffect(() => {
		(async () => {
			const user = await api.get('/me');
			setUser(user.data.user);
		})();
	}, [api]);

	return (
		<div
			style={{ height: 'calc(100vh - 4rem)' }}
			className="w-56 rounded-3xl bg-azul-500 h-screen fixed left-8 p-4 flex flex-col items-center"
		>
			<Logo className="w-32 h-40 cursor-pointer" onClick={() => navigate('/')} />
			<br />
			{user?.role === Role.User ? (
				<div className="flex flex-col gap-4 w-full">
					<NavItem
						label="Tous les fichiers"
						icon={FileIcon}
						onClick={() => navigate('/')}
						isActive={() => matchPath(window.location.pathname, '/') !== null}
					/>
					<NavItem
						label="Épinglés"
						icon={PinIcon}
						onClick={() => navigate('/home/pinned')}
						isActive={() => matchPath(window.location.pathname, '/home/pinned') !== null}
					/>
					<NavItem
						label="Récents"
						icon={PinIcon}
						onClick={() => navigate('/home/recent')}
						isActive={() => matchPath(window.location.pathname, '/home/recent') !== null}
					/>
					<NavItem
						label="Corbeille"
						icon={PinIcon}
						onClick={() => navigate('/home/trash')}
						isActive={() => matchPath(window.location.pathname, '/home/trash') !== null}
					/>
					<br />
					<NavItem
						label="Stockage"
						icon={PinIcon}
						outerChildren={
							<>
								<UserStorage user={user} />
								<Button
									category={'primary'}
									className="rounded-lg text-sm"
									onClick={() => navigate('/myaccount?tab=storageOffer')}
								>
									Acheter plus de stockage
								</Button>
							</>
						}
					/>
				</div>
			) : (
				<div className="flex flex-col gap-4 w-full">
					<NavItem
						label="Tous les clients"
						icon={FileIcon}
						onClick={() => navigate('/')}
						isActive={() => matchPath(window.location.pathname, '/customers') !== null}
					/>
					<NavItem
						label="Statistiques"
						icon={PinIcon}
						onClick={() => navigate('/statistics')}
						isActive={() => matchPath(window.location.pathname, '/statistics') !== null}
					/>
				</div>
			)}
		</div>
	);
};

export default Sidebar;
