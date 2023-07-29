import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Input, SectionTitle } from 'components';

const PeronalInformations = () => {
	const initialValues = {
		lastName: 'LastName',
		firstName: 'FirstName',
		email: 'Email',
		phoneNumber: 'PhoneNumber',
		companyName: 'CompanyName',
		companySiret: 'CompanySiret',
		companyAddressNumber: 'CompanyAddressNumber',
		companyAddressStreet: 'CompanyAddressStreet',
		companyAddressAdditional: 'CompanyAddressAdditional',
		companyAddressCity: 'CompanyAddressCity',
		companyAddressZipCode: 'CompanyAddressZipCode',
		companyAddressCountry: 'CompanyAddressCountry',
	};

	const schema = Yup.object().shape({
		lastName: Yup.string().min(2).max(50).required(),
		firstName: Yup.string().min(2).max(50).required(),
		email: Yup.string().min(2).max(50).required(),
		phoneNumber: Yup.string().min(2).max(50).required(),
		companyName: Yup.string().min(2).max(50).required(),
		companySiret: Yup.string().min(2).max(50).required(),
		companyAddressNumber: Yup.string().min(2).max(50).required(),
		companyAddressStreet: Yup.string().min(2).max(50).required(),
		companyAddressAdditional: Yup.string().min(2).max(50).required(),
		companyAddressCity: Yup.string().min(2).max(50).required(),
		companyAddressZipCode: Yup.string().min(2).max(50).required(),
		companyAddressCountry: Yup.string().min(2).max(50).required(),
	});

	return (
		<div className="flex gap-16">
			<Formik
				initialValues={initialValues}
				validationSchema={schema}
				onSubmit={async (values, { setSubmitting }) => {
					try {
						console.log(values, setSubmitting);
						//const res = await axios.post('http://localhost:3001/login', values);
						//const { sessionToken: jwt } = res.data;
						/*auth?.dispatch({
                            type: 'login',
                            payload: { jwt, onLogin: () => console.log('Login') },
                        });
                        toast.success(`Login réussi ${values.email}`);
                        setSubmitting(false); */
					} catch (e) {
						///toast.error('Couple mot de passe/identifiant incorrect');
					}
				}}
			>
				{({ handleSubmit, isSubmitting }) => (
					<form onSubmit={handleSubmit} className="w-1/2 flex flex-col gap-12">
						<div className="flex flex-col gap-4">
							<SectionTitle title="Informations personnelles" />
							<div className="flex gap-2">
								<Input
									label="Nom"
									name="lastName"
									placeholder="NOM"
									type="text"
									className="grow"
								/>
								<Input
									label="Prénom"
									name="firstName"
									placeholder="Prénom"
									type="text"
									className="grow"
								/>
							</div>
							<Input
								label="Adresse e-mail"
								name="email"
								placeholder="test@gmail.com"
								type="text"
							/>
							<Input
								label="Numéro de téléphone"
								name="phoneNumber"
								placeholder="06 00 00 00 00"
								type="text"
							/>
						</div>

						<div className="flex flex-col gap-4">
							<SectionTitle title="Informations sur l'entreprise" />
							<Input
								label="Nom de l'entreprise"
								name="companyName"
								placeholder="Company ..."
								type="text"
							/>
							<Input
								label="Numéro de SIRET"
								name="companySiret"
								placeholder="34....."
								type="text"
							/>
							<div className="flex gap-2">
								<Input
									label="Numéro"
									name="companyAddressNumber"
									placeholder="4"
									type="text"
								/>
								<Input
									label="Voie"
									name="companyAddressStreet"
									placeholder="rue de la Paix"
									type="text"
									className="grow"
								/>
							</div>
							<Input
								label="Complément d'adresse"
								name="companyAddressAdditional"
								placeholder="Immeuble B, étage 2, porte 4"
								type="text"
							/>
							<div className="flex flex-col gap-2">
								<Input
									label="Ville"
									name="companyAddressCity"
									placeholder="Paris"
									type="text"
								/>
								<Input
									label="Code postal"
									name="companyAddressZipCode"
									placeholder="75000"
									type="text"
									className="grow"
								/>
							</div>
							<Input
								label="Pays"
								name="companyAddressCountry"
								placeholder="France"
								type="text"
								className="grow"
							/>
						</div>
						<Button category="primary" type="submit" disabled={isSubmitting}>
							Sauvegarder
						</Button>
					</form>
				)}
			</Formik>
			<div className="w-1/2 flex flex-col gap-12">
				<Formik
					initialValues={{
						currentPassword: '',
						newPassword: '',
						confirmPassword: '',
					}}
					validationSchema={schema}
					onSubmit={async (values, { setSubmitting }) => {
						try {
							console.log(values, setSubmitting);
							//const res = await axios.post('http://localhost:3001/login', values);
							//const { sessionToken: jwt } = res.data;
							/*auth?.dispatch({
                                type: 'login',
                                payload: { jwt, onLogin: () => console.log('Login') },
                            });
                            toast.success(`Login réussi ${values.email}`);
                            setSubmitting(false); */
						} catch (e) {
							///toast.error('Couple mot de passe/identifiant incorrect');
						}
					}}
				>
					{({ handleSubmit, isSubmitting }) => (
						<form onSubmit={handleSubmit} className="flex flex-col gap-12">
							<div className="flex flex-col gap-4">
								<SectionTitle title="Mot de passe" />
								<Input
									label="Ancien mot de passe"
									name="currentPassword"
									placeholder="MonMotDePasseActuel"
									type="password"
								/>
								<Input
									label="Nouveau mot de passe"
									name="newPassword"
									placeholder="MonNouveauMotDePasse"
									type="password"
								/>
								<Input
									label="Nouveau mot de passe"
									name="confirmPassword"
									placeholder="MonNouveauMotDePasse"
									type="password"
								/>
							</div>
							<Button category="primary" type="submit" disabled={isSubmitting}>
								Valider
							</Button>
						</form>
					)}
				</Formik>
				<Button category="alert">Suprimer mon compte</Button>
			</div>
		</div>
	);
};

export default PeronalInformations;
