import React, { useCallback } from 'react';

type Props = {
	file: File | null;
	onFileChange: (file: File | null) => void;
};

const FileUpload = ({ file, onFileChange }: Props) => {
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files && event.target.files[0];
		if (selectedFile) onFileChange(selectedFile);
	};

	const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => event.preventDefault();

	const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		const droppedFile = event.dataTransfer.files && event.dataTransfer.files[0];
		if (droppedFile) onFileChange(droppedFile);
	};

	const clearFile = useCallback(() => onFileChange(null), []);

	return (
		<div
			className="border-2 border-dashed border-neutral-dark p-4 rounded-lg text-center flex-1"
			onDragOver={handleDragOver}
			onDrop={handleDrop}
		>
			{file ? (
				<div>
					<div className="mb-2">Nom du fichier : {file.name}</div>
					<button className="bg-red-500 text-white px-2 py-1 rounded" onClick={clearFile}>
						Supprimer le fichier
					</button>
				</div>
			) : (
				<div>
					<div className="mb-2">Glissez et déposez un fichier ici</div>
					<label className="bg-azul-700 text-white px-2 py-1 rounded cursor-pointer">
						Sélectionner un fichier
						<input type="file" className="hidden" onChange={handleFileChange} />
					</label>
				</div>
			)}
		</div>
	);
};

export default FileUpload;
