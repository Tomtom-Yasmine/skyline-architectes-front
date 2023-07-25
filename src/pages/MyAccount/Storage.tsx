import { StockageSelector } from 'components';
import React, { useState } from 'react';

type Props = {
	stockageUsed: number;
	stockageTotal: number;
};

const Storage = ({ stockageUsed, stockageTotal }: Props) => {
	const [newStockage, setNewStockage] = useState<number>(20);

	return (
		<div className="flex flex-col gap-24">
			<div className="text-2xl flex flex-col gap-4">
				<h2 className="text-3xl text-azul-300">Stockage actuel</h2>
				{stockageUsed} Go utilisés sur {stockageTotal} Go
				<div className="w-10/12 bg-neutral-light">
					<div
						className="h-3 bg-azul-700"
						style={{
							width: `${(stockageUsed / stockageTotal) * 100}%`,
						}}
					/>
				</div>
			</div>
			<div className="flex justify-between">
				<div className="flex flex-col gap-3">
					<h3 className="text-azul-300 text-3xl">Achat de stockage supplémentaire</h3>
					<StockageSelector
						currentStockage={newStockage}
						onStockageChange={setNewStockage}
						onLightBackground
					/>
				</div>
			</div>
		</div>
	);
};

export default Storage;
