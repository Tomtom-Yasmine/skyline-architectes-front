import React from 'react';
import { ComponentPropsWithoutRef } from 'react';

type Props = Omit<ComponentPropsWithoutRef<'input'>, 'onChange'> & {
	label: string;
	onChange: (newValue: string) => void;
};

const Input = ({ label, name, placeholder, value, type = 'text', onChange }: Props) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value);
	return (
		<div className="flex flex-col">
			<label htmlFor={name}>{label}</label>
			<input
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
