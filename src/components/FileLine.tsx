import React, { useState } from 'react';
import { ReactComponent as PinIconFull } from 'assets/icons/pin_full.svg';
import { ReactComponent as PinIconEmpty } from 'assets/icons/pin_empty.svg';
import { ReactComponent as DownloadIcon } from 'assets/icons/download.svg';
import { ReactComponent as FileIcon } from 'assets/icons/file_empty.svg';
import { ReactComponent as PDFIcon } from 'assets/icons/pdf.svg';
import { ReactComponent as ImageIcon } from 'assets/icons/image.svg';
import { ReactComponent as ExcelIcon } from 'assets/icons/calc.svg';
import Options from './Options';

type Props = {
	name: string;
	isPinned: boolean;
	date: string;
	url: string;
	additionalInformation: string;
	isNameBeingEdited?: boolean;
	onNameChange: (name: string) => void;
	onPinClick: () => void;
	options?: Array<{
		label: string;
		onClick: () => void;
	}>;
};

const FileLine = ({
	name,
	isPinned,
	date,
	url,
	additionalInformation,
	options = [],
	isNameBeingEdited = false,
	onNameChange: handleNameChange,
	onPinClick: handlePinClick,
}: Props) => {
	const [newName, setNewName] = useState(name);

	const getIcon = (url: string) => {
		const lastDotIndex = url.lastIndexOf('.');
		const extension = lastDotIndex === -1 ? '' : url.slice(lastDotIndex + 1);

		if (extension === 'pdf') return <PDFIcon />;
		if (['png', 'jpg', 'jpeg', 'gif'].includes(extension)) return <ImageIcon />;
		if (['xls', 'xlsx'].includes(extension)) return <ExcelIcon />;

		return <FileIcon />;
	};

	return (
		<div className="flex items-center gap-7 h-12 px-3 bg-neutral-lighter hover:bg-light-blue/20">
			{getIcon(url)}

			<div className="flex-1 truncate">
				{isNameBeingEdited ? (
					<input
						type="text"
						value={newName}
						onChange={(e) => setNewName(e.target.value)}
						onBlur={() => handleNameChange(newName)}
						className="flex-1 border rounded px-2 py-1 focus:outline-none focus:ring focus:border-blue-300 w-full"
					/>
				) : (
					<span className="flex-1" title={name}>
						{name}
					</span>
				)}
			</div>
			<button onClick={handlePinClick}>{isPinned ? <PinIconFull /> : <PinIconEmpty />}</button>

			<span>{date}</span>
			<span>{additionalInformation}</span>
			<a href={url} download>
				<DownloadIcon />
			</a>
			{options.length && <Options options={options} />}
		</div>
	);
};

export default FileLine;
