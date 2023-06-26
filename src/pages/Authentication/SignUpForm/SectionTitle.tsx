import React from 'react';

type Props = {
	title: string;
};

const sectionTitle = ({ title }: Props) => {
	return <h3 className="text-neutral-white text-xl font-semibold">{title}</h3>;
};

export default sectionTitle;
