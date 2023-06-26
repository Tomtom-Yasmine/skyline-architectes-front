import React, { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'button'> & {
	category: 'primary' | 'secondary' | 'alert';
	children: React.ReactNode;
};

const Button = ({ onClick, children, ...props }: Props) => {
	const handleChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		if (props.type !== 'submit') {
			e.preventDefault();
			e.stopPropagation();
		}
		onClick?.(e);
	};
	return (
		<button
			className="rounded-3xl bg-azul-300 text-neutral-white py-2 hover:bg-azul-100 drop-shadow-sm"
			onClick={handleChange}
			{...props}
		>
			{children}
		</button>
	);
};

export default Button;
