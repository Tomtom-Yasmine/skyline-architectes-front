import React, { useState, useEffect } from 'react';
import { PayButton, StockageSelector } from 'components';
import { useApi } from 'hooks';

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

	useEffect(() => {
		const setUser = async () => {
			const user = await api.get('/me');
			setCurrentStockage({
				stockageUsed: user.data.user.totalUsedSizeBytes / 1_000_000_000,
				stockageTotal: user.data.user.storage,
			});
		};
		setUser();
	}, [api]);

	return (
		<div className="flex flex-col gap-24">
			<div className="text-2xl flex flex-col gap-4">
				<h2 className="text-3xl text-azul-300">Stockage actuel</h2>
				{currentStockage.stockageUsed} Go utilisés sur {currentStockage.stockageTotal} Go
				<div className="w-10/12 bg-neutral-light">
					<div
						className="h-3 bg-azul-700"
						style={{
							width: `${
								(currentStockage.stockageUsed / currentStockage.stockageTotal) * 100
							}%`,
						}}
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
