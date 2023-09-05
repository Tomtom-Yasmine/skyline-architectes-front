import React, { useState } from 'react';

type Props = {
	label: string;
	value: string;
	className?: string;
};

const SmallStatistic = ({ label, value, className = '' }: Props) => {
	return (
		<div
			className={`flex flex-col justify-center items-center bg-neutral-lighter py-6 px-3 rounded-2xl ${className}`}
		>
			<p className="text-3xl font-bold">{value}</p>
			<p className="text-xl">{label}</p>
		</div>
	);
};

export default SmallStatistic;
