import React, { useState } from 'react';

export const CardHeader = ({
	className = '',
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) => {
	return <div className={`flex flex-col pb-2 ${className}`}>{children}</div>;
};

export const CardBody = ({
	className = '',
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) => {
	return <div className={`flex flex-col gap-8 ${className}`}>{children}</div>;
};

type CardProps = {
	className?: string;
	children: React.ReactNode;
};

export const Card = ({ className = '', children }: CardProps) => {
	return (
		<div className={`bg-neutral-light flex flex-col gap-3 p-3 rounded-3xl ${className}`}>
			{children}
		</div>
	);
};
