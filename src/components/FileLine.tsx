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
	date: Date;
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

	const getIcon = (url: string, className: string) => {
		const lastDotIndex = url.lastIndexOf('.');
		const extension = lastDotIndex === -1 ? '' : url.slice(lastDotIndex + 1);

		if (extension === 'pdf') return <PDFIcon className={className} />;
		if (['png', 'jpg', 'jpeg', 'gif'].includes(extension))
			return <ImageIcon className={className} />;
		if (['xls', 'xlsx'].includes(extension)) return <ExcelIcon className={className} />;

		return <FileIcon className={className} />;
	};
	return (
		<div className="grid grid-cols-5-1-1-1 hover:bg-light-blue/20 h-12 items-center w-full px-3">
			<div className="flex gap-7 col-span-1">
				{getIcon(url, 'col-span-1 w-6 h-6')}
				<div className="flex gap-4">
					<button onClick={handlePinClick}>
						{isPinned ? <PinIconFull /> : <PinIconEmpty />}
					</button>
					<div className="flex-1 truncate max-w-md">
						{isNameBeingEdited ? (
							<input
								type="text"
								value={newName}
								onChange={(e) => setNewName(e.target.value)}
								onBlur={() => handleNameChange(newName)}
								className="border rounded px-2 py-1 focus:outline-none focus:ring focus:border-blue-300 w-full"
							/>
						) : (
							name
						)}
					</div>
				</div>
			</div>
			<div className="col-span-1">{date.toDateString()}</div>
			<div className="col-span-1">{additionalInformation}</div>
			<div className="col-span-1 flex gap-4">
				<a href={url} download>
					<DownloadIcon />
				</a>
				{options.length && <Options options={options} />}
			</div>
		</div>
	);
};

export default FileLine;
