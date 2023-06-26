import React from 'react';

type Props = {
	children: React.ReactNode;
};

const Error = ({ children }: Props) => {
	return <div className=" text-madder-900">{children}</div>;
};
export default Error;
