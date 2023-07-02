import React from 'react';
import { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'input'> & {
	elements: { value: string; label: string }[];
	name: string;
};

const Radio = ({ name, elements }: Props) => {
	return (
		<div className="flex gap-3 justify-around">
			{elements.map((element) => (
				<div className="flex items-center gap-1" key={element.value}>
					<input type="radio" className="h-6 w-6" name={name} value={element.value} />
					<label htmlFor={element.value} className={'font-bold px-1 text-neutral-white'}>
						{element.label}
					</label>
				</div>
			))}
		</div>
	);
};

export default Radio;
