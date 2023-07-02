import React, { useState } from 'react';
import { Input, Button, StockageSelector } from 'components';
import * as Yup from 'yup';
import { Formik } from 'formik';
import SectionTitle from './SectionTitle';
import { SignUpDataThirdStep } from 'data.type';

type Props = {
	onSubmit: (values: SignUpDataThirdStep) => void;
};

const schema = Yup.object().shape({
	password: Yup.string().min(8).required(),
});

const SecondStep = ({ onSubmit: handleSubmit }: Props) => {
	const [stockage, setStockage] = useState(20);

	return (
		<>
			<Formik
				initialValues={{
					password: '',
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
					<form onSubmit={handleSubmit} className="flex flex-col gap-9">
						<div className="flex flex-col gap-3">
							<SectionTitle title="Choix du mot de passe" />
							<Input
								category="authentication"
								label="Mot de passe"
								name="password"
								placeholder="********"
								type="password"
								value={values.password}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<p className="text-neutral-white ">
								Le mot de passe doit contenir au minimum 8 caractères
							</p>
							<SectionTitle title="Offre de stockage" />
							<StockageSelector currentStockage={stockage} onStockageChange={setStockage} />
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
