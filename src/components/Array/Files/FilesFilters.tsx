import React from 'react';
import { MultiSelect, Option } from 'react-multi-select-component';

type Props<T extends Option> = {
	filtersSelected: Array<T>;
	onFiltersChange: (filters: Array<T>) => void;
	options: Array<{
		label: string;
		value: T;
	}>;
};

const FilesFilters = <T extends Option>({
	filtersSelected,
	onFiltersChange: handleFiltersChange,
	options,
}: Props<T>) => {
	return (
		<MultiSelect
			className="w-32"
			options={options}
			value={filtersSelected}
			onChange={handleFiltersChange}
			labelledBy="Select"
		/>
	);
};

export default FilesFilters;
