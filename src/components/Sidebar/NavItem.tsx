import React from 'react';
import cn from 'classnames';

type Props = {
	label: string;
	icon: any;
	activeIcon?: any;
	onClick?: () => void;
	isActive?: () => boolean;
	innerChildren?: React.ReactNode;
	outerChildren?: React.ReactNode;
};

const NavItem = ({
	label,
	icon,
	activeIcon,
	onClick,
	isActive,
	innerChildren,
	outerChildren,
}: Props) => {
	const Icon = isActive && isActive() && activeIcon ? activeIcon : icon;

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

export default NavItem;
