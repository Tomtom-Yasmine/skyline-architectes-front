import React, { ComponentPropsWithoutRef } from 'react';
import cn from 'classnames';

type Props = ComponentPropsWithoutRef<'button'> & {
	category: 'primary' | 'secondary' | 'alert';
	children: React.ReactNode;
};

const Button = ({ onClick, children, className, ...props }: Props) => {
	const handleChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		if (props.type !== 'submit') {
			e.preventDefault();
			e.stopPropagation();
		}
		onClick?.(e);
	};
	return (
		<button
			className={cn(
				'rounded-3xl bg-azul-300 text-neutral-white py-2 hover:bg-azul-100 drop-shadow-sm',
				className,
				{
					'bg-azul-300 hover:bg-azul-100': props.category === 'primary',
					'bg-red-500 hover:bg-red-800': props.category === 'alert',
				}
			)}
			onClick={handleChange}
			{...props}
		>
			{children}
		</button>
	);
};

export default Button;
