import React from 'react';
import * as Yup from 'yup';
import SectionTitle from './SectionTitle';
import { SignUpDataFourthStep } from 'data.type';
import { Formik } from 'formik';
import { Input, Button, Radio } from 'components';

const schema = Yup.object().shape({
	cardHolder: Yup.string().required(),
	cardNumber: Yup.string().required(),
	expirationDate: Yup.string(),
	cardSecurityCode: Yup.string().required(),
});

type Props = {
	onSubmit: (values: SignUpDataFourthStep) => void;
};

const FourthStep = ({ onSubmit: handleSubmit }: Props) => {
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
					handleSubmit(values);
					setSubmitting(false);
				}}
			>
				{({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
					<form onSubmit={handleSubmit} className="flex flex-col gap-9">
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

export default FourthStep;
