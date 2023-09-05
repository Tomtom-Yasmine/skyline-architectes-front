import React, { useState } from 'react';
import { ReactComponent as PinIconFull } from 'assets/icons/pin_full.svg';
import { ReactComponent as PinIconEmpty } from 'assets/icons/pin_empty.svg';
import { ReactComponent as DownloadIcon } from 'assets/icons/download.svg';
import { ReactComponent as FileIcon } from 'assets/icons/file_empty.svg';
import { ReactComponent as PDFIcon } from 'assets/icons/pdf.svg';
import { ReactComponent as ImageIcon } from 'assets/icons/image.svg';
import { ReactComponent as ExcelIcon } from 'assets/icons/calc.svg';
import Options from '../../Options';
import { getExtensionType } from 'helper/files';

type Props = {
	name: string;
	isPinned: boolean;
	date: Date;
	url: string;
	additionalInformation: string;
	isNameBeingEdited?: boolean;
	onNameChange?: (name: string) => void;
	onPinClick: () => void;
	onDownloadClick?: () => void;
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
	onDownloadClick: handleDownload,
}: Props) => {
	const [newName, setNewName] = useState(name);

	const getIcon = (fileName: string, className: string) => {
		const extension = getExtensionType(fileName);
		switch (extension) {
		case 'pdf':
			return <PDFIcon className={className} />;
		case 'image':
			return <ImageIcon className={className} />;
		case 'excel':
			return <ExcelIcon className={className} />;
		default:
			return <FileIcon className={className} />;
		}
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
								onBlur={() => handleNameChange?.(newName)}
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
				<a onClick={handleDownload} className="cursor-pointer">
					<DownloadIcon />
				</a>
				{options.length && <Options options={options} />}
			</div>
		</div>
	);
};

export default FileLine;
