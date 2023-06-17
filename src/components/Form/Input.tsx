import React from 'react';
import { ComponentPropsWithoutRef } from 'react';
import cn from 'classnames';

type Props = Omit<ComponentPropsWithoutRef<'input'>, 'onChange'> & {
	category: 'authentication' | 'form';
	label: string;
	onChange: (newValue: string) => void;
};

const Input = ({ category, label, name, placeholder, value, type = 'text', onChange }: Props) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value);
	return (
		<div className="flex flex-col gap-1">
			<label
				htmlFor={name}
				className={cn('font-bold px-1', {
					'text-neutral-white': category === 'authentication',
					'text-neutral-dark': category === 'form',
				})}
			>
				{label}
			</label>
			<input
				className={cn('rounded-2xl placeholder-neutral-grey p-4', {
					'bg-neutral-lighter': category === 'authentication',
					'bg-neutral-lightest': category === 'form',
				})}
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={handleChange}
				name={name}
			/>
		</div>
	);
};

export default Input;
