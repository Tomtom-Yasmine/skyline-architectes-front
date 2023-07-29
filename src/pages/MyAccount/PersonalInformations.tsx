import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Input, SectionTitle } from 'components';
import { User } from 'data.type';
import useApi from 'hooks/useApi';
import { toast } from 'react-toastify';

const PeronalInformations = () => {
	const [userInfo, setUserInfo] = useState<Partial<Omit<User, 'id'>>>({});
	const api = useApi();

	useEffect(() => {
		api.get<{ user: User }>('/me')
			.then((res) => {
				const user = res.data.user;
				if (!user) throw new Error('No user data');
				const { id, ...userinfo } = user;
				id && setUserInfo(userinfo);
			})
			.catch(() => {
				toast.error('Erreur lors de la récupération des informations personnelles');
			});
	}, [api]);

	const passwordsSchema = Yup.object().shape({
		currentPassword: Yup.string().min(2).max(50).required(),
		newPassword: Yup.string().min(2).max(50).required(),
		confirmPassword: Yup.string()
			.min(2)
			.max(50)
			.required()
			.test(
				'passwords-match',
				'Les mots de passe ne correspondent pas',
				(value, { parent }) => value === parent.newPassword
			),
	});

	const handleDelete = async () => {
		try {
			await api.delete('/me');
			toast.success('Compte supprimé');
		} catch (e) {
			toast.error('Erreur lors de la suppression du compte');
		}
	};

	return (
		<div className="flex gap-16">
			<Formik
				initialValues={userInfo}
				onSubmit={async (values, { setSubmitting }) => {
					try {
						setSubmitting(true);
						console.log(values);
						await api.patch('/me', userInfo);
						toast.success('Informations personnelles mises à jour');
						setSubmitting(false);
					} catch (e) {
						toast.error('Couple mot de passe/identifiant incorrect');
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
									value={userInfo?.lastName ?? ''}
									onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })}
								/>
								<Input
									label="Prénom"
									name="firstName"
									placeholder="Prénom"
									type="text"
									className="grow"
									value={userInfo?.firstName ?? ''}
									onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })}
								/>
							</div>
							<Input
								label="Adresse e-mail"
								name="email"
								placeholder="test@gmail.com"
								type="text"
								value={userInfo?.email ?? ''}
								onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
							/>
							<Input
								label="Numéro de téléphone"
								name="phoneNumber"
								placeholder="06 00 00 00 00"
								type="text"
								value={userInfo?.phoneNumber ?? ''}
								onChange={(e) => setUserInfo({ ...userInfo, phoneNumber: e.target.value })}
							/>
						</div>

						<div className="flex flex-col gap-4">
							<SectionTitle title="Informations sur l'entreprise" />
							<Input
								label="Nom de l'entreprise"
								name="companyName"
								placeholder="Company ..."
								type="text"
								value={userInfo?.companyName ?? ''}
								onChange={(e) => setUserInfo({ ...userInfo, companyName: e.target.value })}
							/>
							<Input
								label="Numéro de SIRET"
								name="companySiret"
								placeholder="34....."
								type="text"
								value={userInfo?.companySiret ?? ''}
								onChange={(e) => setUserInfo({ ...userInfo, companySiret: e.target.value })}
							/>
							<div className="flex gap-2">
								<Input
									label="Numéro"
									name="companyAddressNumber"
									placeholder="4"
									type="text"
									value={userInfo?.companyAddressNumber ?? ''}
									onChange={(e) =>
										setUserInfo({ ...userInfo, companyAddressNumber: e.target.value })
									}
								/>
								<Input
									label="Voie"
									name="companyAddressStreet"
									placeholder="rue de la Paix"
									type="text"
									className="grow"
									value={userInfo?.companyAddressStreet ?? ''}
									onChange={(e) =>
										setUserInfo({ ...userInfo, companyAddressStreet: e.target.value })
									}
								/>
							</div>
							<Input
								label="Complément d'adresse"
								name="companyAddressAdditional"
								placeholder="Immeuble B, étage 2, porte 4"
								type="text"
								value={userInfo?.companyAddressAdditional ?? ''}
								onChange={(e) =>
									setUserInfo({ ...userInfo, companyAddressAdditional: e.target.value })
								}
							/>
							<div className="flex flex-col gap-2">
								<Input
									label="Ville"
									name="companyAddressCity"
									placeholder="Paris"
									type="text"
									value={userInfo?.companyAddressCity ?? ''}
									onChange={(e) =>
										setUserInfo({ ...userInfo, companyAddressCity: e.target.value })
									}
								/>
								<Input
									label="Code postal"
									name="companyAddressZipCode"
									placeholder="75000"
									type="text"
									className="grow"
									value={userInfo?.companyAddressZipCode ?? ''}
									onChange={(e) =>
										setUserInfo({ ...userInfo, companyAddressZipCode: e.target.value })
									}
								/>
							</div>
							<Input
								label="Pays"
								name="companyAddressCountry"
								placeholder="France"
								type="text"
								className="grow"
								value={userInfo?.companyAddressCountry ?? ''}
								onChange={(e) =>
									setUserInfo({ ...userInfo, companyAddressCountry: e.target.value })
								}
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
					validationSchema={passwordsSchema}
					onSubmit={async (values, { setSubmitting }) => {
						try {
							await api.post('/update-password', values);
							toast.success('Mot de passe mis à jour');
							setSubmitting(false);
						} catch (e) {
							toast.error('Couple mot de passe/identifiant incorrect');
						}
					}}
				>
					{({ handleSubmit, isSubmitting, values, handleChange }) => (
						<form onSubmit={handleSubmit} className="flex flex-col gap-12">
							<div className="flex flex-col gap-4">
								<SectionTitle title="Mot de passe" />
								<Input
									label="Ancien mot de passe"
									name="currentPassword"
									placeholder="MonMotDePasseActuel"
									type="password"
									value={values.currentPassword}
									onChange={handleChange}
								/>
								<Input
									label="Nouveau mot de passe"
									name="newPassword"
									placeholder="MonNouveauMotDePasse"
									type="password"
									value={values.newPassword}
									onChange={handleChange}
								/>
								<Input
									label="Nouveau mot de passe"
									name="confirmPassword"
									placeholder="MonNouveauMotDePasse"
									type="password"
									value={values.confirmPassword}
									onChange={handleChange}
								/>
							</div>
							<Button category="primary" type="submit" disabled={isSubmitting}>
								Valider
							</Button>
						</form>
					)}
				</Formik>
				<Button category="alert" onClick={handleDelete}>
					Suprimer mon compte
				</Button>
			</div>
		</div>
	);
};

export default PeronalInformations;
