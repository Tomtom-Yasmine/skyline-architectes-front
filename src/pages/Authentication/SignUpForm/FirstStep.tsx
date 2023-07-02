import React from 'react';
import { Input, Button } from 'components';
import * as Yup from 'yup';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
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
	phoneNumber: Yup.string().test(
		'phone',
		'Le numéro de téléphone est invalide',
		(value) => !value || !!parsePhoneNumberFromString(value, 'FR')?.isValid()
	),
	password: Yup.string().min(8).required(),
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
					password: '',
				}}
				validationSchema={schema}
				onSubmit={(values, { setSubmitting }) => {
					handleSubmit(values);
					setSubmitting(false);
				}}
			>
				{({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
					<form onSubmit={handleSubmit} className="flex flex-col gap-7">
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
