import React, { useState } from 'react';
import useAuth from 'hooks/useAuth';
import { FileLine, UploadFile } from 'components';
import { FilesArrayHeader } from 'components';
import { toast } from 'react-toastify';

const Home = () => {
	const auth = useAuth();

	const [files, setFiles] = useState<
		{
			name: string;
			date: Date;
			size: number;
			id: string;
			isPinned: boolean;
			isEditing: boolean;
			url: string;
		}[]
	>([
		{
			name: 'Fichier 1',
			date: new Date(),
			size: 50.06,
			id: '1',
			isPinned: false,
			isEditing: false,
			url: '../assets/icons/add.svg',
		},
		{
			name: 'Fichier 2',
			date: new Date(),
			size: 4.06,
			id: '2',
			isPinned: true,
			isEditing: false,
			url: 'C:/Users/yasmi/Data/Etudes/Bachelor/Mémoire/annexe.pdf',
		},
		{
			name: 'Fichier 3',
			date: new Date(),
			size: 14.26,
			id: '3',
			isPinned: false,
			isEditing: false,
			url: 'C:/Users/yasmi/Data/Etudes/Bachelor/Mémoire/abreviations.pdf',
		},
	]);

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

	const [sort, setSort] = useState<{ direction: 'up' | 'down'; column: 'name' | 'date' | 'size' }>(
		{
			direction: 'up',
			column: 'name',
		}
	);

	const handleSort = (direction: 'up' | 'down', column: 'name' | 'date' | 'size') => {
		const newFiles = files.sort((a, b) => {
			console.log(a[column]);
			console.log(b[column]);
			console.log(a[column] < b[column]);
			if (a[column] < b[column]) return direction === 'up' ? -1 : 1;
			if (a[column] > b[column]) return direction === 'up' ? 1 : -1;
			return 0;
		});
		setFiles(newFiles);
		setSort({ direction, column });
	};
	return (
		<main className="bg-neutral-white  gap-3">
			<button onClick={() => auth?.dispatch({ type: 'logout' })}>Logout</button>
			<UploadFile />
			<div className="flex flex-col bg-neutral-light py-5 px-1 rounded-3xl">
				<FilesArrayHeader
					sortDirection={sort.direction}
					columnSorted={sort.column}
					columns={[
						{
							name: 'name',
							label: 'Nom',
						},
						{
							name: 'date',
							label: 'Date',
						},
						{
							name: 'size',
							label: 'Taille',
						},
					]}
					onSortChange={(direction: 'up' | 'down', column: 'name' | 'date' | 'size') =>
						handleSort(direction, column)
					}
				/>

				<div className="bg-neutral-lighter w-full flex flex-col items-center ">
					{files.map((file, index) => (
						<React.Fragment key={file.id}>
							<FileLine
								name={file.name}
								isNameBeingEdited={file.isEditing}
								isPinned={file.isPinned}
								date={file.date}
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
