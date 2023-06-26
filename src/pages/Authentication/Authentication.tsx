import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm/SignUpForm';
import useAuth from 'hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Authentication = () => {
	const [form, setForm] = useState('login');
	const navigate = useNavigate();
	const auth = useAuth();

	useEffect(() => {
		if (auth?.info.isLogged) navigate('/');
	}, [navigate, auth]);
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-authentication bg-center after:opacity-100">
			{form === 'login' && <LoginForm onFormChange={setForm} />}
			{form === 'signUp' && <SignUpForm onLoginClick={() => setForm('login')} />}
		</div>
	);
};
export default Authentication;
