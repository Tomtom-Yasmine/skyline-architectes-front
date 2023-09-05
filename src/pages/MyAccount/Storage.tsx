import React, { useState, useEffect } from 'react';
import { PayButton, StockageSelector } from 'components';
import { useApi } from 'hooks';
import cn from 'classnames';

type Stockage = {
	stockageUsed: number;
	stockageTotal: number;
};

const Storage = () => {
	const api = useApi();
	const [currentStockage, setCurrentStockage] = useState<Stockage>({
		stockageUsed: 0,
		stockageTotal: 20,
	});
	const [newStockage, setNewStockage] = useState<number>(20);

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

	useEffect(() => {
		const setUser = async () => {
			const user = await api.get('/me');
			setCurrentStockage({
				stockageUsed: user.data.user.totalUsedSizeBytes,
				stockageTotal: user.data.user.storage,
			});
		};
		setUser();
	}, [api]);

	const usageInPercent =
		currentStockage.stockageTotal > 0
			? parseFloat(
				(
					(currentStockage.stockageUsed / (currentStockage.stockageTotal * 1000000000)) *
						100
				).toFixed(1)
			  ) || 0
			: 0;

	return (
		<div className="flex flex-col gap-24">
			<div className="text-2xl flex flex-col gap-4">
				<h2 className="text-3xl text-azul-300">Stockage actuel</h2>
				{getElementSize(currentStockage.stockageUsed)} utilisés sur{' '}
				{currentStockage.stockageTotal} Go
				<div className="w-10/12 bg-neutral-light">
					<div
						style={{ width: `${usageInPercent}%` }}
						className={cn('h-3 bg-azul-700', {
							'bg-red-500': usageInPercent > 90,
							'bg-yellow-500': usageInPercent > 50 && usageInPercent <= 90,
							'bg-green-500': usageInPercent <= 50,
						})}
					/>
				</div>
			</div>
			<div className="flex row justify-center">
				<div className="flex flex-col gap-3">
					<h3 className="text-azul-300 text-3xl">Achat de stockage supplémentaire</h3>
					<StockageSelector
						currentStockage={newStockage}
						onStockageChange={setNewStockage}
						onLightBackground
					/>
				</div>
			</div>
			<PayButton storage={newStockage} className="w-4/12 mx-auto" />
		</div>
	);
};

export default Storage;
