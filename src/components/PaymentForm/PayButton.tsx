import axios from 'axios';
import React from 'react';

type Props = {
	storage: number;
};

const PayButton = ({ storage }: Props) => {
	const url = process.env.REACT_APP_API_BASE_URL;

	const handleCheckout = () => {
		axios
			.post(`${url}stripe/create-checkout-session`, {
				data: { amount: storage },
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
	return <button onClick={() => handleCheckout()}>Pay</button>;
};

export default PayButton;
