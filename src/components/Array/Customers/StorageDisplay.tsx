import React from 'react';
import cn from 'classnames';

type Props = {
	storageTotal: number;
	storageUsed: number;
};

const StorageDisplay = ({ storageTotal, storageUsed }: Props) => {
	const usageInPercent =
		storageTotal > 0
			? parseFloat(((storageUsed / (storageTotal * 1000000000)) * 100).toFixed(1)) || 0
			: 0;

	const getElementSize = (sizeOctet: number) => {
		const units = ['o', 'Ko', 'Mo', 'Go', 'To'];
		let size = sizeOctet;

		let unitIndex = 0;
		while (size >= 1000 && unitIndex < units.length - 1) {
			size /= 1000;
			unitIndex++;
		}

		return `${size.toFixed(2)} ${units[unitIndex]}`;
	};

	return (
		<div className="flex items-end gap-2 flex-col">
			<span>
				{usageInPercent}% ({getElementSize(storageUsed)} sur {storageTotal} Go)
			</span>
			<div className="w-full flex h-2 rounded-3xl overflow-hidden bg-neutral-grey">
				<div
					style={{ width: `${usageInPercent}%` }}
					className={cn('h-2', {
						'bg-red-500': usageInPercent > 90,
						'bg-yellow-500': usageInPercent > 50 && usageInPercent <= 90,
						'bg-green-500': usageInPercent <= 50,
					})}
				/>
			</div>
		</div>
	);
};

export default StorageDisplay;
