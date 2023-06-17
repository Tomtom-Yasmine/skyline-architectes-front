import React from 'react';
import { Input } from 'components';
import { useState } from 'react';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	return (
		<div className="flex flex-col">
			<div className="rounded-2xl bg-azul-500 p-8 flex flex-col gap-6 w-96">
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
			</div>
		</div>
	);
};
export default Login;
