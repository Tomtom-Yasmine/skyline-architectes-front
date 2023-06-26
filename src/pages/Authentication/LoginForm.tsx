import React from 'react';
import { Input, Button } from 'components';
// import axios, { Axios } from 'axios';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import useAuth from 'hooks/useAuth';
import { Formik } from 'formik';

type Props = {
	onFormChange: (value: string) => void;
};

const SignupSchema = Yup.object().shape({
	email: Yup.string()
		.min(2, 'Trop court!')
		.max(50, 'Trop long!')
		.email('Le format doit etre celui d\'un email')
		.required('Requis'),
	password: Yup.string().min(2, 'Trop court!').required('Requis'),
});

const LoginForm = ({ onFormChange: handleFormChange }: Props) => {
	const auth = useAuth();

	return (
		<Formik
			initialValues={{ email: '', password: '' }}
			validationSchema={SignupSchema}
			onSubmit={(values, { setSubmitting }) => {
				try {
					//todo
					//const res = await axios.post('http://localhost:3000/api/auth/login', values);4
					// const jwt = res.data;
					const jwt =
						'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNTE2MjM5MDIyfQ.O04bBJbUswVJt0HgS_UcdeslpEKKuSxHkotlrrI-2sE';
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
					className="rounded-2xl bg-azul-500 p-8 flex flex-col gap-9 min-w-[32rem]"
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
						<Button category="secondary" onClick={() => handleFormChange('signUp')}>
							{'S\'inscrire'}
						</Button>
						<Button category="secondary" onClick={() => console.log('todo')}>
							Mot de passe oublié
						</Button>
					</div>
				</form>
			)}
		</Formik>
	);
};
export default LoginForm;
