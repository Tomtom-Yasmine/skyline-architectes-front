import React from 'react';
import { Input, Button } from 'components';
import * as Yup from 'yup';
import 'yup-phone';
import { Formik } from 'formik';
import SectionTitle from './SectionTitle';
import { SignUpDataFirstStep } from 'data.type';

type Props = {
	onLoginClick: () => void;
	onSubmit: (values: SignUpDataFirstStep) => void;
};

const schema = Yup.object().shape({
	lastName: Yup.string().min(2).max(50).required(),
	firstName: Yup.string().min(2).max(50).required(),
	email: Yup.string().min(2).max(50).email().required(),
	// TODO : instaler yup-phone
	phoneNumber: Yup.string().required(),
	companyName: Yup.string().min(2).max(50).required(),
	companySiret: Yup.string().max(14).required(),
});

const FirstStep = ({ onLoginClick: handleLoginClick, onSubmit: handleSubmit }: Props) => {
	return (
		<>
			<Formik
				initialValues={{
					lastName: '',
					firstName: '',
					email: '',
					phoneNumber: '',
					companySiret: '',
					companyName: '',
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
							<SectionTitle title="Informations personnelles" />
							<div className="flex gap-4">
								<Input
									category="authentication"
									label="Nom"
									name="lastName"
									placeholder="NOM"
									type="text"
									value={values.lastName}
									onChange={handleChange}
									onBlur={handleBlur}
									className="grow"
								/>
								<Input
									category="authentication"
									label="Prénom"
									name="firstName"
									placeholder="Prénom"
									type="text"
									value={values.firstName}
									onChange={handleChange}
									onBlur={handleBlur}
									className="grow"
								/>
							</div>
							<Input
								category="authentication"
								label="Adresse e-mail"
								name="email"
								placeholder="test@gmail.com"
								type="text"
								value={values.email}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<Input
								category="authentication"
								label="Téléphone (mobile)"
								name="phoneNumber"
								placeholder="06 XX XX XX XX"
								type="phone"
								value={values.phoneNumber}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
						</div>
						<div className="flex flex-col gap-3">
							<SectionTitle title="Informations de l'entreprise" />
							<Input
								category="authentication"
								label="Nom de l'entreprise"
								name="companyName"
								placeholder="Company ..."
								type="text"
								value={values.companyName}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<Input
								category="authentication"
								label="Numéro de SIRET"
								name="companySiret"
								placeholder="34....."
								type="text"
								value={values.companySiret}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
						</div>
						<Button category="primary" type="submit" disabled={isSubmitting}>
							Suivant
						</Button>
					</form>
				)}
			</Formik>

			<Button category="primary" onClick={handleLoginClick}>
				Se connecter
			</Button>
		</>
	);
};
export default FirstStep;
