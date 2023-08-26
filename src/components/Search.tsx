import React, { ComponentPropsWithoutRef } from 'react';
import { ReactComponent as PinIcon } from 'assets/icons/pin_empty.svg';

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
		<div className={`flex gap-2 bg-neutral-lighter rounded-lg px-2 py-2 ${className}`}>
			<input
				{...props}
				type="search"
				placeholder={placeholder}
				onChange={searchOn === 'change' ? handleChange : undefined}
				onSubmit={searchOn === 'submit' ? handleChange : undefined}
				className="grow bg-transparent"
			/>
			<PinIcon className="w-8 h-8 cursor-pointer" />
		</div>
	);
};

export default Search;
