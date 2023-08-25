import { Outlet, matchPath, useNavigate } from 'react-router-dom';
import React from 'react';
import cn from 'classnames';
import { Button, Profile } from 'components';
import { ReactComponent as Logo } from 'assets/images/logo.svg';
import { ReactComponent as FileIcon } from 'assets/icons/file_empty.svg';
import { ReactComponent as PinIcon } from 'assets/icons/pin_empty.svg';

type NavItemProps = {
	label: string;
	icon: any;
	onClick?: () => void;
	isActive?: () => boolean;
	innerChildren?: React.ReactNode;
	outerChildren?: React.ReactNode;
};

const NavItem = ({
	label,
	icon: Icon,
	onClick,
	isActive,
	innerChildren,
	outerChildren,
}: NavItemProps) => {
	return (
		<div className={cn('flex', 'flex-col', 'gap-2', 'w-full')}>
			<div
				className={cn(
					'flex',
					'flex-col',
					'gap-2',
					'text-neutral-light',
					'rounded-lg',
					'p-2',
					'w-full',
					{
						'cursor-pointer': onClick,
						'hover:bg-azul-300': onClick,
						'bg-azul-100': isActive && isActive(),
					}
				)}
				onClick={onClick}
			>
				<span className={cn('flex', 'gap-2')}>
					<Icon className="w-6 h-6 shrink-0" />
					<span className="text-sm font-semibold">{label}</span>
				</span>
				{innerChildren}
			</div>
			{outerChildren}
		</div>
	);
};

const Layout = () => {
	const navigate = useNavigate();

	return (
		<div className="flex p-8 pl-80 min-h-screen">
			<div
				style={{ height: 'calc(100vh - 4rem)' }}
				className="w-56 rounded-3xl bg-azul-500 h-screen fixed left-8 p-4 flex flex-col items-center"
			>
				<Logo className="w-32 h-40 cursor-pointer" onClick={() => navigate('/')} />
				<br />
				<div className="flex flex-col gap-4 w-full">
					<NavItem
						label="Tous les fichiers ici et là y'en a beaucoup frérot c'est ouf le nombre de fichiers que t'as"
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
								{/** TODO: add storage bar */}
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
			</div>
			<div className="w-full">
				<header className="w-full h-24">TODO HEADER</header>
				<Profile />
				<Outlet />
			</div>
		</div>
	);
};

export default Layout;
