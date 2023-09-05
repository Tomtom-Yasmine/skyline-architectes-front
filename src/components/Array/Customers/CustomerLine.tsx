import React from 'react';
import StorageDisplay from './StorageDisplay';

type Props = {
	lastName: string;
	fistName: string;
	registerDate: Date;
	files: number;
	stockageAvailable: number;
	stockageused: number;
};

const CustomerLine = ({
	lastName,
	fistName,
	registerDate,
	files,
	stockageAvailable,
	stockageused,
}: Props) => {
	return (
		<div className="grid grid-cols-5 hover:bg-light-blue/20 h-12 items-center w-full px-3">
			<div className="col-span-1">{fistName}</div>
			<div className="col-span-1">{lastName}</div>
			<div className="col-span-1">{registerDate.toDateString()}</div>
			<div className="col-span-1">{files}</div>
			<div className="col-span-1">
				<StorageDisplay storageUsed={stockageused} storageTotal={stockageAvailable} />
			</div>
		</div>
	);
};

export default CustomerLine;
