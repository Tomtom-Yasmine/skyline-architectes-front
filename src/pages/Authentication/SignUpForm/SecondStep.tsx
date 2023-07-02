import React from 'react';
import { Input, Button } from 'components';
import * as Yup from 'yup';
import { Formik } from 'formik';
import SectionTitle from './SectionTitle';
import { SignUpDataSecondStep } from 'data.type';

type Props = {
	onSubmit: (values: SignUpDataSecondStep) => void;
};

const schema = Yup.object().shape({
	companyAddressNumber: Yup.string().required(),
	companyAddressStreet: Yup.string().required(),
	companyAddressAdditional: Yup.string(),
	companyAddressCity: Yup.string().required(),
	companyAddressZipCode: Yup.string().required(),
	companyAddressCountry: Yup.string().required(),
});

const SecondStep = ({ onSubmit: handleSubmit }: Props) => {
	return (
		<>
			<Formik
				initialValues={{
					companyAddressNumber: '',
					companyAddressStreet: '',
					companyAddressAdditional: '',
					companyAddressCity: '',
					companyAddressZipCode: '',
					companyAddressCountry: '',
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
							<SectionTitle title="Adresse postale" />
							<Input
								category="authentication"
								label="Numéro"
								name="companyAddressNumber"
								placeholder="4"
								type="text"
								value={values.companyAddressNumber}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<Input
								category="authentication"
								label="Voie"
								name="companyAddressStreet"
								placeholder="rue de la Paix"
								type="text"
								value={values.companyAddressStreet}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<Input
								category="authentication"
								label="Complément d'adresse"
								name="companyAddressAdditional"
								placeholder="Immeuble B, étage 2, porte 4"
								type="text"
								value={values.companyAddressAdditional}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<Input
								category="authentication"
								label="Ville"
								name="companyAddressCity"
								placeholder="Paris"
								type="text"
								value={values.companyAddressCity}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<div className="flex gap-4">
								<Input
									category="authentication"
									label="Code postal"
									name="companyAddressZipCode"
									placeholder="75000"
									type="text"
									value={values.companyAddressZipCode}
									onChange={handleChange}
									onBlur={handleBlur}
									className="grow"
								/>
								<Input
									category="authentication"
									label="Pays"
									name="companyAddressCountry"
									placeholder="France"
									type="text"
									value={values.companyAddressCountry}
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
