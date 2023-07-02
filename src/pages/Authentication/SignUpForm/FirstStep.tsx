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
	name: Yup.string().min(2).max(50).required(),
	firstName: Yup.string().min(2).max(50).required(),
	email: Yup.string().min(2).max(50).email().required(),
	// TODO : instaler yup-phone
	phone: Yup.string().required(),
	company: Yup.string().min(2).max(50).required(),
	siret: Yup.string().max(14).required(),
});

const FirstStep = ({ onLoginClick: handleLoginClick, onSubmit: handleSubmit }: Props) => {
	return (
		<>
			<Formik
				initialValues={{
					name: '',
					firstName: '',
					email: '',
					phone: '',
					siret: '',
					company: '',
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
									name="name"
									placeholder="NOM"
									type="text"
									value={values.name}
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
								name="phone"
								placeholder="06 XX XX XX XX"
								type="phone"
								value={values.phone}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
						</div>
						<div className="flex flex-col gap-3">
							<SectionTitle title="Informations de l'entreprise" />
							<Input
								category="authentication"
								label="Nom de l'entreprise"
								name="company"
								placeholder="Company ..."
								type="text"
								value={values.company}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<Input
								category="authentication"
								label="Numéro de SIRET"
								name="siret"
								placeholder="34....."
								type="text"
								value={values.siret}
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
