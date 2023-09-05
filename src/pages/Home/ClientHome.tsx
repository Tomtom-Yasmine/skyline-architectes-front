import React, { useState, useEffect } from 'react';
import { Button, FileLine, FileUpload } from 'components';
import { FilesArrayHeader } from 'components';
import { toast } from 'react-toastify';
import FileFilters from './FilesFilters';
import { Option } from 'react-multi-select-component';
import PinnedFileCard from './PinedFileCard';
import { FileData } from 'data.type';
import { getExtensionType } from 'helper/files';
import { useApi } from 'hooks';

const filterOptions: Option[] = [
	{ label: 'Images', value: 'images' },
	{ label: 'PDF', value: 'pdf' },
	{ label: 'excels', value: 'excels' },
];

type FilesFromBack = {
	id: string;
	slugName: string;
	displayName: string;
	serverPath: string;
	folderPath: string;
	uploadedAt: Date;
	extension: string;
	sizeBytes: number;
	isPinned: boolean;
	isDeleted: boolean;
	deletedAt?: Date | null;
	thumbnailPath?: string | null;
	type: 'INVOICE' | 'USER_FILE';
	userId: string;
};

const castFilesFromBack = (file: FilesFromBack) => ({
	name: file.displayName,
	creationDate: new Date(file.uploadedAt),
	size: file.sizeBytes,
	id: file.id,
	isPinned: file.isPinned,
	isEditing: false,
	url: '../assets/icons/add.svg',
});

const ClientHome = () => {
	const api = useApi();
	const [files, setFiles] = useState<FileData[]>([]);

	useEffect(() => {
		const setData = async () => {
			try {
				const { data } = (await api.get('/files')) as { data: { files: FilesFromBack[] } };
				const files = data.files;
				const formattedFiles = files.map((file) => castFilesFromBack(file));
				setFiles(formattedFiles);
			} catch (error) {
				toast.error('Erreur lors de la récupération de vos fichiers');
			}
		};
		setData();
	}, [api]);
	const [filters, setFilters] = useState<string[]>([]);
	const [newFile, setNewFile] = useState<File | null>(null);

	const createOptions = (fileId: string) => [
		{
			label: 'Ouvrir',
			onClick: handleOpen(fileId),
		},
		{
			label: 'Epingler',
			onClick: handlePinClick(fileId),
		},
		{
			label: 'Télécharger',
			onClick: handleDownload(fileId),
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
				setFiles(newFiles);
			},
		},
		// { label: 'Déplacer dans...', onClick: () => console.log('Déplacer dans...') },
		// { label: 'Voir les détails', onClick: () => console.log('Voir les détails') },
		{
			label: 'Supprimer',
			onClick: () => {
				const newFiles = files.filter((file) => file.id !== fileId);
				try {
					api.delete(`/file/${fileId}`);
					toast.success('Fichier supprimé avec succès');
				} catch (error) {
					toast.error('Impossible de supprimer la ressource');
				}
				setFiles(newFiles);
			},
		},
	];
	const handleDownload = (id: string) => async () => {
		try {
			const token = await api.get(`/file/${id}/access`);
			const url = `${process.env.REACT_APP_API_BASE_URL}file/${id}/download?accessToken=${token.data.accessToken}`;
			window.open(url);
		} catch (_) {
			toast.error('Erreur lors du téléchargement du fichier');
		}
	};

	const handleOpen = (id: string) => async () => {
		try {
			const result = await api.get(`/file/${id}/access`);
			const url = `${process.env.REACT_APP_API_BASE_URL}file/${id}/raw?accessToken=${result.data.accessToken}`;
			window.open(url, '_blank');
		} catch (_) {
			toast.error('Erreur lors de l\'ouverture du fichier');
		}
	};

	const handleNameChange = (fileId: string) => (newName: string) => {
		const newFiles = files.map((file) => {
			if (file.id === fileId) {
				return { ...file, name: newName, isEditing: false };
			}
			return file;
		});
		try {
			api.patch(`/file/${fileId}`, { displayName: newName });
			toast.success('Fichier renommé avec succès');
		} catch (error) {
			toast.error('Impossible de renommer le fichier');
		}
		setFiles(newFiles);
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
		try {
			api.patch(`/file/${fileId}`, { isPinned: !pin });
			if (pin) toast.success('Fichier désépinglé avec succès');
			else toast.success('Fichier épinglé avec succès');
		} catch (error) {
			toast.error('Impossible de modifier l\'épinglage');
		}
		setFiles(newFiles);
	};

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

	const handleUpload = async () => {
		if (newFile) {
			const formData = new FormData();
			formData.append('file', newFile);
			try {
				const response = await api.post('/file', formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				});
				const file = castFilesFromBack(response.data.file);
				setFiles((files) => [...files, file]);
				toast.success('Fichier uploadé avec succès');
				setNewFile(null);
			} catch (error) {
				toast.error('Erreur lors de l\'upload du fichier');
			}
		}
	};

	useEffect(() => {
		const queryParams = new URLSearchParams(location.search);
		const success = queryParams.get('success');
		if (success === 'false') toast.error('Erreur lors du paiement');
	}, []);

	return (
		<main className="bg-neutral-white  gap-12 flex flex-col">
			<div className="flex gap-4 rounded-3xl bg-neutral-light p-4 w-full overflow-hidden">
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
					{[...getFilteredFiles()]
						.sort(handleSort(sort.direction, sort.column))
						.map((file, index) => (
							<React.Fragment key={file.id}>
								<FileLine
									name={file.name}
									isNameBeingEdited={file.isEditing}
									isPinned={file.isPinned}
									date={file.creationDate}
									url={file.url}
									additionalInformation={`${(file.size / 1000000).toFixed(2)} Mo`}
									options={createOptions(file.id)}
									onNameChange={handleNameChange(file.id)}
									onPinClick={handlePinClick(file.id)}
									onDownloadClick={handleDownload(file.id)}
								/>
								{files.length - 1 !== index && (
									<div className="border-b border-neutral-light w-[98%]" />
								)}
							</React.Fragment>
						))}
				</div>
			</div>
			<div className="flex items-center w-full p-4 bg-neutral-light rounded-3xl gap-8">
				<FileUpload file={newFile} onFileChange={setNewFile} />
				<div className="flex flex-col justify-between h-20">
					{newFile && (
						<span className="text-neutral-dark text-lg">
							Poids : {(newFile.size / (1024 * 1024)).toFixed(2)} Mo
						</span>
					)}
					<Button className="px-8" category={'secondary'} onClick={handleUpload}>
						Uploader le fichier
					</Button>
				</div>
			</div>
		</main>
	);
};

export default ClientHome;
