import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useApi } from 'hooks';
import { FileData } from 'data.type';
import { FilesArrayHeader, FileLine, FileFilters } from 'components';
import { FilesFromBack } from 'data.type';
import { Option } from 'react-multi-select-component';

const filterOptions: Option[] = [
	{ label: 'Images', value: 'images' },
	{ label: 'PDF', value: 'pdf' },
	{ label: 'excels', value: 'excels' },
];

const Customers = () => {
	const { id } = useParams();
	const [files, setFiles] = useState<FileData[]>([]);
	const [filters, setFilters] = useState<string[]>([]);
	const api = useApi();

	useEffect(() => {
		const initiateFiles = async () => {
			try {
				const { data } = await api.get(`/files/${id}`);
				const files = data.files;
				const formattedFiles = files.map((file: FilesFromBack) => ({
					name: file.displayName,
					creationDate: new Date(file.uploadedAt),
					size: file.sizeBytes,
					id: file.id,
					isPinned: file.isPinned,
					isEditing: false,
					url: '../assets/icons/add.svg',
					extension: file.extension,
				}));
				setFiles(formattedFiles);
			} catch (error) {
				console.log(error);
			}
		};
		initiateFiles();
	}, [api, id]);

	const [sort, setSort] = useState<{
		direction: 'up' | 'down';
		column: 'name' | 'creationDate' | 'size';
	}>({
		direction: 'up',
		column: 'name',
	});

	const handleSort =
		(direction: 'up' | 'down', column: 'name' | 'creationDate' | 'size') =>
			(a: FileData, b: FileData) => {
				if (a[column] < b[column]) return direction === 'up' ? -1 : 1;
				if (a[column] > b[column]) return direction === 'up' ? 1 : -1;
				return 0;
			};

	const getFilteredFiles = () => {
		if (filters.length === 0) return files;
		return files.filter((file) => {
			return (
				(filters.includes('images') &&
					['jpg', 'jpeg', 'png', 'gif'].includes(file.extension)) ||
				(filters.includes('pdf') && file.extension === 'pdf') ||
				(filters.includes('excels') && file.extension === 'xlsx')
			);
		});
	};

	const handleChangeFilters = (filters: Option[]) => {
		//TODO better understand this package
		filters.map((filter) => filter.value);
		setFilters(filters.map((filter) => filter.value));
	};

	const filesSorted = [...getFilteredFiles()].sort(handleSort(sort.direction, sort.column));

	return (
		<div>
			<div className="flex flex-col bg-neutral-light py-5 px-1 rounded-3xl">
				<FilesArrayHeader
					filter={
						<FileFilters
							onFiltersChange={handleChangeFilters}
							filtersSelected={filterOptions.filter((filter) =>
								filters.includes(filter.value)
							)}
							options={filterOptions}
						/>
					}
					sortDirection={sort.direction}
					columnSorted={sort.column}
					columns={[
						{
							name: 'name',
							label: 'Nom',
						},
						{
							name: 'creationDate',
							label: 'Date',
						},
						{
							name: 'size',
							label: 'Taille',
						},
					]}
					onSortChange={(direction: 'up' | 'down', column: 'name' | 'creationDate' | 'size') =>
						setSort({ direction, column })
					}
				/>

				<div className="bg-neutral-lighter w-full flex flex-col items-center ">
					{filesSorted.length > 0 ? (
						filesSorted.map((file, index) => (
							<React.Fragment key={file.id}>
								<FileLine
									name={file.name}
									isNameBeingEdited={file.isEditing}
									isPinned={file.isPinned}
									date={file.creationDate}
									url={file.url}
									additionalInformation={`${(file.size / 1000000).toFixed(2)} Mo`}
								/>
								{files.length - 1 !== index && (
									<div className="border-b border-neutral-light w-[98%]" />
								)}
							</React.Fragment>
						))
					) : (
						<span className="text-red-500 text-2xl mx-auto">Pas de fichiers</span>
					)}
				</div>
			</div>
		</div>
	);
};

export default Customers;
