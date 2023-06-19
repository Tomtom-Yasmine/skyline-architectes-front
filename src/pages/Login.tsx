import React from 'react';
import { Input, Button } from 'components';
import { useState } from 'react';
import axios from 'axios';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = () => {
		axios.post('http://localhost:3000/api/auth/login', {
			email,
			password,
		});
	};

	return (
		<div className="flex flex-col">
			<div className="rounded-2xl bg-azul-500 p-8 flex flex-col gap-6 w-96">
				<h1 className="text-neutral-white text-5xl text-center font-semibold">Connexion</h1>
				<Input
					category="authentication"
					label="Adresse e-mail"
					name="email"
					placeholder="example@test.com"
					type="email"
					value={email}
					onChange={(newValue: string) => setEmail(newValue)}
				/>
				<Input
					category="authentication"
					label="Mot de passe"
					name="password"
					placeholder="XXXXX"
					type="password"
					value={password}
					onChange={(newValue: string) => setPassword(newValue)}
				/>
				<Button type="primary" onClick={handleLogin}>
					Se connecter
				</Button>
			</div>
		</div>
	);
};
export default Login;
