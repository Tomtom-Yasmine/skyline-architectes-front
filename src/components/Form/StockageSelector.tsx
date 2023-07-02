import React from 'react';
import { ReactComponent as AddIcon } from 'assets/icons/add.svg';
import { ReactComponent as RemoveIcon } from 'assets/icons/remove.svg';
import cn from 'classnames';

const PRICE_PER_GB = 1;

type Props = {
	currentStockage: number;
	onStockageChange: (stockage: number) => void;
};

const StockageSelector = ({ currentStockage, onStockageChange: handleStockageChange }: Props) => {
	const isDisabled = currentStockage <= 20;

	const handleAddStockage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		handleStockageChange(currentStockage + 20);
	};

	const handleRemoveStockage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		if (!isDisabled) handleStockageChange(currentStockage - 20);
	};

	return (
		<div>
			<div className="flex justify-between items-center">
				<button
					className={cn(
						'rounded-full h-10 w-10 flex items-center  justify-center bg-slate-50',
						{
							'bg-slate-300 cursor-not-allowed': isDisabled,
							'bg-slate-50': !isDisabled,
						}
					)}
					onClick={handleRemoveStockage}
					disabled={isDisabled}
				>
					<RemoveIcon />
				</button>
				<div className="flex flex-col items-center justify-center">
					<span className="text-5xl font-bold text-neutral-white">{currentStockage} GO</span>
					<span className="text-neutral-white text-2xl">
						soit {currentStockage * PRICE_PER_GB} €*
					</span>
				</div>
				<button
					className="rounded-full h-10 w-10 flex items-center  justify-center bg-slate-50"
					onClick={handleAddStockage}
				>
					<AddIcon />
				</button>
			</div>
			<span className="text-neutral-white text-sm">* Paiment en une fois</span>
		</div>
	);
};
export default StockageSelector;
