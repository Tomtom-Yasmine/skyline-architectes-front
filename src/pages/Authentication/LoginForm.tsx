import React from 'react';
import { Input, Button } from 'components';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import useAuth from 'hooks/useAuth';
import { Formik } from 'formik';
import useApi from 'hooks/useApi';

type Props = {
	onFormChange: (value: string) => void;
};

const LoginSchema = Yup.object().shape({
	email: Yup.string().min(2).max(50).email().required(),
	password: Yup.string().min(8).required(),
});

const LoginForm = ({ onFormChange: handleFormChange }: Props) => {
	const auth = useAuth();
	const api = useApi();

	return (
		<Formik
			initialValues={{ email: '', password: '' }}
			validationSchema={LoginSchema}
			onSubmit={async (values, { setSubmitting }) => {
				try {
					const res = await api.post('/login', values);
					const { sessionToken: jwt } = res.data;
					auth?.dispatch({
						type: 'login',
						payload: { jwt, onLogin: () => console.log('Login') },
					});
					toast.success(`Login réussi ${values.email}`);
					setSubmitting(false);
				} catch (e) {
					toast.error('Couple mot de passe/identifiant incorrect');
				}
			}}
		>
			{({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
				<form
					onSubmit={handleSubmit}
					className="rounded-2xl bg-azul-500 px-8 pt-5 pb-5 flex flex-col gap-4 min-w-[32rem]"
				>
					<div className="flex flex-col gap-6">
						<h1 className="text-neutral-white text-5xl text-center font-semibold">
							Connexion
						</h1>
						<Input
							category="authentication"
							label="Adresse e-mail"
							name="email"
							placeholder="example@test.com"
							type="email"
							value={values.email}
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
						<Button category="primary" type="submit" disabled={isSubmitting}>
							Se connecter
						</Button>
					</div>
					<div className="flex flex-col gap-4">
						<button
							onClick={() => console.log('Forgot password')}
							className="text-neutral-white text-center font-semibold"
						>
							Mot de passe oublié
						</button>
						<Button category="secondary" onClick={() => handleFormChange('signUp')}>
							{'S\'inscrire'}
						</Button>
					</div>
				</form>
			)}
		</Formik>
	);
};
export default LoginForm;
