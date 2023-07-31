import axios from 'axios';
import { Button } from 'components';
import React from 'react';

type Props = {
	storage: number;
	className?: string;
};

const PayButton = ({ storage, className }: Props) => {
	const url = process.env.REACT_APP_API_BASE_URL;

	const handleCheckout = () => {
		axios
			.post(`${url}stripe/create-checkout-session`, {
				data: { amount: storage, price: 20 },
			})
			.then((res) => {
				if (res.data.url) {
					window.location.href = res.data.url;
				}
			})
			.catch((err) => {
				console.log(err.message);
			});
		console.log(storage);
	};
	return (
		<Button
			category="primary"
			type="submit"
			className={className}
			onClick={() => handleCheckout()}
		>
			Payer
		</Button>
	);
};

export default PayButton;
