import React, { useState } from 'react';
import 'yup-phone';
import Step from './Step';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';
import { SignUpDataFirstStep, SignUpDataSecondStep, SignUpDataThirdStep } from 'data.type';
import axios from 'axios';
import useAuth from 'hooks/useAuth';
import { toast } from 'react-toastify';

type Props = {
	onLoginClick: () => void;
};

type SignUpData = Partial<SignUpDataFirstStep & SignUpDataSecondStep & SignUpDataThirdStep>;

const NUMBER_OF_STEPS = 3;

const SignUpForm = ({ onLoginClick: handleLoginClick }: Props) => {
	const auth = useAuth();
	const [step, setStep] = useState(0);
	const [data, setData] = useState<SignUpData>();

	const changeStep = async (stepNumber: number, stepData: SignUpData) => {
		setData((data) => ({ ...data, ...stepData }));
		if (stepNumber + 1 === NUMBER_OF_STEPS) {
			console.log('data', data);
			try {
				const res = await axios.post('http://localhost:3001/signup', data);
				const { sessionToken: jwt } = res.data;
				auth?.dispatch({
					type: 'login',
					payload: { jwt, onLogin: () => console.log('Login') },
				});
				toast.success('Inscription réussie');
			} catch (e) {
				toast.error('Email ou numéro de téléphone déjà utilisé');
			}
			return;
		}
		setStep(stepNumber + 1);
	};

	return (
		<div className="rounded-2xl bg-azul-500 px-8 pt-5 pb-5 flex flex-col gap-4 min-w-[32rem]">
			<h1 className="text-neutral-white text-4xl text-center font-semibold">{'Inscription'}</h1>
			<Step currentStep={step} totalSteps={NUMBER_OF_STEPS} />
			{step === 0 && (
				<FirstStep
					onLoginClick={handleLoginClick}
					onSubmit={(values) => changeStep(0, values)}
				/>
			)}
			{step === 1 && <SecondStep onSubmit={(values) => changeStep(1, values)} />}
			{step === 2 && <ThirdStep onSubmit={(values) => changeStep(2, values)} />}
		</div>
	);
};

export default SignUpForm;
