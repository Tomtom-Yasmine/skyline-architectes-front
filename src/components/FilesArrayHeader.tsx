import { ReactComponent as ArrowIcon } from 'assets/icons/arrow.svg';
import React from 'react';
import cn from 'classnames';

type Props<T> = {
	onSortChange: (sortDirection: 'up' | 'down', column: T) => void;
	sortDirection: 'up' | 'down';
	columnSorted: T;
	columns: Array<{
		name: T;
		label: string;
	}>;
	filter?: React.ReactElement;
};

const FilesArrayHeader = <T,>({
	onSortChange,
	sortDirection,
	columns,
	columnSorted,
	filter,
}: Props<T>) => {
	const ArrowTransitionClass = 'transition-all duration-200 w-4 h-4';
	const handleSortChange = (column: T) => {
		if (column !== columnSorted) onSortChange('down', column);
		else sortDirection === 'up' ? onSortChange('down', column) : onSortChange('up', column);
	};

	return (
		<>
			<header className="grid grid-cols-5-1-1-1 pb-4 w-full relative">
				<div className="flex gap-16 items-center">
					{filter}
					<span className="flex-1 truncate col-span-1 flex gap-4 items-center pl-36">
						{columns[0].label}
						<button onClick={() => handleSortChange(columns[0].name)}>
							<ArrowIcon
								className={cn(ArrowTransitionClass, {
									'transform rotate-180':
										sortDirection === 'down' && columnSorted === columns[0].name,
									'transform rotate-0':
										sortDirection === 'up' || columnSorted !== columns[0].name,
								})}
							/>
						</button>
					</span>
				</div>
				{/* <button onClick={handlePinClick}>{pinned ? <PinIconFull /> : <PinIconEmpty />}</button> */}

				<div className="flex-1 truncate col-span-1 flex gap-4">
					{columns[1].label}
					<button onClick={() => handleSortChange(columns[1].name)}>
						<ArrowIcon
							className={cn(ArrowTransitionClass, {
								'transform rotate-180':
									sortDirection === 'down' && columnSorted === columns[1].name,
								'transform rotate-0':
									sortDirection === 'up' || columnSorted !== columns[1].name,
							})}
						/>
					</button>
				</div>
				<div className="flex-1 truncate col-span-1 flex gap-4">
					{columns[2].label}
					<button onClick={() => handleSortChange(columns[2].name)}>
						<ArrowIcon
							className={cn(ArrowTransitionClass, {
								'transform rotate-180':
									sortDirection === 'down' && columnSorted === columns[2].name,
								'transform rotate-0':
									sortDirection === 'up' || columnSorted !== columns[2].name,
							})}
						/>
					</button>
				</div>
				<span className="col-span-1">Options</span>
			</header>
		</>
	);
};

export default FilesArrayHeader;
