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
	addressNumber: Yup.string().required(),
	addressStreet: Yup.string().required(),
	addressAdditional: Yup.string(),
	addressCity: Yup.string().required(),
	addressZipCode: Yup.string().required(),
	addressCountry: Yup.string().required(),
});

const SecondStep = ({ onSubmit: handleSubmit }: Props) => {
	return (
		<>
			<Formik
				initialValues={{
					addressNumber: '',
					addressStreet: '',
					addressAdditional: '',
					addressCity: '',
					addressZipCode: '',
					addressCountry: '',
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
								name="addressNumber"
								placeholder="4"
								type="text"
								value={values.addressNumber}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<Input
								category="authentication"
								label="Voie"
								name="addressStreet"
								placeholder="rue de la Paix"
								type="text"
								value={values.addressStreet}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<Input
								category="authentication"
								label="Complément d'adresse"
								name="addressAdditional"
								placeholder="Immeuble B, étage 2, porte 4"
								type="text"
								value={values.addressAdditional}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<Input
								category="authentication"
								label="Ville"
								name="addressCity"
								placeholder="Paris"
								type="text"
								value={values.addressCity}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<div className="flex gap-4">
								<Input
									category="authentication"
									label="Code postal"
									name="addressZipCode"
									placeholder="75000"
									type="text"
									value={values.addressZipCode}
									onChange={handleChange}
									onBlur={handleBlur}
									className="grow"
								/>
								<Input
									category="authentication"
									label="Pays"
									name="addressCountry"
									placeholder="France"
									type="text"
									value={values.addressCountry}
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
