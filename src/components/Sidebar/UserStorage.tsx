import { User } from 'data.type';
import React from 'react';

type Props = {
	user?: User;
};

const UserStorage = ({ user }: Props) => {
	if (!user) return null;

	const totalUsedSizeBytes = Math.floor(user.totalUsedSizeBytes / 1_000_000_000);

	return (
		<div className="flex flex-col gap-2">
			<div className="flex flex-col gap-2">
				<div className="w-full bg-neutral-light rounded-sm">
					<div
						className="h-2 bg-azul-700 rounded-sm"
						style={{
							width: `${(totalUsedSizeBytes / user.storage) * 100}%`,
						}}
					/>
				</div>
				<span className="text-sm text-neutral-light">
					{totalUsedSizeBytes} Go utilisés sur {user.storage} Go
				</span>
			</div>
		</div>
	);
};

export default UserStorage;
