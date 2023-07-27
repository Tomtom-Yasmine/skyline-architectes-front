import React, { useState } from 'react';
import { ReactComponent as DotIcon } from 'assets/icons/dots.svg';
import { useOutsideClicker } from 'hooks';
import cn from 'classnames';

type Props = {
	options: Array<{
		label: string;
		onClick: () => void;
	}>;
};
const Options = ({ options }: Props) => {
	const [isOpen, setOpen] = useState(false);
	const ref = useOutsideClicker(() => setOpen(false));

	return (
		<div className="relative" ref={ref}>
			<button
				className="w-10 h-5 flex items-center justify-center mb-2"
				onClick={() => setOpen(!isOpen)}
			>
				<DotIcon />
			</button>
			{isOpen && (
				<div className="absolute bg-neutral-light rounded-3xl text-left drop-shadow-md left-10 top-[-0.5rem]">
					{options.map((option, index) => (
						<button
							key={option.label}
							onClick={option.onClick}
							className={cn('p-2 hover:bg-light-blue/20  w-32 text-left', {
								'rounded-t-2xl': index === 0,
								'rounded-b-2xl': index === options.length - 1,
							})}
						>
							{option.label}
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default Options;
