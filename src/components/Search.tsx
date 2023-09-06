import React, { ComponentPropsWithoutRef } from 'react';
import { ReactComponent as MagnifyingGlassIcon } from 'assets/icons/magnifying_glass.svg';

type Props = ComponentPropsWithoutRef<'input'> & {
	setSearch: (search: string) => void;
	searchOn?: 'change' | 'submit';
};

const Search = ({
	setSearch,
	searchOn = 'change',
	placeholder = 'Rechercher',
	className,
	...props
}: Props) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	return (
		<div
			className={`flex gap-2 bg-neutral-lighter rounded-lg px-2 py-2 items-center ${className}`}
		>
			<input
				{...props}
				type="search"
				placeholder={placeholder}
				onChange={searchOn === 'change' ? handleChange : undefined}
				onSubmit={searchOn === 'submit' ? handleChange : undefined}
				className="grow bg-transparent"
			/>
			<MagnifyingGlassIcon className="w-5 h-5 cursor-pointer" />
		</div>
	);
};

export default Search;
