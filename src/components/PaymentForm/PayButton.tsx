import React from 'react';
import { Button } from 'components';
import { useApi } from 'hooks';
import { toast } from 'react-toastify';

type Props = {
	storage: number;
	className?: string;
};

const PayButton = ({ storage, className }: Props) => {
	const api = useApi();
	const url = process.env.REACT_APP_API_BASE_URL;
	const handleCheckout = async () => {
		const user = await api.get(`${url}me`);
		api.post(`${url}stripe/create-checkout-session`, {
			amount: storage,
			price: 20,
			urlSuccess: '/myaccount?tab=invoices&success=true',
			urlFailure: '/myaccount?tab=storageOffer',
			metadata: {
				...user.data.user,
			},
		})
			.then((res) => {
				if (res.data.url) {
					window.location.href = res.data.url;
				}
			})
			.catch(() => {
				toast.error('Une erreur est survenue');
			});
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
