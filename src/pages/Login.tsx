import React from 'react';
import { Input, Button } from 'components';
import { useState } from 'react';
// import axios, { Axios } from 'axios';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import useAuth from 'hooks/useAuth';

type Errors = {
	email?: string;
	password?: string;
};

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState<Errors>({});

	const auth = useAuth();

	const handleLogin = async () => {
		// const data = { email, password };
		if (!password || !email) {
			handleValidate('password');
			handleValidate('email');
			return;
		}
		if (Object.keys(errors).length) return;
		try {
			//todo
			//const jwt = await axios.post('http://localhost:3000/api/auth/login', data);
			const jwt =
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNTE2MjM5MDIyfQ.O04bBJbUswVJt0HgS_UcdeslpEKKuSxHkotlrrI-2sE';
			auth?.dispatch({ type: 'login', payload: { jwt, onLogin: () => console.log('Login') } });
		} catch (e) {
			toast.error('Couple mot de passe/identifiant incorrect');
		}
	};

	const handleValidate = (key: keyof Errors) => {
		switch (key) {
		case 'email':
			yup.string()
				.required()
				.email()
				.validate(email)
				.then(() => setErrors((oldState) => ({ password: oldState.password })))
				.catch((error) => setErrors((oldState) => ({ ...oldState, email: error.message })));
			break;
		case 'password':
			yup.string()
				.required()
				.validate(password)
				.then(() => setErrors((oldState) => ({ email: oldState.email })))
				.catch((error) =>
					setErrors((oldState) => ({ ...oldState, password: error.message }))
				);
			break;
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-authentication bg-center after:opacity-100">
			<div className="rounded-2xl bg-azul-500 p-8 flex flex-col gap-9 w-96">
				<div className="flex flex-col gap-6">
					<h1 className="text-neutral-white text-5xl text-center font-semibold">Connexion</h1>
					<Input
						category="authentication"
						label="Adresse e-mail"
						name="email"
						placeholder="example@test.com"
						type="email"
						value={email}
						onChange={(value: string) => setEmail(value)}
						onBlur={() => handleValidate('email')}
					/>
					<Input
						category="authentication"
						label="Mot de passe"
						name="password"
						placeholder="********"
						type="password"
						value={password}
						onChange={(value: string) => setPassword(value)}
						onBlur={() => handleValidate('password')}
					/>
					<Button type="primary" onClick={handleLogin}>
						Se connecter
					</Button>
				</div>
				<div className="flex flex-col gap-4">
					<Button type="secondary" onClick={() => console.log('todo')}>
						{'S\'inscrire'}
					</Button>
					<Button type="secondary" onClick={() => console.log('todo')}>
						Mot de passe oublié
					</Button>
				</div>
			</div>
		</div>
	);
};
export default Login;
