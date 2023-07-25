import React, { useState } from 'react';
import { FileLine, UploadFile } from 'components';
import { FilesArrayHeader } from 'components';
import { toast } from 'react-toastify';
import FileFilters from './FilesFilters';
import { Option } from 'react-multi-select-component';
import PinnedFileCard from './PinedFileCard';
import { File } from 'data.type';
import { getExtensionType } from 'helper/files';

const filterOptions: Option[] = [
	{ label: 'Images', value: 'images' },
	{ label: 'PDF', value: 'pdf' },
	{ label: 'excels', value: 'excels' },
];

const Home = () => {
	const [files, setFiles] = useState<File[]>([
		{
			name: 'Fichier 1',
			creationDate: new Date(),
			lastOpenDate: new Date(),
			size: 50.06,
			id: '1',
			isPinned: false,
			isEditing: false,
			url: '../assets/icons/add.svg',
		},
		{
			name: 'Image 10',
			creationDate: new Date(),
			lastOpenDate: new Date(),
			size: 50.06,
			id: '10',
			isPinned: true,
			isEditing: false,
			url: 'https://www.referenseo.com/wp-content/uploads/2019/03/image-attractive.jpg',
		},
		{
			name: 'Fichier 2',
			creationDate: new Date(),
			lastOpenDate: new Date(),
			size: 4.06,
			id: '2',
			isPinned: true,
			isEditing: false,
			url: 'C:/Users/yasmi/Data/Etudes/Bachelor/Mémoire/annexe.pdf',
		},
		{
			name: 'Fichier 3',
			creationDate: new Date(),
			lastOpenDate: new Date(),
			size: 14.26,
			id: '3',
			isPinned: false,
			isEditing: false,
			url: 'C:/Users/yasmi/Data/Etudes/Bachelor/Mémoire/abreviations.pdf',
		},
	]);
	const [filters, setFilters] = useState<string[]>([]);

	const createOptions = (fileId: string) => [
		{
			label: 'Ouvrir',
			onClick: () => {
				const fileToOpen = files.find((file) => file.id === fileId);
				if (fileToOpen) {
					window.open(fileToOpen.url, '_blank');
				}
			},
		},
		{
			label: 'Epingler',
			onClick: handlePinClick(fileId),
		},
		{
			label: 'Télécharger',
			onClick: () => {
				const fileToDownload = files.find((file) => file.id === fileId);
				if (fileToDownload) {
					window.location.href = fileToDownload.url;
				}
			},
		},
		{
			label: 'Renommer',
			onClick: () => {
				const newFiles = files.map((file) => {
					if (file.id === fileId) {
						return { ...file, isEditing: true };
					}
					return file;
				});
				//todo: rename file in backend
				setFiles(newFiles);
			},
		},
		// { label: 'Déplacer dans...', onClick: () => console.log('Déplacer dans...') },
		// { label: 'Voir les détails', onClick: () => console.log('Voir les détails') },
		{
			label: 'Supprimer',
			onClick: () => {
				const newFiles = files.filter((file) => file.id !== fileId);
				//todo: delete file from backend
				toast.success('Fichier supprimé avec succès');
				// else toast.error(`Impossible de supprimer la ressource`);
				setFiles(newFiles);
			},
		},
	];

	const handleNameChange = (fileId: string) => (newName: string) => {
		const newFiles = files.map((file) => {
			if (file.id === fileId) {
				return { ...file, name: newName, isEditing: false };
			}
			return file;
		});
		//todo: rename file in backend
		setFiles(newFiles);
		toast.success('Fichier renommé avec succès');
	};

	const handlePinClick = (fileId: string) => () => {
		let pin = false;
		const newFiles = files.map((file) => {
			if (file.id === fileId) {
				pin = file.isPinned;
				return { ...file, isPinned: !file.isPinned };
			}
			return file;
		});
		//todo: pin file in backend

		//if response positive of the backend
		if (pin) toast.success('Fichier désépinglé avec succès');
		else toast.success('Fichier épinglé avec succès');
		// toast.error("Impossible de modifier l'épinglage");
		setFiles(newFiles);
	};

	const [sort, setSort] = useState<{
		direction: 'up' | 'down';
		column: 'name' | 'creationDate' | 'size';
	}>({
		direction: 'up',
		column: 'name',
	});

	const handleSort = (direction: 'up' | 'down', column: 'name' | 'creationDate' | 'size') => {
		const newFiles = files.sort((a, b) => {
			if (a[column] < b[column]) return direction === 'up' ? -1 : 1;
			if (a[column] > b[column]) return direction === 'up' ? 1 : -1;
			return 0;
		});
		setFiles(newFiles);
		setSort({ direction, column });
	};

	const getFilteredFiles = () => {
		if (filters.length === 0) return files;
		return files.filter((file) => {
			return (
				(filters.includes('images') && file.url.includes('jpg')) ||
				(filters.includes('pdf') && file.url.includes('pdf')) ||
				(filters.includes('excels') && file.url.includes('xls'))
			);
		});
	};

	const handleChangeFilters = (filters: Option[]) => {
		//TODO better understand this package
		filters.map((filter) => filter.value);
		setFilters(filters.map((filter) => filter.value));
	};

	console.log(filters);

	return (
		<main className="bg-neutral-white  gap-3">
			<div className="flex gap-4 rounded-3xl bg-neutral-light p-4 w-full overflow-hidden">
				{' '}
				{/* TODO add a hidden scrollbar */}
				{files
					.filter((file) => file.isPinned)
					.map((file) => (
						<PinnedFileCard
							onPinClick={handlePinClick(file.id)}
							options={createOptions(file.id)}
							key={file.id}
							file={file}
							extensionType={getExtensionType(file.url)}
						/>
					))}
			</div>
			<UploadFile />
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
						handleSort(direction, column)
					}
				/>

				<div className="bg-neutral-lighter w-full flex flex-col items-center ">
					{getFilteredFiles().map((file, index) => (
						<React.Fragment key={file.id}>
							<FileLine
								name={file.name}
								isNameBeingEdited={file.isEditing}
								isPinned={file.isPinned}
								date={file.creationDate}
								url={file.url}
								additionalInformation={`${file.size} Mo`}
								options={createOptions(file.id)}
								onNameChange={handleNameChange(file.id)}
								onPinClick={handlePinClick(file.id)}
							/>
							{files.length - 1 !== index && (
								<div className="border-b border-neutral-light w-[98%]" />
							)}
						</React.Fragment>
					))}
				</div>
			</div>
		</main>
	);
};

export default Home;
