import React, { useEffect, useState } from 'react';
import { ReactComponent as Logo } from 'assets/images/logo.svg';
import { ReactComponent as FileOutlineWhiteIcon } from 'assets/icons/file.outline.white.svg';
import { ReactComponent as FileFillWhiteIcon } from 'assets/icons/file.fill.white.svg';
import { ReactComponent as PinOutlineWhiteIcon } from 'assets/icons/pin.outline.white.svg';
import { ReactComponent as PinFillWhiteIcon } from 'assets/icons/pin.fill.white.svg';
import { ReactComponent as ClockOutlineWhiteIcon } from 'assets/icons/clock.outline.white.svg';
import { ReactComponent as ClockFillWhiteIcon } from 'assets/icons/clock.fill.white.svg';
import { ReactComponent as TrashcanOutlineWhiteIcon } from 'assets/icons/trashcan.outline.white.svg';
import { ReactComponent as TrashcanFillWhiteIcon } from 'assets/icons/trashcan.fill.white.svg';
import { ReactComponent as CloudFillWhiteIcon } from 'assets/icons/cloud.fill.white.svg';
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
						icon={FileOutlineWhiteIcon}
						activeIcon={FileFillWhiteIcon}
						onClick={() => navigate('/')}
						isActive={() => matchPath(window.location.pathname, '/') !== null}
					/>
					<NavItem
						label="Épinglés"
						icon={PinOutlineWhiteIcon}
						activeIcon={PinFillWhiteIcon}
						onClick={() => navigate('/home/pinned')}
						isActive={() => matchPath(window.location.pathname, '/home/pinned') !== null}
					/>
					<NavItem
						label="Récents"
						icon={ClockOutlineWhiteIcon}
						activeIcon={ClockFillWhiteIcon}
						onClick={() => navigate('/home/recent')}
						isActive={() => matchPath(window.location.pathname, '/home/recent') !== null}
					/>
					<NavItem
						label="Corbeille"
						icon={TrashcanOutlineWhiteIcon}
						activeIcon={TrashcanFillWhiteIcon}
						onClick={() => navigate('/home/trash')}
						isActive={() => matchPath(window.location.pathname, '/home/trash') !== null}
					/>
					<br />
					<NavItem
						label="Stockage"
						icon={CloudFillWhiteIcon}
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
						label="Clients"
						icon={FileOutlineWhiteIcon}
						activeIcon={FileFillWhiteIcon}
						onClick={() => navigate('/')}
						isActive={() => matchPath(window.location.pathname, '/') !== null}
					/>
					<NavItem
						label="Statistiques"
						icon={ClockOutlineWhiteIcon}
						activeIcon={ClockFillWhiteIcon}
						onClick={() => navigate('/statistics')}
						isActive={() => matchPath(window.location.pathname, '/statistics') !== null}
					/>
				</div>
			)}
		</div>
	);
};

export default Sidebar;
