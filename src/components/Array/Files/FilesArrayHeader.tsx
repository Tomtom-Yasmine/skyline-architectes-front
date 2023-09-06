import { ReactComponent as ArrowIcon } from 'assets/icons/arrow.svg';
import { ReactComponent as MagnifyingGlassIcon } from 'assets/icons/magnifying_glass.svg';
import React, { useState } from 'react';
import cn from 'classnames';

type Props<T> = {
	onSortChange: (sortDirection: 'up' | 'down', column: T) => void;
	onSearchChange?: (search: string) => void;
	sortDirection: 'up' | 'down';
	columnSorted: T;
	columns: Array<{
		name: T;
		label: string;
	}>;
	search?: string;
	filter?: React.ReactElement;
};

const FilesArrayHeader = <T,>({
	onSortChange,
	onSearchChange,
	sortDirection,
	columns,
	columnSorted,
	search,
	filter,
}: Props<T>) => {
	const ArrowTransitionClass = 'transition-all duration-200 w-4 h-4';
	const handleSortChange = (column: T) => {
		if (column !== columnSorted) onSortChange('down', column);
		else sortDirection === 'up' ? onSortChange('down', column) : onSortChange('up', column);
	};

	const handleSearchChange = (search: string) => {
		if (onSearchChange) onSearchChange(search);
	};

	const [isSearchVisible, setIsSearchVisible] = useState(false);

	return (
		<>
			<header className="flex flex-col w-full">
				<div className="grid grid-cols-5-1-1-1 pb-4">
					<div className="flex gap-4 items-center">
						{onSearchChange && (
							<MagnifyingGlassIcon
								onClick={() => setIsSearchVisible(!isSearchVisible)}
								className="ml-2 w-5 h-5 cursor-pointer"
							/>
						)}
						{filter}
						<span className="flex-1 truncate col-span-1 flex gap-4 items-center">
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
					<div className="flex-1 truncate col-span-1 flex gap-4 items-center">
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
					<div className="flex-1 truncate col-span-1 flex gap-4 items-center">
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
					<span className="col-span-1 flex items-center">Options</span>
				</div>
				{isSearchVisible && (
					<div className="flex gap-4 items-center">
						<input
							type="search"
							placeholder="Rechercher..."
							value={search}
							onChange={(e) => handleSearchChange(e.target.value)}
							className="flex-1 bg-transparent border rounded px-2 py-1 focus:outline-none focus:ring focus:border-blue-300"
						/>
					</div>
				)}
			</header>
		</>
	);
};

export default FilesArrayHeader;
