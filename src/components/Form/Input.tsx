import React from 'react';
import { ComponentPropsWithoutRef } from 'react';
import cn from 'classnames';
import Error from './Error';
import { ErrorMessage } from 'formik';

type Props = ComponentPropsWithoutRef<'input'> & {
	category?: 'authentication' | 'form';
	label: string;
};

const Input = ({
	category = 'form',
	label,
	name,
	placeholder,
	value,
	type = 'text',
	className,
	...props
}: Props) => {
	return (
		<div className={cn('flex flex-col gap-1', className)}>
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
				className={cn('rounded-xl placeholder-neutral-grey py-1 px-2', {
					'bg-neutral-lighter': category === 'authentication',
					'bg-neutral-lightest': category === 'form',
				})}
				type={type}
				placeholder={placeholder}
				value={value}
				name={name}
				{...props}
			/>
			<ErrorMessage name={name} component={Error} />
		</div>
	);
};

export default Input;
