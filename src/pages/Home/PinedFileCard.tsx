import React from 'react';
import { FileData } from 'data.type';
import { ReactComponent as PinIconFull } from 'assets/icons/pin_full.svg';
import Options from 'components/Options';

type Props = {
	file: FileData;
	extensionType: string;
	onPinClick: () => void;
	options?: Array<{
		label: string;
		onClick: () => void;
	}>;
};

const PinnedFileCard = ({
	file,
	extensionType,
	onPinClick: handlePinClick,
	options = [],
}: Props) => {
	return (
		<div className="flex flex-col gap-4 bg-neutral-lighter w-56 text-center py-4 rounded-3xl text-neutral-dark">
			{file.name}
			{extensionType === 'image' ? (
				<img src={file.url} alt="file preview" className="h-32" />
			) : (
				<div className="h-32 bg-neutral-lightest flex item justify-center items-center text-3xl font-semibold">
					{extensionType.toUpperCase()}
				</div>
			)}
			<div className="flex p-4 justify-between items-center">
				<button onClick={handlePinClick}>
					<PinIconFull />
				</button>
				{file.creationDate.toDateString()}
				<Options options={options} />
			</div>
		</div>
	);
};

export default PinnedFileCard;
