import React from 'react';
import cn from 'classnames';

type Props = {
	title: string;
	style?: 'dark' | 'light';
};

const sectionTitle = ({ title, style = 'dark' }: Props) => {
	return (
		<h3
			className={cn('text-xl font-semibold', {
				'text-azul-300': style === 'dark',
				'text-neutral-light': style === 'light',
			})}
		>
			{title}
		</h3>
	);
};

export default sectionTitle;
