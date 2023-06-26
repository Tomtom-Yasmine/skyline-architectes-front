import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignUp from './SignUp';

const Authentication = () => {
	const [form, setForm] = useState('login');

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-authentication bg-center after:opacity-100">
			{form === 'login' && <LoginForm onFormChange={setForm} />}
			{form === 'signUp' && <SignUp />}
		</div>
	);
};
export default Authentication;
