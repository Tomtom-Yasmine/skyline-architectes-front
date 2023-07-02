import React, { useState } from 'react';
import { Input, Button, StockageSelector, Radio } from 'components';
import * as Yup from 'yup';
import { Formik } from 'formik';
import SectionTitle from './SectionTitle';
import { SignUpDataThirdStep } from 'data.type';

type Props = {
	onSubmit: (values: SignUpDataThirdStep) => void;
};

const schema = Yup.object().shape({
	cardHolder: Yup.string().required(),
	cardNumber: Yup.string().required(),
	expirationDate: Yup.string(),
	cardSecurityCode: Yup.string().required(),
});

const SecondStep = ({ onSubmit: handleSubmit }: Props) => {
	const [stockage, setStockage] = useState(20);
	const paymentRadioData = [
		{
			label: 'Carte de crédit',
			value: 'creditCard',
		},
		{
			label: 'Paypal',
			value: 'paypal',
		},
	];

	return (
		<>
			<Formik
				initialValues={{
					cardHolder: '',
					cardNumber: '',
					expirationDate: '',
					cardSecurityCode: '',
				}}
				validationSchema={schema}
				onSubmit={(values, { setSubmitting }) => {
					if (stockage >= 20) {
						handleSubmit({ ...values, stockage });
						setSubmitting(false);
					}
				}}
			>
				{({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
					<form onSubmit={handleSubmit} className="flex flex-col gap-7">
						<div className="flex flex-col gap-3">
							<SectionTitle title="Offre de stockage" />
							<StockageSelector currentStockage={stockage} onStockageChange={setStockage} />
						</div>
						<div className="flex flex-col gap-3">
							<SectionTitle title="Paiement" />
							<Radio elements={paymentRadioData} name="payment" />
							<Input
								category="authentication"
								label="Titulaire de la carte"
								name="cardHolder"
								placeholder="John Doe"
								type="text"
								value={values.cardHolder}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<Input
								category="authentication"
								label="Numéro de la carte"
								name="cardNumber"
								placeholder="XXXX XXXX XXXX XXXX"
								type="text"
								value={values.cardNumber}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<div className="flex gap-4">
								<Input
									category="authentication"
									label="Date d'expiration"
									name="expirationDate"
									placeholder="75000"
									type="text"
									value={values.expirationDate}
									onChange={handleChange}
									onBlur={handleBlur}
									className="grow"
								/>
								<Input
									category="authentication"
									label="CVC"
									name="cardSecurityCode"
									placeholder="France"
									type="text"
									value={values.cardSecurityCode}
									onChange={handleChange}
									onBlur={handleBlur}
									className="grow"
								/>
							</div>
						</div>
						<Button category="primary" type="submit" disabled={isSubmitting}>
							Suivant
						</Button>
					</form>
				)}
			</Formik>
		</>
	);
};
export default SecondStep;
