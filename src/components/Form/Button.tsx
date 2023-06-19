import React from 'react';

type Props = {
	onClick?: () => void;
	type: 'primary' | 'secondary' | 'alert';
	children: React.ReactNode;
};

const Button = ({ onClick, children }: Props) => {
	const handleChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		e.stopPropagation();
		onClick?.();
	};
	return (
		<button
			className="rounded-3xl bg-azul-300 text-neutral-white py-2 hover:bg-azul-100 drop-shadow-sm"
			onClick={handleChange}
		>
			{children}
		</button>
	);
};

export default Button;
