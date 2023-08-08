import React, { useState } from 'react';
import { Button, StockageSelector, SectionTitle } from 'components';
import { Formik } from 'formik';
import { SignUpDataThirdStep } from 'data.type';

type Props = {
	onSubmit: (values: SignUpDataThirdStep) => void;
};

const ThirdStep = ({ onSubmit: handleSubmit }: Props) => {
	const [stockage, setStockage] = useState(20);

	return (
		<>
			<Formik
				initialValues={{
					stockage: 20,
				}}
				onSubmit={(values, { setSubmitting }) => {
					if (stockage >= 20) {
						handleSubmit({ ...values, stockage });
						setSubmitting(false);
					}
				}}
			>
				{({ handleSubmit, isSubmitting }) => (
					<form onSubmit={handleSubmit} className="flex flex-col gap-7">
						<div className="flex flex-col gap-3">
							<SectionTitle title="Offre de stockage" style="light" />
							<StockageSelector currentStockage={stockage} onStockageChange={setStockage} />
						</div>
						<Button category="primary" type="submit" disabled={isSubmitting}>
							Payer
						</Button>
					</form>
				)}
			</Formik>
		</>
	);
};
export default ThirdStep;
