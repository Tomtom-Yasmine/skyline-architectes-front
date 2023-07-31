import React, { useState, useEffect } from 'react';
import { PayButton, StockageSelector } from 'components';

type Stockage = {
	stockageUsed: number;
	stockageTotal: number;
};

const Storage = () => {
	//const api = useApi();
	const [currentStockage, setCurrentStockage] = useState<Stockage>({
		stockageUsed: 16,
		stockageTotal: 20,
	});
	const [newStockage, setNewStockage] = useState<number>(20);

	useEffect(() => {
		console.log(setCurrentStockage);
		//get user info
		//api.get('/me');
	}, []); //add api to dependency array

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
			<div className="flex row">
				<div className="flex flex-col gap-3">
					<h3 className="text-azul-300 text-3xl">Achat de stockage supplémentaire</h3>
					<StockageSelector
						currentStockage={newStockage}
						onStockageChange={setNewStockage}
						onLightBackground
					/>
				</div>
				<div className="flex flex-col gap-3 w-300"> </div>
			</div>
			<PayButton storage={newStockage} />
		</div>
	);
};

export default Storage;
